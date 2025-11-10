"use client";

import PlanHeader from "@/components/programs/workouts/PlanHeader";
import PlanDescription from "@/components/programs/workouts/PlanDescription";
import Weeks, { Week } from "@/components/programs/workouts/Weeks";
import { makePushPullWeeks } from "@/components/programs/workouts/weekGenerators";

export default function ExpressStrengthPage() {
  const weeks: Week[] = makePushPullWeeks(12); // same scaffold for now

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr,280px]">
          <div className="space-y-8">
            <PlanHeader
              title="Express Strength (Busy Schedules)"
              subtitle="12-week plan • 30-minute sessions"
              weeks={12}
              workoutsPerWeek={4}
              minutesPerWorkout={30}
              // imageSrc="/images/programs/professionals/express-strength.jpg"
            />

            <PlanDescription
              description="Built for working professionals—time-efficient strength sessions, low setup, and high return. Maintain muscle, reduce stress, and stay consistent."
              bullets={[
                "Kiske liye: busy schedules, laptop life, travel-friendly routine.",
                "Kya chahiye: bodyweight + optional dumbbells.",
                "How to follow: 4 din/hafta, optional weekend ‘bonus mobility’ session.",
              ]}
            />

            <Weeks weeks={weeks} baseHref="/programs/professionals/plans/express-strength/day" />
          </div>
        </div>
      </section>
    </main>
  );
}
