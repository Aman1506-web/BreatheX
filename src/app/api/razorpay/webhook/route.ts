import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// TypeScript interfaces for Razorpay webhook events
interface RazorpayWebhookPayload {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment?: {
      entity: PaymentEntity;
    };
    order?: {
      entity: OrderEntity;
    };
  };
  created_at: number;
}

interface PaymentEntity {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  customer_id: string | null;
  notes: Record<string, string>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  error_source: string | null;
  error_step: string | null;
  error_reason: string | null;
  created_at: number;
}

interface OrderEntity {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Verify Razorpay webhook signature
 * This ensures the webhook is genuine and from Razorpay
 */
function verifyWebhookSignature(
  webhookBody: string,
  webhookSignature: string,
  webhookSecret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(webhookBody)
      .digest("hex");

    return expectedSignature === webhookSignature;
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return false;
  }
}

/**
 * Razorpay Webhook Handler
 * Handles payment status updates from Razorpay
 *
 * Webhook events:
 * - payment.authorized: Payment is authorized
 * - payment.captured: Payment is captured (successful)
 * - payment.failed: Payment failed
 * - order.paid: Order is paid
 */
export async function POST(req: NextRequest) {
  try {
    // Get webhook signature from headers
    const webhookSignature = req.headers.get("x-razorpay-signature");

    if (!webhookSignature) {
      console.error("Missing webhook signature");
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 }
      );
    }

    // Get webhook secret from environment
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Webhook secret not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    // Get raw body for signature verification
    const rawBody = await req.text();

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      rawBody,
      webhookSignature,
      webhookSecret
    );

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // Parse webhook payload
    const webhookPayload = JSON.parse(rawBody) as RazorpayWebhookPayload;
    const { event, payload } = webhookPayload;

    console.log(`Received webhook event: ${event}`);

    // Handle different webhook events
    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(payload.payment!.entity);
        break;

      case "payment.failed":
        await handlePaymentFailed(payload.payment!.entity);
        break;

      case "payment.authorized":
        await handlePaymentAuthorized(payload.payment!.entity);
        break;

      case "order.paid":
        console.log("Order paid event received:", payload.order!.entity.id);
        // Already handled in payment.captured
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    // Always return 200 OK to acknowledge webhook receipt
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Webhook processing failed";

    // Still return 200 to prevent Razorpay from retrying
    return NextResponse.json({ success: false, error: errorMessage });
  }
}

/**
 * Handle payment captured event
 */
async function handlePaymentCaptured(payment: PaymentEntity) {
  try {
    console.log(`Processing payment.captured for order: ${payment.order_id}`);

    // Find order in database
    const order = await convex.query(api.orders.getOrderByRazorpayId, {
      razorpayOrderId: payment.order_id,
    });

    if (!order) {
      console.error(`Order not found for Razorpay order ID: ${payment.order_id}`);
      return;
    }

    // Check if already processed
    if (order.status === "paid") {
      console.log(`Order ${order.orderNumber} already marked as paid`);
      return;
    }

    // Update order status
    await convex.mutation(api.orders.updateOrderPayment, {
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      razorpaySignature: "", // Signature not available in webhook
    });

    console.log(`Order ${order.orderNumber} marked as paid via webhook`);

    // Send order confirmation email
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
  } catch (error) {
    console.error("Error handling payment.captured:", error);
    throw error;
  }
}

/**
 * Handle payment failed event
 */
async function handlePaymentFailed(payment: PaymentEntity) {
  try {
    console.log(`Processing payment.failed for order: ${payment.order_id}`);

    const errorDescription =
      payment.error_description || "Payment failed without error description";

    // Mark order as failed
    await convex.mutation(api.orders.markOrderFailed, {
      razorpayOrderId: payment.order_id,
      notes: `Payment failed: ${errorDescription} (Error code: ${payment.error_code})`,
    });

    console.log(`Order marked as failed: ${payment.order_id}`);

    // TODO: Send payment failure notification email
  } catch (error) {
    console.error("Error handling payment.failed:", error);
    throw error;
  }
}

/**
 * Handle payment authorized event
 */
async function handlePaymentAuthorized(payment: PaymentEntity) {
  try {
    console.log(`Processing payment.authorized for order: ${payment.order_id}`);

    // Find order in database
    const order = await convex.query(api.orders.getOrderByRazorpayId, {
      razorpayOrderId: payment.order_id,
    });

    if (!order) {
      console.error(`Order not found for Razorpay order ID: ${payment.order_id}`);
      return;
    }

    console.log(`Payment authorized for order ${order.orderNumber}`);

    // Note: Payment will be captured automatically or manually
    // The payment.captured event will update the final status
  } catch (error) {
    console.error("Error handling payment.authorized:", error);
    throw error;
  }
}
