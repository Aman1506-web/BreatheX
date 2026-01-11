"use client";

import { Timer, Info, PackageOpen } from "lucide-react";
import type { DayMeta } from "./types";

export default function DayHeader({ meta }: { meta: DayMeta }) {
  return (
    <header className="rounded-xl sm:rounded-2xl border border-neutral-200 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-100/20">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-indigo-600">{meta.dayTitle}</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
            {meta.planTitle}
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-neutral-700 font-medium">
            {meta.focus}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill 
            icon={<Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} 
            label={meta.duration}
            color="blue"
          />
          {meta.equipment && (
            <Pill 
              icon={<PackageOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} 
              label={meta.equipment}
              color="purple"
            />
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex items-start gap-2 text-[10px] sm:text-xs text-blue-700 bg-blue-50 border border-blue-100 p-2.5 sm:p-3 rounded-lg">
        <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5 text-blue-600" />
        <span className="leading-relaxed font-medium">
          Follow prescribed rests; focus on clean form over speed.
        </span>
      </div>
    </header>
  );
}

function Pill({ icon, label, color }: { icon: React.ReactNode; label: string; color: "blue" | "purple" }) {
  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200/50",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200/50"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold ${colorClasses[color]}`}>
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}