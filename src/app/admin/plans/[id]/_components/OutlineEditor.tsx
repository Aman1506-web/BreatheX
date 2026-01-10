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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No Outline Yet</h2>
              <p className="text-slate-600">Create a program outline by specifying the number of weeks and days</p>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Program Outline</h1>
              <p className="text-sm text-slate-500 mt-1">Configure your program structure</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-medium">
                {outline.weeks.length} Weeks
              </span>
              <span className="text-slate-400">•</span>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium">
                {outline.weeks[0]?.days.length || 0} Days/Week
              </span>
            </div>
          </div>

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
        </div>

        {/* Grid */}
        <div className="space-y-5">
          {outline.weeks.map((w, wi) => (
            <div key={wi} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                  {wi + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{w.label}</h3>
                <span className="ml-auto text-sm text-slate-500">{w.days.length} days</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    } catch (error) {
      alert("Error generating outline. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-slate-700">Number of Weeks</label>
          <div className="relative">
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              min={1}
              max={52}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">weeks</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-slate-700">Days Per Week</label>
          <div className="relative">
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min={1}
              max={7}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">days</span>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Generate Outline
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

  return (
    <div className="border-2 border-slate-200 rounded-lg p-4 space-y-3 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-slate-50 relative group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Day {dayIndex}</span>
        {isSaving && (
          <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-600">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={save}
            placeholder="e.g., Push Day"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-600">Duration</label>
          <input
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            onBlur={save}
            placeholder="e.g., 45 mins"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Visual indicator on hover */}
      <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
    </div>
  );
}