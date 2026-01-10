// convex/schema/programs.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";
import { AccessTier, Category } from "./_shared";

// PLANS
const plans = defineTable({
  category: Category, // "students" | "housewives" | "professionals"
  title: v.string(),
  slug: v.string(), // unique per category
  subtext: v.optional(v.string()),
  durationWeeks: v.number(),
  workoutsPerWeek: v.number(),
  minutesPerWorkout: v.number(),
  heroImage: v.optional(v.string()),
  description: v.string(),
  bullets: v.array(v.string()),
  accessTier: AccessTier, // "free" | "basic" | "pro"
  published: v.optional(v.boolean()), // (optional; uncomment when you enable)
}).index("by_category_slug", ["category", "slug"]);
// .index("by_category_published", ["category", "published"]); // later if needed

// PLAN OUTLINES (week/day labels for fast overview)
const plan_outlines = defineTable({
  planId: v.id("plans"),
  weeks: v.array(
    v.object({
      label: v.string(), // "Week 1"
      days: v.array(
        v.object({
          title: v.string(), // "Day 1 • Push 1"
          meta: v.optional(v.string()), // "30 mins • Full Body"
        })
      ),
    })
  ),
}).index("by_plan", ["planId"]);

// PLAN DAYS (canonical day detail)
const plan_days = defineTable({
  planId: v.id("plans"),
  weekIndex: v.number(),
  dayIndex: v.number(),
  title: v.optional(v.string()),
  focus: v.optional(v.string()),
  blocks: v.array(
    v.object({
      type: v.string(), // warmup, main, finisher, pranayama, cooldown
      items: v.array(
        v.object({
          name: v.string(), // Exercise name
          sets: v.optional(v.float64()), // Always number
          repsOrTime: v.optional(v.string()), // Flexible string ("12 reps", "3-5 min", etc.)
          rest: v.optional(v.string()),
          tempo: v.optional(v.string()),
          notes: v.optional(v.string()), // Extra notes (optional)
        })
      ),
    })
  ),
}).index("by_plan_week_day", ["planId", "weekIndex", "dayIndex"]);

export const programsSchema = { plans, plan_outlines, plan_days } as const;
