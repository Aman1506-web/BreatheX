"use client";

import { Flame, Wind, StretchHorizontal, Dumbbell, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DayBlock } from "./types";

const ICONS = {
  warmup: StretchHorizontal,
  main: Dumbbell,
  finisher: Flame,
  pranayama: Wind,
  cooldown: StretchHorizontal,
} as const;

const COLORS = {
  warmup: {
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-200",
    iconBg: "bg-gradient-to-br from-orange-100 to-amber-100",
    iconColor: "text-orange-700",
    shadow: "shadow-orange-100/50"
  },
  main: {
    gradient: "from-blue-600 to-indigo-600",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-200",
    iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
    iconColor: "text-blue-700",
    shadow: "shadow-blue-100/50"
  },
  finisher: {
    gradient: "from-red-500 to-pink-500",
    bg: "bg-gradient-to-br from-red-50 to-pink-50",
    border: "border-red-200",
    iconBg: "bg-gradient-to-br from-red-100 to-pink-100",
    iconColor: "text-red-700",
    shadow: "shadow-red-100/50"
  },
  pranayama: {
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50",
    border: "border-teal-200",
    iconBg: "bg-gradient-to-br from-teal-100 to-cyan-100",
    iconColor: "text-teal-700",
    shadow: "shadow-teal-100/50"
  },
  cooldown: {
    gradient: "from-purple-500 to-violet-500",
    bg: "bg-gradient-to-br from-purple-50 to-violet-50",
    border: "border-purple-200",
    iconBg: "bg-gradient-to-br from-purple-100 to-violet-100",
    iconColor: "text-purple-700",
    shadow: "shadow-purple-100/50"
  }
} as const;

export default function BlockCard({ block, children }: { block: DayBlock; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const Icon = ICONS[block.type] ?? Dumbbell;
  const colors = COLORS[block.type];

  return (
    <section className={`rounded-xl sm:rounded-2xl border ${colors.border} ${colors.bg} shadow-lg ${colors.shadow} overflow-hidden`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 
                   hover:opacity-90 active:scale-[0.99] transition-all"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className={`h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 rounded-xl ${colors.iconBg} flex items-center justify-center shadow-md`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.iconColor}`} />
          </div>
          <div className="text-left min-w-0">
            <h2 className="text-sm sm:text-base font-bold capitalize truncate text-neutral-900">
              {block.title ?? block.type}
            </h2>
            <p className="text-[10px] sm:text-xs text-neutral-600 truncate font-medium">
              {subtitleFor(block.type)}
            </p>
          </div>
        </div>
        <ChevronDown 
          className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`} 
        />
      </button>

      {open && (
        <div className="px-3 sm:px-5 pb-3 sm:pb-4">
          {children}
        </div>
      )}
    </section>
  );
}

function subtitleFor(type: DayBlock["type"]) {
  switch (type) {
    case "warmup": return "Prime joints • 5–7 mins";
    case "main": return "Core sets • progressive overload";
    case "finisher": return "Short conditioning burst";
    case "pranayama": return "Breathwork for calm & focus";
    case "cooldown": return "Light stretches to recover";
  }
}