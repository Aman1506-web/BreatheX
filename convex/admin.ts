// convex/admin.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users";
import type { Doc } from "./_generated/dataModel";


/** small helper */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

/* --------------------------------------------------------- */
/*  Plans: list (read-only)                                  */
/* --------------------------------------------------------- */
export const listPlans = query({
  args: {
    category: v.optional(v.union(v.literal("students"), v.literal("housewives"), v.literal("professionals"))),
    status: v.optional(v.union(v.literal("all"), v.literal("published"), v.literal("draft"))),
  },
  handler: async (ctx, { category, status }) => {
    await requireAdmin(ctx);

    const rows = category
      ? await ctx.db.query("plans").withIndex("by_category_slug", (q) => q.eq("category", category)).collect()
      : await ctx.db.query("plans").collect();

    const filtered =
      status === "published"
        ? rows.filter(r => r.published === true)
        : status === "draft"
        ? rows.filter(r => !r.published)
        : rows;

    return filtered
      .sort((a, b) => b._creationTime - a._creationTime)
      .map(p => ({
        _id: p._id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        published: !!p.published,
        minutesPerWorkout: p.minutesPerWorkout,
        workoutsPerWeek: p.workoutsPerWeek,
        durationWeeks: p.durationWeeks,
      }));
  },
});

/* --------------------------------------------------------- */
/*  Plans: create (meta only, published=false)               */
/* --------------------------------------------------------- */
export const createPlan = mutation({
  args: {
    title: v.string(),
    category: v.union(v.literal("students"), v.literal("housewives"), v.literal("professionals")),
    heroImage: v.optional(v.string()),
    description: v.optional(v.string()),
    bullets: v.optional(v.array(v.string())),
    accessTier: v.optional(v.union(v.literal("free"), v.literal("basic"), v.literal("pro"))),
    durationWeeks: v.optional(v.number()),
    workoutsPerWeek: v.optional(v.number()),
    minutesPerWorkout: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const slug = slugify(args.title);

    const exists = await ctx.db
      .query("plans")
      .withIndex("by_category_slug", (q) => q.eq("category", args.category).eq("slug", slug))
      .first();
    if (exists) throw new Error("A plan with this title already exists in this category.");

    const planId = await ctx.db.insert("plans", {
      category: args.category,
      title: args.title,
      slug,
      heroImage: args.heroImage,
      description: args.description ?? "",
      bullets: args.bullets ?? [],
      durationWeeks: args.durationWeeks ?? 4,
      workoutsPerWeek: args.workoutsPerWeek ?? 4,
      minutesPerWorkout: args.minutesPerWorkout ?? 30,
      accessTier: args.accessTier ?? "free",
      published: false,
    });

    return { planId, slug };
  },
});

/* --------------------------------------------------------- */
/*  Plans: meta update + publish                             */
/* --------------------------------------------------------- */
export const updatePlanMeta = mutation({
  args: {
    planId: v.id("plans"),
    patch: v.object({
      title: v.optional(v.string()),
      subtext: v.optional(v.string()),   // <-- ADD THIS
      heroImage: v.optional(v.string()),
      description: v.optional(v.string()),
      bullets: v.optional(v.array(v.string())),
      accessTier: v.optional(v.union(v.literal("free"), v.literal("basic"), v.literal("pro"))),
      category: v.optional(v.union(v.literal("students"), v.literal("housewives"), v.literal("professionals"))),
      durationWeeks: v.optional(v.number()),
      workoutsPerWeek: v.optional(v.number()),
      minutesPerWorkout: v.optional(v.number()),
      slug: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { planId, patch }) => {
    await requireAdmin(ctx);

    const existing = await ctx.db.get(planId);
    if (!existing) throw new Error("Plan not found");

    type PlanPatch = Partial<
      Pick<
        Doc<"plans">,
        | "title"
        | "subtext"
        | "heroImage"
        | "description"
        | "bullets"
        | "accessTier"
        | "category"
        | "durationWeeks"
        | "workoutsPerWeek"
        | "minutesPerWorkout"
        | "slug"
      >
    >;

    const next: PlanPatch = { ...patch };

    if (patch.title && !patch.slug) next.slug = slugify(patch.title);

    if ((next.slug && next.slug !== existing.slug) || (next.category && next.category !== existing.category)) {
      const cat = next.category ?? existing.category;
      const slg = next.slug ?? existing.slug;
      const collision = await ctx.db
        .query("plans")
        .withIndex("by_category_slug", (q) => q.eq("category", cat).eq("slug", slg))
        .first();
      if (collision && collision._id !== planId) throw new Error("Slug already used in this category.");
    }

    await ctx.db.patch(planId, next);
    return { ok: true };
  },
});

export const setPublished = mutation({
  args: { planId: v.id("plans"), published: v.boolean() },
  handler: async (ctx, { planId, published }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(planId, { published });
    return { ok: true };
  },
});

/* --------------------------------------------------------- */
/*  Outline helpers                                          */
/* --------------------------------------------------------- */

// NEW: fetch outline
export const getPlanOutline = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, { planId }) => {
    await requireAdmin(ctx);
    const outline = await ctx.db
      .query("plan_outlines")
      .withIndex("by_plan", (q) => q.eq("planId", planId))
      .first();
    return outline ?? null;
  },
});

