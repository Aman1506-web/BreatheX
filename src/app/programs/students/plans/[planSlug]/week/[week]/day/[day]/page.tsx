import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import DayHeader from "@/components/programs/day/DayHeader";
import BlockCard from "@/components/programs/day/BlockCard";
import ExerciseTable from "@/components/programs/day/ExerciseTable";
import CompleteToggle from "@/components/programs/day/CompleteToggle";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import Footer from "@/components/Footer";
import type { DayBlock } from "@/components/programs/day/types";
import { api } from "@/../convex/_generated/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DayDetailPage({
  params,
}: {
  params: Promise<{ planSlug: string; week: string; day: string }>;
}) {
  const { planSlug, week, day } = await params;

  const plan = await fetchQuery(api.plans.getPlanBySlug, {
    category: "students",
    slug: planSlug,
  });
  if (!plan) notFound();

  const detail = await fetchQuery(api.plans.getDayDetail, {
    planId: plan._id,
    weekIndex: Number(week),
    dayIndex: Number(day),
  });
  if (!detail) notFound();

  const meta = {
    dayTitle: `Week ${week} • Day ${day}`,
    planTitle: plan.title,
    focus: detail.focus ?? detail.title,
    duration: `${plan.minutesPerWorkout} mins`,
  };

  const blocks = detail.blocks as DayBlock[];

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8">
        <DayHeader meta={meta} />
        {blocks.map((b, i) => (
          <BlockCard key={i} block={b}>
            <ExerciseTable items={b.items} />
          </BlockCard>
        ))}
        <div className="flex justify-center sm:justify-end">
          <CompleteToggle />
        </div>
      </section>

      <MovingCommunityStrip />
      <Footer />
    </main>
  );
}