import { defineTable } from "convex/server";
import { v } from "convex/values";

export const cartSchema = {
  cartItems: defineTable({
    userId: v.string(), // Clerk user ID
    productId: v.string(),
    name: v.string(),
    slug: v.string(),
    price: v.number(),
    originalPrice: v.number(),
    image: v.string(),
    size: v.string(),
    quantity: v.number(),
    discount: v.number(),
    addedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId", "size"]),

  // Optional: Cart history for analytics and tracking user behavior
  cartHistory: defineTable({
    userId: v.string(),
    action: v.string(), // "add", "remove", "update", "checkout", "clear"
    productId: v.string(),
    productName: v.optional(v.string()),
    quantity: v.number(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]).index("by_timestamp", ["timestamp"]),
};
