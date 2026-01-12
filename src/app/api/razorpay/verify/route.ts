import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { sendOrderConfirmationEmail } from "@/lib/email";

// TypeScript interfaces
interface VerifyPaymentRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface PaymentFailureRequestBody {
  razorpay_order_id: string;
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Verify Razorpay payment signature
 * This ensures the payment callback is genuine and not tampered with
 */
function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;

    // Create the signature string
    const signatureString = `${razorpayOrderId}|${razorpayPaymentId}`;

    // Generate HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(signatureString)
      .digest("hex");

    // Compare signatures
    return expectedSignature === razorpaySignature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to continue." },
        { status: 401 }
      );
    }

    // Parse request body
    const body = (await req.json()) as VerifyPaymentRequestBody;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    // Verify the payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      // Mark order as failed in database
      try {
        await convex.mutation(api.orders.markOrderFailed, {
          razorpayOrderId: razorpay_order_id,
          notes: "Payment signature verification failed",
        });
      } catch (error) {
        console.error("Failed to mark order as failed:", error);
      }

      return NextResponse.json(
        { error: "Invalid payment signature. Payment verification failed." },
        { status: 400 }
      );
    }

    // Update order in Convex database
    try {
      const result = await convex.mutation(api.orders.updateOrderPayment, {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      // Get updated order details for email
      const order = await convex.query(api.orders.getOrderByRazorpayId, {
        razorpayOrderId: razorpay_order_id,
      });

      // Send order confirmation email
      if (order) {
        try {
          await sendOrderConfirmationEmail({
            orderNumber: order.orderNumber,
            userId: order.userId,
            userEmail: order.userEmail,
            userName: order.userName,
            userPhone: order.userPhone,
            items: order.items,
            subtotal: order.subtotal,
            discount: order.discount,
            totalSavings: order.totalSavings,
            totalAmount: order.totalAmount,
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: order.razorpayPaymentId,
            status: order.status,
            paymentStatus: order.paymentStatus,
            currency: order.currency,
            createdAt: order.createdAt,
            paidAt: order.paidAt,
          });
          console.log(`Order confirmation email sent to ${order.userEmail}`);
        } catch (emailError) {
          console.error("Failed to send email, but payment was successful:", emailError);
          // Don't fail the payment verification if email fails
        }
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        orderNumber: result.orderNumber,
      });
    } catch (error) {
      console.error("Failed to update order:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      return NextResponse.json(
        {
          error: "Failed to update order",
          message: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      {
        error: "Payment verification failed",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle payment failure
 */
export async function PUT(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = (await req.json()) as PaymentFailureRequestBody;
    const { razorpay_order_id, error } = body;

    if (!razorpay_order_id) {
      return NextResponse.json(
        { error: "Missing order ID" },
        { status: 400 }
      );
    }

    // Mark order as failed in database
    await convex.mutation(api.orders.markOrderFailed, {
      razorpayOrderId: razorpay_order_id,
      notes: error?.description || "Payment failed",
    });

    return NextResponse.json({
      success: true,
      message: "Order marked as failed",
    });
  } catch (error) {
    console.error("Failed to mark order as failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      {
        error: "Failed to process",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
