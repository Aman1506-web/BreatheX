import { v } from "convex/values";

export const Category = v.union(
  v.literal("students"),
  v.literal("housewives"),
  v.literal("professionals"),
);

export const AccessTier = v.union(
  v.literal("free"),
  v.literal("basic"),
  v.literal("pro"),
);

// Reusable “exercise item” + “block” for plan_days
export const ExerciseItem = v.object({
  name: v.string(),
  sets: v.optional(v.number()),
  reps: v.optional(v.string()),
  time: v.optional(v.string()),
  rest: v.optional(v.string()),
  tempo: v.optional(v.string()),
  notes: v.optional(v.string()),
});

export const DayBlock = v.object({
  type: v.union(
    v.literal("warmup"),
    v.literal("main"),
    v.literal("finisher"),
    v.literal("pranayama"),
    v.literal("cooldown"),
  ),
  title: v.optional(v.string()),
  items: v.array(ExerciseItem),
});

