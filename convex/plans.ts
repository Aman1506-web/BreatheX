import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import type { Id, Doc } from "./_generated/dataModel";

/** tiny helper */
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** LIST: plans by category (students/housewives/professionals) */
export const getPlansByCategory = query({
  args: {
    category: v.union(
      v.literal("students"),
      v.literal("housewives"),
      v.literal("professionals")
    ),
  },
  handler: async (ctx, { category }) => {
    const rows = await ctx.db
      .query("plans")
      // use the existing index from schema: ["category", "slug"]
      .withIndex("by_category_slug", (q) => q.eq("category", category))
      .collect();

    return rows.map((p) => ({
      _id: p._id,
      category: p.category,
      title: p.title,
      slug: p.slug,
      heroImage: p.heroImage,
      durationWeeks: p.durationWeeks,
      workoutsPerWeek: p.workoutsPerWeek,
      minutesPerWorkout: p.minutesPerWorkout,
      accessTier: p.accessTier,
    }));
  },
});


/** DETAIL: single plan by slug (overview header + description) */
export const getPlanBySlug = query({
  args: {
    category: v.union(
      v.literal("students"),
      v.literal("housewives"),
      v.literal("professionals")
    ),
    slug: v.string(),
  },
  handler: async (ctx, { category, slug }) => {
    const plan = await ctx.db
      .query("plans")
      .withIndex("by_category_slug", (q) =>
        q.eq("category", category).eq("slug", slug)
      )
      .first();

    if (!plan) return null;
    return {
      _id: plan._id,
      category: plan.category,
      title: plan.title,
      slug: plan.slug,
      heroImage: plan.heroImage,
      description: plan.description,
      bullets: plan.bullets,
      durationWeeks: plan.durationWeeks,
      workoutsPerWeek: plan.workoutsPerWeek,
      minutesPerWorkout: plan.minutesPerWorkout,
      accessTier: plan.accessTier,
    };
  },
});


/** Seed ONLY students demo plans (idempotent-ish upsert) */
export const seedStudents = mutation({
  args: {},
  handler: async (ctx) => {
    const rows = [
      {
        category: "students" as const,
        title: "Muscle Gain Beginner",
        heroImage: "/images/programs/hero/students-gym.png",
        description:
          "Campus schedule-friendly hypertrophy plan with short, effective sessions.",
        bullets: ["3 days/week", "Full-body splits", "Minimal equipment"],
        durationWeeks: 12,
        workoutsPerWeek: 4,
        minutesPerWorkout: 30,
        accessTier: "basic" as const,
      },
      {
        category: "students" as const,
        title: "Exam Energizer",
        heroImage: "/images/programs/hero/students-study.png",
        description:
          "Low-stress movement + breathwork to boost focus during exam weeks.",
        bullets: ["20–30 min", "Desk mobility", "Pranayama focus"],
        durationWeeks: 3,
        workoutsPerWeek: 4,
        minutesPerWorkout: 25,
        accessTier: "free" as const,
      },
    ];

    for (const r of rows) {
      const slug = slugify(r.title);
      const existing = await ctx.db
        .query("plans")
        .withIndex("by_category_slug", (q) =>
          q.eq("category", r.category).eq("slug", slug)
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          title: r.title,
          heroImage: r.heroImage,
          description: r.description,
          bullets: r.bullets,
          durationWeeks: r.durationWeeks,
          workoutsPerWeek: r.workoutsPerWeek,
          minutesPerWorkout: r.minutesPerWorkout,
          accessTier: r.accessTier,
        });
      } else {
        await ctx.db.insert("plans", {
          category: r.category,
          title: r.title,
          slug,
          durationWeeks: r.durationWeeks,
          workoutsPerWeek: r.workoutsPerWeek,
          minutesPerWorkout: r.minutesPerWorkout,
          heroImage: r.heroImage,
          description: r.description,
          bullets: r.bullets,
          accessTier: r.accessTier,
        });
      }
    }

    return { ok: true, count: rows.length };
  },
});


/** OUTLINE: get by planId */
export const getPlanOutline = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, { planId }) => {
    const outline = await ctx.db
      .query("plan_outlines")
      .withIndex("by_plan", (q) => q.eq("planId", planId))
      .first();
    return outline ?? null;
  },
});