export const generateOutline = mutation({
  args: {
    planId: v.id("plans"),
    weeks: v.number(),
    daysPerWeek: v.number(),
    defaultMeta: v.optional(v.string()),
  },
  handler: async (ctx, { planId, weeks, daysPerWeek, defaultMeta }) => {
    await requireAdmin(ctx);

    const plan = await ctx.db.get(planId);
    if (!plan) throw new Error("Plan not found");

    const minutes = plan.minutesPerWorkout;
    const weeksArr = Array.from({ length: weeks }, (_, i) => ({
      label: `Week ${i + 1}`,
      days: Array.from({ length: daysPerWeek }, (_, d) => ({
        title: `Day ${d + 1}`,
        meta: defaultMeta ?? `${minutes} mins`,
      })),
    }));

    const existing = await ctx.db.query("plan_outlines").withIndex("by_plan", (q) => q.eq("planId", planId)).first();

    if (existing) await ctx.db.patch(existing._id, { weeks: weeksArr });
    else await ctx.db.insert("plan_outlines", { planId, weeks: weeksArr });

    return { ok: true };
  },
});

// UPDATED: clearer name
export const setDayMeta = mutation({
  args: {
    planId: v.id("plans"),
    weekIndex: v.number(),
    dayIndex: v.number(),
    title: v.string(),
    meta: v.optional(v.string()),
  },
  handler: async (ctx, { planId, weekIndex, dayIndex, title, meta }) => {
    await requireAdmin(ctx);

    const outline = await ctx.db.query("plan_outlines").withIndex("by_plan", (q) => q.eq("planId", planId)).first();
    if (!outline) throw new Error("Outline not found");

    const weeks = outline.weeks.slice();
    if (!weeks[weekIndex - 1] || !weeks[weekIndex - 1].days[dayIndex - 1]) throw new Error("Invalid week/day index");

    weeks[weekIndex - 1].days[dayIndex - 1] = { title, meta: meta ?? weeks[weekIndex - 1].days[dayIndex - 1].meta };
    await ctx.db.patch(outline._id, { weeks });

    return { ok: true };
  },
});

/* --------------------------------------------------------- */
/*  Day editor (canonical blocks)                            */
/* --------------------------------------------------------- */
export const upsertDay = mutation({
  args: {
    planId: v.id("plans"),
    weekIndex: v.number(),
    dayIndex: v.number(),
    title: v.optional(v.string()),
    focus: v.optional(v.string()),
    blocks: v.array(
      v.object({
        type: v.string(),
        items: v.array(
          v.object({
            name: v.string(),
            sets: v.float64(),
            repsOrTime: v.string(),
            notes: v.optional(v.string()),
          })
        ),
      })
    ),
  },
  handler: async (ctx, { planId, weekIndex, dayIndex, title, focus, blocks }) => {
    await requireAdmin(ctx);

    const existing = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", weekIndex).eq("dayIndex", dayIndex)
      )
      .first();

    const doc = { planId, weekIndex, dayIndex, title, focus, blocks };

    if (existing) {
      await ctx.db.patch(existing._id, doc);
    } else {
      await ctx.db.insert("plan_days", doc);
    }

    return { ok: true };
  },
});



/* --------------------------------------------------------- */
/*  Day editor helpers                                       */
/* --------------------------------------------------------- */
// 1. Get a specific day
export const getDay = query({
  args: {
    planId: v.id("plans"),
    weekIndex: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { planId, weekIndex, dayIndex }) => {
    await requireAdmin(ctx);

    const existing = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", weekIndex).eq("dayIndex", dayIndex)
      )
      .first();

    if (!existing) return null;
    return {
      title: existing.title ?? "",
      focus: existing.focus ?? "",
      blocks: existing.blocks ?? [],
    };
  },
});

// 2. Duplicate a day
export const duplicateDay = mutation({
  args: {
    planId: v.id("plans"),
    srcWeek: v.number(),
    srcDay: v.number(),
    destWeek: v.number(),
    destDay: v.number(),
  },
  handler: async (ctx, { planId, srcWeek, srcDay, destWeek, destDay }) => {
    await requireAdmin(ctx);

    const src = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", srcWeek).eq("dayIndex", srcDay)
      )
      .first();
    if (!src) throw new Error("Source day not found");

    const dest = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", destWeek).eq("dayIndex", destDay)
      )
      .first();

    const data = {
      planId,
      weekIndex: destWeek,
      dayIndex: destDay,
      title: src.title,
      focus: src.focus,
      blocks: src.blocks,
    };

    if (dest) {
      await ctx.db.patch(dest._id, data);
    } else {
      await ctx.db.insert("plan_days", data);
    }

    return { ok: true };
  },
});

// 3. Apply one day to all weeks (same dayIndex)
export const applyDayToAllWeeks = mutation({
  args: {
    planId: v.id("plans"),
    srcWeek: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { planId, srcWeek, dayIndex }) => {
    await requireAdmin(ctx);

    const src = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", srcWeek).eq("dayIndex", dayIndex)
      )
      .first();
    if (!src) throw new Error("Source day not found");

    const plan = await ctx.db.get(planId);
    if (!plan) throw new Error("Plan not found");

    for (let w = 1; w <= plan.durationWeeks; w++) {
      if (w === srcWeek) continue;

      const dest = await ctx.db
        .query("plan_days")
        .withIndex("by_plan_week_day", (q) =>
          q.eq("planId", planId).eq("weekIndex", w).eq("dayIndex", dayIndex)
        )
        .first();

      const data = {
        planId,
        weekIndex: w,
        dayIndex,
        title: src.title,
        focus: src.focus,
        blocks: src.blocks,
      };

      if (dest) {
        await ctx.db.patch(dest._id, data);
      } else {
        await ctx.db.insert("plan_days", data);
      }
    }

    return { ok: true };
  },
});
