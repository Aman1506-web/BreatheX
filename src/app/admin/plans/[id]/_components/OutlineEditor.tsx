// src/app/admin/plans/[id]/_components/OutlineEditor.tsx
"use client";

import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Outline } from "@/types/plans";

type GenerateFormProps = {
  planId: Id<"plans">;
  weeks: number;
  days: number;
  setWeeks: React.Dispatch<React.SetStateAction<number>>;
  setDays: React.Dispatch<React.SetStateAction<number>>;
  generate: ReturnType<typeof useMutation<typeof api.admin.generateOutline>>;
  setOutline: React.Dispatch<React.SetStateAction<Outline | null>>;
};

type DayCellProps = {
  planId: Id<"plans">;
  weekIndex: number;
  dayIndex: number;
  data: Outline["weeks"][number]["days"][number];
  setDay: ReturnType<typeof useMutation<typeof api.admin.setDayMeta>>;
  outline: Outline;
  setOutline: React.Dispatch<React.SetStateAction<Outline | null>>;
};

export default function OutlineEditor({
  planId,
  initialOutline,
}: {
  planId: Id<"plans">;
  initialOutline: Outline | null;
}) {
  const generate = useMutation(api.admin.generateOutline);
  const setDay = useMutation(api.admin.setDayMeta);

  const [weeks, setWeeks] = useState(4);
  const [days, setDays] = useState(4);
  const [outline, setOutline] = useState<Outline | null>(initialOutline);

  if (!outline) {
    return (
      <div>
        <p>No outline yet. Generate below.</p>
        <GenerateForm
          planId={planId}
          weeks={weeks}
          days={days}
          setWeeks={setWeeks}
          setDays={setDays}
          generate={generate}
          setOutline={setOutline}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <GenerateForm
        planId={planId}
        weeks={weeks}
        days={days}
        setWeeks={setWeeks}
        setDays={setDays}
        generate={generate}
        setOutline={setOutline}
      />

      {/* Grid */}
      <div className="space-y-4">
        {outline.weeks.map((w, wi) => (
          <div key={wi} className="border rounded p-3">
            <h3 className="font-semibold mb-2">{w.label}</h3>
            <div className="grid grid-cols-2 gap-2">
              {w.days.map((d, di) => (
                <DayCell
                  key={di}
                  planId={planId}
                  weekIndex={wi + 1}
                  dayIndex={di + 1}
                  data={d}
                  setDay={setDay}
                  outline={outline}
                  setOutline={setOutline}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenerateForm({
  planId,
  weeks,
  days,
  setWeeks,
  setDays,
  generate,
  setOutline,
}: GenerateFormProps) {
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await generate({ planId: planId as Id<"plans">, weeks, daysPerWeek: days });
    // reload from scratch after generate
    setOutline({
      weeks: Array.from({ length: weeks }, (_, wi) => ({
        label: `Week ${wi + 1}`,
        days: Array.from({ length: days }, (_, di) => ({
          title: `Day ${di + 1}`,
          meta: `${30} mins`,
        })),
      })),
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-3 items-center">
      <input
        type="number"
        value={weeks}
        onChange={(e) => setWeeks(Number(e.target.value))}
        className="w-20 border rounded px-2 py-1"
      />
      <span>weeks</span>
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-20 border rounded px-2 py-1"
      />
      <span>days/week</span>
      <button className="rounded bg-black text-white px-4 py-1">
        Generate
      </button>
    </form>
  );
}

function DayCell({
  planId,
  weekIndex,
  dayIndex,
  data,
  setDay,
  outline,
  setOutline,
}: DayCellProps) {
  const [title, setTitle] = useState(data.title);
  const [meta, setMeta] = useState(data.meta);

  async function save() {
    await setDay({
      planId: planId as Id<"plans">,
      weekIndex,
      dayIndex,
      title,
      meta,
    });
    const newOutline = { ...outline };
    newOutline.weeks[weekIndex - 1].days[dayIndex - 1] = { title, meta };
    setOutline(newOutline);
  }

  return (
    <div className="border rounded p-2 space-y-1">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={save}
        className="w-full border rounded px-2 py-1 text-sm"
      />
      <input
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
        onBlur={save}
        className="w-full border rounded px-2 py-1 text-xs text-neutral-600"
      />
    </div>
  );
}