/** OUTLINE: seed both student plans */
export const seedStudentsOutlines = mutation({
  args: {},
  handler: async (ctx) => {
    async function findPlan(slug: string) {
      return await ctx.db
        .query("plans")
        .withIndex("by_category_slug", (q) =>
          q.eq("category", "students").eq("slug", slug)
        )
        .first();
    }

    // 1) Muscle Gain Beginner (12 weeks, 4 days/wk)
    const mgb = await findPlan("muscle-gain-beginner");
    if (mgb) {
      const minutes = mgb.minutesPerWorkout;
      const weeks = Array.from({ length: mgb.durationWeeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        days: [
          { title: "Day 1 • Push 1", meta: `${minutes} mins • Full Body` },
          { title: "Day 2 • Pull 1", meta: `${minutes} mins • Full Body` },
          { title: "Day 4 • Push 2", meta: `${minutes} mins • Full Body` },
          { title: "Day 5 • Pull 2", meta: `${minutes} mins • Full Body` },
        ],
      }));

      const existing = await ctx.db
        .query("plan_outlines")
        .withIndex("by_plan", (q) => q.eq("planId", mgb._id))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { weeks });
      } else {
        await ctx.db.insert("plan_outlines", { planId: mgb._id, weeks });
      }
    }

    // 2) Exam Energizer (3 weeks, 4 days/wk)
    const exam = await findPlan("exam-energizer");
    if (exam) {
      const minutes = exam.minutesPerWorkout;
      const weeks = Array.from({ length: exam.durationWeeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        days: [
          { title: "Day 1 • Mobility + Breath", meta: `${minutes} mins • Focus` },
          { title: "Day 2 • Strength (Easy)", meta: `${minutes} mins • Full Body` },
          { title: "Day 4 • Core + Stretch", meta: `${minutes} mins • Recovery` },
          { title: "Day 5 • Breath Reset", meta: `${minutes} mins • Pranayama` },
        ],
      }));

      const existing = await ctx.db
        .query("plan_outlines")
        .withIndex("by_plan", (q) => q.eq("planId", exam._id))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { weeks });
      } else {
        await ctx.db.insert("plan_outlines", { planId: exam._id, weeks });
      }
    }

    return { ok: true };
  },
});


/** DAY DETAIL: get a specific day by indices */
export const getDayDetail = query({
  args: {
    planId: v.id("plans"),
    weekIndex: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { planId, weekIndex, dayIndex }) => {
    const day = await ctx.db
      .query("plan_days")
      .withIndex("by_plan_week_day", (q) =>
        q.eq("planId", planId).eq("weekIndex", weekIndex).eq("dayIndex", dayIndex)
      )
      .first();
    return day ?? null;
  },
});


