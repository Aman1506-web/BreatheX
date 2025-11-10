"use client";

import PlanHeader from "@/components/programs/workouts/PlanHeader";
import PlanDescription from "@/components/programs/workouts/PlanDescription";
import Weeks, { Week } from "@/components/programs/workouts/Weeks";
import { makePushPullWeeks } from "@/components/programs/workouts/weekGenerators";

export default function HomeStrengthStarterPage() {
  // quick 12 week generator (same structure each week for now)
  const weeks: Week[] = makePushPullWeeks(12);

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        {/* 2-column layout: content + sticky TOC */}
        <div className="grid gap-10 lg:grid-cols-[1fr,280px]">
          <div className="space-y-8">
            <PlanHeader
              title="Home Strength Starter"
              subtitle="12-week progressive plan • Minimal equipment"
              weeks={12}
              workoutsPerWeek={4}
              minutesPerWorkout={30}
              // imageSrc="/images/programs/housewives/home-strength.jpg"
            />

            <PlanDescription
              description="A gentle but effective home-friendly strength plan designed for homemakers. Short sessions, joint-friendly moves, and pranayama finishers to keep energy high throughout the day."
              bullets={[
                "Kiske liye: beginners ya ghar par workout karne wale.",
                "Kya chahiye: yoga mat + optional light dumbbells/resistance band.",
                "How to follow: 4 din/hafta, rest ya light walk between sessions.",
              ]}
            />

            <Weeks weeks={weeks} baseHref="/programs/housewives/plans/home-strength-starter/day" />
          </div>
        </div>
      </section>
    </main>
  );
}
