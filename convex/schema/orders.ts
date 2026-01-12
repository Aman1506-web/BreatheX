import { defineTable } from "convex/server";
import { v } from "convex/values";

export const ordersSchema = {
  orders: defineTable({
    // User Information
    userId: v.string(),
    userEmail: v.string(),
    userName: v.optional(v.string()),
    userPhone: v.optional(v.string()),

    // Order Details
    orderNumber: v.string(), // Unique order number
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        slug: v.string(),
        price: v.number(),
        originalPrice: v.number(),
        image: v.string(),
        size: v.string(),
        quantity: v.number(),
        discount: v.number(),
      })
    ),

    // Pricing
    subtotal: v.number(),
    discount: v.number(),
    totalSavings: v.number(),
    totalAmount: v.number(),

    // Razorpay Payment Details
    razorpayOrderId: v.string(),
    razorpayPaymentId: v.optional(v.string()),
    razorpaySignature: v.optional(v.string()),

    // Order Status
    status: v.union(
      v.literal("created"),
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("authorized"),
      v.literal("captured"),
      v.literal("failed")
    ),

    // Shipping Address (Optional)
    shippingAddress: v.optional(
      v.object({
        fullName: v.string(),
        phone: v.string(),
        addressLine1: v.string(),
        addressLine2: v.optional(v.string()),
        city: v.string(),
        state: v.string(),
        pincode: v.string(),
        country: v.string(),
      })
    ),

    // Metadata
    currency: v.string(),
    notes: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    paidAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_razorpay_order", ["razorpayOrderId"])
    .index("by_order_number", ["orderNumber"])
    .index("by_status", ["status"])
    .index("by_payment_status", ["paymentStatus"]),
};
