import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Generate a unique order number
 * Format: ORD-YYYYMMDD-XXXXXX
 */
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${dateStr}-${random}`;
}

/**
 * Create a new order
 */
export const createOrder = mutation({
  args: {
    userId: v.string(),
    userEmail: v.string(),
    userName: v.optional(v.string()),
    userPhone: v.optional(v.string()),
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
    subtotal: v.number(),
    discount: v.number(),
    totalSavings: v.number(),
    totalAmount: v.number(),
    razorpayOrderId: v.string(),
    currency: v.string(),
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
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const orderNumber = generateOrderNumber();
    const now = Date.now();

    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      userEmail: args.userEmail,
      userName: args.userName,
      userPhone: args.userPhone,
      orderNumber,
      items: args.items,
      subtotal: args.subtotal,
      discount: args.discount,
      totalSavings: args.totalSavings,
      totalAmount: args.totalAmount,
      razorpayOrderId: args.razorpayOrderId,
      status: "created",
      paymentStatus: "pending",
      currency: args.currency,
      shippingAddress: args.shippingAddress,
      notes: args.notes,
      createdAt: now,
      updatedAt: now,
    });

    return {
      orderId,
      orderNumber,
    };
  },
});

/**
 * Update order payment details after successful payment
 */
export const updateOrderPayment = mutation({
  args: {
    razorpayOrderId: v.string(),
    razorpayPaymentId: v.string(),
    razorpaySignature: v.string(),
  },
  handler: async (ctx, args) => {
    // Find order by razorpay order ID
    const order = await ctx.db
      .query("orders")
      .withIndex("by_razorpay_order", (q) =>
        q.eq("razorpayOrderId", args.razorpayOrderId)
      )
      .first();

    if (!order) {
      throw new Error("Order not found");
    }

    const now = Date.now();

    // Update order with payment details
    await ctx.db.patch(order._id, {
      razorpayPaymentId: args.razorpayPaymentId,
      razorpaySignature: args.razorpaySignature,
      status: "paid",
      paymentStatus: "captured",
      paidAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      orderNumber: order.orderNumber,
    };
  },
});

/**
 * Mark order as failed
 */
export const markOrderFailed = mutation({
  args: {
    razorpayOrderId: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_razorpay_order", (q) =>
        q.eq("razorpayOrderId", args.razorpayOrderId)
      )
      .first();

    if (!order) {
      throw new Error("Order not found");
    }

    await ctx.db.patch(order._id, {
      status: "failed",
      paymentStatus: "failed",
      notes: args.notes || order.notes,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Get user's orders
 */
export const getUserOrders = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);

    return orders;
  },
});

/**
 * Get order by order number
 */
export const getOrderByNumber = query({
  args: {
    orderNumber: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", args.orderNumber))
      .first();

    // Verify order belongs to user
    if (order && order.userId !== args.userId) {
      throw new Error("Unauthorized access to order");
    }

    return order;
  },
});

/**
 * Get order by Razorpay order ID
 */
export const getOrderByRazorpayId = query({
  args: {
    razorpayOrderId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_razorpay_order", (q) =>
        q.eq("razorpayOrderId", args.razorpayOrderId)
      )
      .first();

    return order;
  },
});

/**
 * Cancel an order (only if not paid)
 */
export const cancelOrder = mutation({
  args: {
    orderNumber: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", args.orderNumber))
      .first();

    if (!order) {
      throw new Error("Order not found");
    }

    // Verify order belongs to user
    if (order.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    // Can only cancel if not paid
    if (order.status === "paid") {
      throw new Error("Cannot cancel paid order. Please request refund.");
    }

    await ctx.db.patch(order._id, {
      status: "cancelled",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Get order statistics for user
 */
export const getUserOrderStats = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const totalOrders = orders.length;
    const paidOrders = orders.filter((o) => o.status === "paid");
    const totalSpent = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalSavings = paidOrders.reduce((sum, o) => sum + o.totalSavings, 0);

    return {
      totalOrders,
      paidOrders: paidOrders.length,
      pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "created").length,
      failedOrders: orders.filter((o) => o.status === "failed").length,
      totalSpent,
      totalSavings,
    };
  },
});
