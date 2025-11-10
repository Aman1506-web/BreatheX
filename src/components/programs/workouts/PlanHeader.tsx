"use client";

import { CalendarRange, Timer, Dumbbell } from "lucide-react";

type PlanHeaderProps = {
  title: string;
  subtitle?: string;
  weeks: number;
  workoutsPerWeek: number;
  minutesPerWorkout: number;
  imageSrc?: string;
};

export default function PlanHeader({
  title,
  subtitle,
  weeks,
  workoutsPerWeek,
  minutesPerWorkout,
  imageSrc,
}: PlanHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* IMAGE */}
      <div className="w-full md:w-[260px] md:flex-shrink-0">
        {/* Mobile: full width 4:3 | Desktop: square */}
        <div className="aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden bg-neutral-200 ring-1 ring-black/10">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
          ) : null}
        </div>
      </div>

      {/* TEXT / META */}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-neutral-600">{subtitle}</p>}

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MetaPill icon={<CalendarRange className="h-4 w-4" />} label={`${weeks} weeks`} />
          <MetaPill icon={<Dumbbell className="h-4 w-4" />} label={`${workoutsPerWeek} workouts / week`} />
          <MetaPill icon={<Timer className="h-4 w-4" />} label={`${minutesPerWorkout} mins / workout`} />
        </div>
      </div>
    </section>
  );
}

function MetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-sm">
      <span className="text-neutral-700">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
