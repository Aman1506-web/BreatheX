"use client";

import { Dumbbell, Timer, Info, PackageOpen } from "lucide-react";
import type { DayMeta } from "./types";

export default function DayHeader({ meta }: { meta: DayMeta }) {
  return (
    <header className="rounded-2xl border bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm text-neutral-500">{meta.dayTitle}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate">
            {meta.planTitle}
          </h1>
          <p className="mt-1 text-neutral-700">{meta.focus}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Pill icon={<Timer className="h-4 w-4" />} label={meta.duration} />
          {meta.equipment && (
            <Pill icon={<PackageOpen className="h-4 w-4" />} label={meta.equipment} />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
        <Info className="h-4 w-4" />
        <span>Follow prescribed rests; focus on clean form over speed.</span>
      </div>
    </header>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm">
      {icon}
      <span className="font-medium">{label}</span>
    </span>
  );
}
