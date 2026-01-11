// src/app/programs/students/plans/[planSlug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import PlanHeader from "@/components/programs/workouts/PlanHeader";
import PlanDescription from "@/components/programs/workouts/PlanDescription";
import Weeks, { Week } from "@/components/programs/workouts/Weeks";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import Footer from "@/components/Footer";
import { api } from "../../../../../../convex/_generated/api";

// avoid stale SSG
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PlanOverviewPage({
  params,
}: {
  params: Promise<{ planSlug: string }>;
}) {
  const { planSlug } = await params;

  const plan = await fetchQuery(api.plans.getPlanBySlug, {
    category: "students",
    slug: planSlug,
  });

  // ✅ unpublished or missing → 404
  if (!plan) notFound();

  // ✅ FETCH OUTLINE from Convex
  const outline = await fetchQuery(api.plans.getPlanOutline, {
    planId: plan._id,
  });

  // ✅ MAP to UI Weeks[] (with proper hrefs)
  const weeks: Week[] =
    outline?.weeks?.map((w, wi) => ({
      label: w.label,
      days: w.days.map((d, di) => ({
        title: d.title,
        meta: d.meta ?? `${plan.minutesPerWorkout} mins`,
        href: `/programs/students/plans/${plan.slug}/week/${wi + 1}/day/${di + 1}`,
      })),
    })) ?? [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8">
        <PlanHeader
          title={plan.title}
          subtitle={`${plan.durationWeeks}-week progressive plan`}
          weeks={plan.durationWeeks}
          workoutsPerWeek={plan.workoutsPerWeek}
          minutesPerWorkout={plan.minutesPerWorkout}
          imageSrc={plan.heroImage}
        />

        <PlanDescription description={plan.description} bullets={plan.bullets} />

        <Weeks weeks={weeks} />
      </section>

      <MovingCommunityStrip />
      <Footer />
    </main>
  );
}