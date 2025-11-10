import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";


// existing syncUser; add default role if missing
export const syncUser = mutation({
  args: { name: v.string(), email: v.string(), clerkId: v.string(), image: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("users")
      .withIndex("by_clerk_id", q => q.eq("clerkId", args.clerkId))
      .first();
    if (existing) {
      // backfill role if not present
      if (!existing.role) await ctx.db.patch(existing._id, { role: "member" as const });
      return;
    }
    await ctx.db.insert("users", { ...args, role: "member" as const });
  }
});

// CHANGE the helper signature
async function currentUser(ctx: QueryCtx | MutationCtx) {
  const ident = await ctx.auth.getUserIdentity();
  if (!ident) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", ident.subject))
    .first();
}

// who am i?
export const me = query({
  args: {},
  handler: async (ctx) => {
    const u = await currentUser(ctx);
    if (!u) return null;
    return { _id: u._id, name: u.name, email: u.email, role: u.role ?? "member" };
  }
});

// dev helper: make myself admin (run once from Dashboard)
export const makeMeAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const u = await currentUser(ctx);
    if (!u) throw new Error("Not signed in");
    await ctx.db.patch(u._id, { role: "admin" as const });
    return { ok: true };
  }
});

// (optional) strict admin gate for future admin-only mutations
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const u = await currentUser(ctx);
  if (!u || u.role !== "admin") throw new Error("Not authorized");
  return u;
}
