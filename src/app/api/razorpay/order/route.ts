import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// TypeScript interfaces
interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
  discount: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface OrderRequestBody {
  amount: number;
  currency?: string;
  items: CartItem[];
  userEmail: string;
  userName?: string;
  userPhone?: string;
  shippingAddress?: ShippingAddress;
  notes?: {
    customerNote?: string;
    [key: string]: string | undefined;
  };
  subtotal: number;
  discount: number;
  totalSavings: number;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
    const body = (await req.json()) as OrderRequestBody;
    const {
      amount,
      currency = "INR",
      items,
      userEmail,
      userName,
      userPhone,
      shippingAddress,
      notes,
      subtotal,
      discount,
      totalSavings,
    } = body;

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        userEmail,
        userName: userName || "",
        items_count: items.length.toString(),
        ...notes,
      },
    };

    const razorpayOrder = (await razorpay.orders.create(
      options
    )) as RazorpayOrderResponse;

    // Create order in Convex database
    const orderData = {
      userId,
      userEmail,
      userName,
      userPhone,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        discount: item.discount,
      })),
      subtotal: subtotal || amount,
      discount: discount || 0,
      totalSavings: totalSavings || 0,
      totalAmount: amount,
      razorpayOrderId: razorpayOrder.id,
      currency: currency,
      shippingAddress: shippingAddress || undefined,
      notes: notes?.customerNote || undefined,
    };

    const convexOrder = await convex.mutation(api.orders.createOrder, orderData);

    // Return order details
    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderNumber: convexOrder.orderNumber,
      convexOrderId: convexOrder.orderId,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      {
        error: "Failed to create order",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
