import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get user's cart
export const getUserCart = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return items;
  },
});

// Get cart item count (for badge display)
export const getCartItemCount = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
});

// Add item to cart
export const addToCart = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
    name: v.string(),
    slug: v.string(),
    price: v.number(),
    originalPrice: v.number(),
    image: v.string(),
    size: v.string(),
    discount: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if item already exists with same size
    const existing = await ctx.db
      .query("cartItems")
      .withIndex("by_user_product", (q) =>
        q
          .eq("userId", args.userId)
          .eq("productId", args.productId)
          .eq("size", args.size)
      )
      .first();

    if (existing) {
      // Update quantity
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + 1,
      });

      // Log history
      await ctx.db.insert("cartHistory", {
        userId: args.userId,
        action: "update",
        productId: args.productId,
        productName: args.name,
        quantity: existing.quantity + 1,
        timestamp: Date.now(),
      });

      return existing._id;
    }

    // Add new item
    const itemId = await ctx.db.insert("cartItems", {
      ...args,
      quantity: 1,
      addedAt: Date.now(),
    });

    // Log history
    await ctx.db.insert("cartHistory", {
      userId: args.userId,
      action: "add",
      productId: args.productId,
      productName: args.name,
      quantity: 1,
      timestamp: Date.now(),
    });

    return itemId;
  },
});

// Update quantity
export const updateCartItemQuantity = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
    size: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("cartItems")
      .withIndex("by_user_product", (q) =>
        q
          .eq("userId", args.userId)
          .eq("productId", args.productId)
          .eq("size", args.size)
      )
      .first();

    if (!item) {
      throw new Error("Item not found in cart");
    }

    if (args.quantity <= 0) {
      await ctx.db.delete(item._id);

      await ctx.db.insert("cartHistory", {
        userId: args.userId,
        action: "remove",
        productId: args.productId,
        productName: item.name,
        quantity: 0,
        timestamp: Date.now(),
      });

      return null;
    }

    await ctx.db.patch(item._id, {
      quantity: args.quantity,
    });

    await ctx.db.insert("cartHistory", {
      userId: args.userId,
      action: "update",
      productId: args.productId,
      productName: item.name,
      quantity: args.quantity,
      timestamp: Date.now(),
    });

    return item._id;
  },
});

// Remove item
export const removeFromCart = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
    size: v.string(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("cartItems")
      .withIndex("by_user_product", (q) =>
        q
          .eq("userId", args.userId)
          .eq("productId", args.productId)
          .eq("size", args.size)
      )
      .first();

    if (item) {
      await ctx.db.delete(item._id);

      await ctx.db.insert("cartHistory", {
        userId: args.userId,
        action: "remove",
        productId: args.productId,
        productName: item.name,
        quantity: 0,
        timestamp: Date.now(),
      });
    }
  },
});

// Clear entire cart
export const clearUserCart = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }

    await ctx.db.insert("cartHistory", {
      userId: args.userId,
      action: "clear",
      productId: "all",
      quantity: 0,
      timestamp: Date.now(),
    });
  },
});

// Merge guest cart with user cart (on login)
export const mergeGuestCart = mutation({
  args: {
    userId: v.string(),
    guestCartItems: v.array(
      v.object({
        id: v.string(),
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
  },
  handler: async (ctx, args) => {
    for (const item of args.guestCartItems) {
      const existing = await ctx.db
        .query("cartItems")
        .withIndex("by_user_product", (q) =>
          q
            .eq("userId", args.userId)
            .eq("productId", item.productId)
            .eq("size", item.size)
        )
        .first();

      if (existing) {
        // Merge quantities
        await ctx.db.patch(existing._id, {
          quantity: existing.quantity + item.quantity,
        });
      } else {
        // Add as new item
        await ctx.db.insert("cartItems", {
          userId: args.userId,
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          discount: item.discount,
          addedAt: Date.now(),
        });
      }
    }

    // Log merge action
    await ctx.db.insert("cartHistory", {
      userId: args.userId,
      action: "merge",
      productId: "guest-cart",
      quantity: args.guestCartItems.length,
      timestamp: Date.now(),
    });
  },
});
