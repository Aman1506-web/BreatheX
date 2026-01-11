"use client";

import { CalendarRange, Timer, Dumbbell } from "lucide-react";
import Image from "next/image";

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
    <section className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-sm">
      {/* IMAGE */}
      <div className="w-full md:w-[220px] lg:w-[260px] md:flex-shrink-0">
        {/* Mobile: full width 4:3 | Tablet: narrower | Desktop: square */}
        <div className="aspect-[4/3] md:aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 ring-1 ring-neutral-300/50 relative shadow-md">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 260px, 100vw"
              priority
            />
          ) : null}
        </div>
      </div>

      {/* TEXT / META */}
      <div className="min-w-0 flex-1 w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-neutral-600 font-medium">
            {subtitle}
          </p>
        )}

        <div className="mt-4 sm:mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <MetaPill
            icon={<CalendarRange className="h-4 w-4" />}
            label={`${weeks} weeks`}
            color="blue"
          />
          <MetaPill
            icon={<Dumbbell className="h-4 w-4" />}
            label={`${workoutsPerWeek}x / week`}
            color="indigo"
          />
          <MetaPill
            icon={<Timer className="h-4 w-4" />}
            label={`${minutesPerWorkout} mins`}
            color="purple"
          />
        </div>
      </div>
    </section>
  );
}

function MetaPill({ 
  icon, 
  label, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: "blue" | "indigo" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100",
    purple: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
  };

  return (
    <div className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${colorClasses[color]}`}>
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}