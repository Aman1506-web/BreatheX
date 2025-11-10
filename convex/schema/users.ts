import { defineTable } from "convex/server";
import { v } from "convex/values";

const users = defineTable({
  name: v.string(),
  email: v.string(),
  image: v.optional(v.string()),
  clerkId: v.string(),
  // optional: role for admin panel later
  role: v.optional(v.union(v.literal("admin"), v.literal("member"))),
}).index("by_clerk_id", ["clerkId"]);

export const usersSchema = { users } as const;