/** Seed sample day detail for both plans (W1D1) */
export const seedStudentsDays = mutation({
  args: {},
  handler: async (ctx) => {
    async function findPlan(slug: string) {
      return await ctx.db
        .query("plans")
        .withIndex("by_category_slug", (q) =>
          q.eq("category", "students").eq("slug", slug)
        )
        .first();
    }

    type SeedDayItem = {
      name: string;
      sets?: number;
      reps?: string;
      time?: string;
      repsOrTime?: string;
      rest?: string;
      tempo?: string;
      notes?: string;
    };

    type SeedDayBlock = {
      type: string;
      title?: string;
      items: SeedDayItem[];
    };

    type SeedDayDoc = {
      title?: string;
      focus?: string;
      blocks: SeedDayBlock[];
    };

    const normalizeDay = (doc: SeedDayDoc): Pick<Doc<"plan_days">, "title" | "focus" | "blocks"> => ({
      title: doc.title,
      focus: doc.focus,
      blocks: doc.blocks.map((block) => ({
        type: block.type,
        items: block.items.map((item) => {
          const repsOrTime = item.repsOrTime ?? item.reps ?? item.time;
          const extraNotes = [item.rest ? `Rest: ${item.rest}` : "", item.tempo ? `Tempo: ${item.tempo}` : ""]
            .filter(Boolean)
            .join(" • ");
          return {
            name: item.name,
            sets: item.sets,
            repsOrTime,
            notes: item.notes ?? (extraNotes || undefined),
          };
        }),
      })),
    });

    // Upsert helper
    async function upsertDay(
      planId: Id<"plans">,
      weekIndex: number,
      dayIndex: number,
      doc: SeedDayDoc,
    ) {
      const patch = normalizeDay(doc);
      const existing = await ctx.db
        .query("plan_days")
        .withIndex("by_plan_week_day", (q) =>
          q.eq("planId", planId).eq("weekIndex", weekIndex).eq("dayIndex", dayIndex)
        )
        .first();
      if (existing) {
        await ctx.db.patch(existing._id, patch);
      } else {
        await ctx.db.insert("plan_days", { planId, weekIndex, dayIndex, ...patch });
      }
    }

    // 1) Muscle Gain Beginner — Week 1 Day 1
    const mgb = await findPlan("muscle-gain-beginner");
    if (mgb) {
      await upsertDay(mgb._id, 1, 1, {
        title: "Push 1 — Chest/Shoulders/Triceps",
        focus: "Form & consistency; moderate RPE",
        blocks: [
          {
            type: "warmup",
            title: "Warm-up",
            items: [
              { name: "Arm circles", time: "45s", rest: "15s" },
              { name: "Scap push-ups", reps: "12", rest: "20s" },
              { name: "Knee push-ups (easy)", reps: "10", rest: "20s" },
            ],
          },
          {
            type: "main",
            title: "Main Sets",
            items: [
              { name: "Push-ups", sets: 3, reps: "8–12", rest: "60–90s", tempo: "2-1-2", notes: "Full range" },
              { name: "Pike push-ups", sets: 3, reps: "6–10", rest: "60–90s" },
              { name: "Bench/Chair dips", sets: 3, reps: "8–12", rest: "60–90s" },
            ],
          },
          {
            type: "finisher",
            title: "Finisher",
            items: [
              { name: "Mountain climbers", time: "30s", rest: "15s" },
              { name: "Rest", time: "15s" },
              { name: "Mountain climbers", time: "30s" },
            ],
          },
          {
            type: "pranayama",
            title: "Pranayama",
            items: [{ name: "Box breathing (4-4-4-4)", time: "3–4 mins", notes: "Nasal only" }],
          },
          {
            type: "cooldown",
            title: "Cooldown",
            items: [
              { name: "Chest doorway stretch", time: "40s" },
              { name: "Triceps stretch", time: "40s" },
              { name: "Shoulder stretch", time: "40s" },
            ],
          },
        ],
      });
    }

    // 2) Exam Energizer — Week 1 Day 1
    const exam = await findPlan("exam-energizer");
    if (exam) {
      await upsertDay(exam._id, 1, 1, {
        title: "Mobility + Breath",
        focus: "Low-stress movement • focus booster",
        blocks: [
          {
            type: "warmup",
            title: "Gentle Warm-up",
            items: [
              { name: "Neck circles", time: "30s" },
              { name: "Cat–Camel", reps: "10" },
              { name: "Hip openers", reps: "10/side" },
            ],
          },
          {
            type: "main",
            title: "Main Flow",
            items: [
              { name: "Bodyweight squats", sets: 2, reps: "12–15", rest: "45s" },
              { name: "Incline push-ups (desk)", sets: 2, reps: "8–12", rest: "45s" },
              { name: "Glute bridge", sets: 2, reps: "12–15", rest: "45s" },
            ],
          },
          {
            type: "pranayama",
            title: "Focus Breathing",
            items: [
              { name: "Anulom Vilom", time: "3 mins" },
              { name: "Udgeeth (OM Chant)", time: "2 mins" },
            ],
          },
          {
            type: "cooldown",
            title: "Stretch & Recover",
            items: [
              { name: "Hamstring stretch", time: "40s" },
              { name: "Chest stretch", time: "40s" },
            ],
          },
        ],
      });
    }

    return { ok: true };
  },
});



export const getPlanById = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, { planId }) => {
    return await ctx.db.get(planId);
  },
});
