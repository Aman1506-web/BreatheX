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
      <div className="flex items-center justify-center py-16">
        <div className="bg-white rounded-xl border border-neutral-200 p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-1">No Program Structure</h2>
            <p className="text-sm text-neutral-600">Create your program outline to get started</p>
          </div>
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
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100">
              {outline.weeks.length} Weeks
            </span>
            <span className="text-neutral-300">•</span>
            <span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-semibold border border-sky-100">
              {outline.weeks[0]?.days.length || 0} Days/Week
            </span>
          </div>
        </div>

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

      {/* Week Cards */}
      <div className="space-y-4">
        {outline.weeks.map((w, wi) => {
          const weekColors = [
            'from-emerald-500 to-teal-600',
            'from-sky-500 to-cyan-600',
            'from-amber-500 to-orange-600',
            'from-rose-500 to-pink-600',
            'from-violet-500 to-purple-600',
            'from-indigo-500 to-blue-600',
          ];
          const colorClass = weekColors[wi % weekColors.length];
          
          return (
            <div key={wi} className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                  {wi + 1}
                </div>
                <h3 className="text-base font-semibold text-neutral-900">{w.label}</h3>
                <span className="ml-auto text-xs text-neutral-500 font-medium bg-neutral-50 px-2 py-1 rounded-md">{w.days.length} days</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
          );
        })}
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
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      await generate({ planId: planId as Id<"plans">, weeks, daysPerWeek: days });
      setOutline({
        weeks: Array.from({ length: weeks }, (_, wi) => ({
          label: `Week ${wi + 1}`,
          days: Array.from({ length: days }, (_, di) => ({
            title: `Day ${di + 1}`,
            meta: `${30} mins`,
          })),
        })),
      });
    } catch {
      alert("Error generating outline. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
      <div className="grid sm:grid-cols-[1fr,1fr,auto] gap-3 items-end">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-neutral-700">Weeks</label>
          <input
            type="number"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            min={1}
            max={52}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-neutral-700">Days/Week</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            min={1}
            max={7}
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm whitespace-nowrap"
        >
          {isGenerating ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="hidden sm:inline">Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Generate</span>
              <span className="sm:hidden">Go</span>
            </>
          )}
        </button>
      </div>
    </div>
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
  const [isSaving, setIsSaving] = useState(false);

  async function save() {
    setIsSaving(true);
    try {
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
    } catch (error) {
      console.error("Error saving day:", error);
    } finally {
      setIsSaving(false);
    }
  }

  const dayColors = [
    'border-l-emerald-400 hover:border-emerald-300 hover:bg-emerald-50/30',
    'border-l-sky-400 hover:border-sky-300 hover:bg-sky-50/30',
    'border-l-amber-400 hover:border-amber-300 hover:bg-amber-50/30',
    'border-l-rose-400 hover:border-rose-300 hover:bg-rose-50/30',
    'border-l-violet-400 hover:border-violet-300 hover:bg-violet-50/30',
    'border-l-cyan-400 hover:border-cyan-300 hover:bg-cyan-50/30',
    'border-l-orange-400 hover:border-orange-300 hover:bg-orange-50/30',
  ];
  const colorClass = dayColors[(dayIndex - 1) % dayColors.length];

  return (
    <div className={`border border-neutral-200 border-l-4 ${colorClass} rounded-lg p-3 space-y-2.5 hover:shadow-md transition-all bg-white group`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500">Day {dayIndex}</span>
        {isSaving && (
          <div className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-emerald-600"></div>
        )}
      </div>
      
      <div className="space-y-2.5">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-neutral-600">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={save}
            placeholder="Push Day"
            className="w-full border border-neutral-300 rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-neutral-400"
          />
        </div>
        
        <div className="space-y-1">
          <label className="block text-xs font-medium text-neutral-600">Duration</label>
          <input
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            onBlur={save}
            placeholder="45 mins"
            className="w-full border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-neutral-400"
          />
        </div>
      </div>
    </div>
  );
}