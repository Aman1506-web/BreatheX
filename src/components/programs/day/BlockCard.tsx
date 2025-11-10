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

export default function BlockCard({ block, children }: { block: DayBlock; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const Icon = ICONS[block.type] ?? Dumbbell;

  return (
    <section className="rounded-2xl border bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Icon className="h-5 w-5 text-neutral-700" />
          </div>
          <div className="text-left">
            <h2 className="text-base font-semibold capitalize">
              {block.title ?? block.type}
            </h2>
            <p className="text-xs text-neutral-500">
              {subtitleFor(block.type)}
            </p>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="px-5 pb-4">{children}</div>}
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
