// "use client";

// import PlanHeader from "@/components/programs/workouts/PlanHeader";
// import PlanDescription from "@/components/programs/workouts/PlanDescription";
// import Weeks, { Week } from "@/components/programs/workouts/Weeks";

// export default function MuscleGainBeginnerPage() {
//   // ---- MOCK DATA (replace later with Convex) ----
//   const weeks: Week[] = [
//   {
//     label: "Week 1",
//     days: [
//       { title: "Day 1 • Push 1 ", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2 ", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 2",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 3",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 4",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 5",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 6",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 7",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 8",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 9",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 10",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 11",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
//   {
//     label: "Week 12",
//     days: [
//       { title: "Day 1 • Push 1", meta: "30 mins • Full Body" },
//       { title: "Day 2 • Pull 1", meta: "30 mins • Full Body" },
//       { title: "Day 4 • Push 2", meta: "30 mins • Full Body" },
//       { title: "Day 5 • Pull 2", meta: "30 mins • Full Body" },
//     ],
//   },
// ];


//   return (
//     <main className="min-h-screen bg-neutral-50">
//       <section className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
//         {/* TOP: image + meta */}
//         <PlanHeader
//           title="Muscle Gain • Beginner"
//           subtitle="12-week progressive plan • Push/Pull split"
//           weeks={12}
//           workoutsPerWeek={4}
//           minutesPerWorkout={30}
//           // imageSrc="/images/programs/placeholder.jpg"
//         />

//         {/* Description */}
//         <PlanDescription
//           description="A low-stress beginner program designed for students. Simple push/pull sessions you can perform with bodyweight and light equipment. Focus is on form, consistency, and progressive overload."
//           bullets={[
//             "Kiske liye: beginners ya pause ke baad wapas start karne wale.",
//             "Kya chahiye: bodyweight + optional resistance band/dumbbells.",
//             "How to follow: haftay me 4 din, alternate rest days, exam week me low-volume option.",
//           ]}
//         />

//         {/* Week-by-week */}
//         <Weeks weeks={weeks} baseHref="/programs/students/plans/muscle-gain-beginner/day" />
//       </section>
//     </main>
//   );
// }




// src/app/programs/students/plans/[planSlug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import PlanHeader from "@/components/programs/workouts/PlanHeader";
import PlanDescription from "@/components/programs/workouts/PlanDescription";
import Weeks, { Week } from "@/components/programs/workouts/Weeks";
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
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
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
    </main>
  );
}
