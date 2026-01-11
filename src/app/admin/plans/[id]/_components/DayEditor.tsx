"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { Id } from "@/../convex/_generated/dataModel";
import type { PlanDay, PlanDayBlock } from "@/types/plans";

export default function DayEditor({ planId }: { planId: Id<"plans"> }) {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);
  const [pendingWeek, setPendingWeek] = useState(1);
  const [pendingDay, setPendingDay] = useState(1);

  const dayData = useQuery(api.admin.getDay, { planId: planId as Id<"plans">, weekIndex: week, dayIndex: day }) as PlanDay | null;
  const plan = useQuery(api.plans.getPlanById, { planId: planId as Id<"plans"> });
  const saveDay = useMutation(api.admin.upsertDay);
  const duplicateDay = useMutation(api.admin.duplicateDay);
  const applyDayToAllWeeks = useMutation(api.admin.applyDayToAllWeeks);

  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");
  const [blocks, setBlocks] = useState<PlanDayBlock[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!dayData) {
      setTitle("");
      setFocus("");
      setBlocks([]);
      return;
    }
    setTitle(dayData.title ?? "");
    setFocus(dayData.focus ?? "");
    setBlocks(
      dayData.blocks.map((block) => ({
        ...block,
        items: block.items.map((item) => ({
          ...item,
          sets: item.sets ?? 0,
          repsOrTime: item.repsOrTime ?? "",
          rest: item.rest ?? "",
          tempo: item.tempo ?? "",
          notes: item.notes ?? "",
        })),
      }))
    );
  }, [dayData, week, day]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await saveDay({ planId: planId as Id<"plans">, weekIndex: week, dayIndex: day, title, focus, blocks });
      alert("Saved ✅");
    } catch (error) {
      alert("Error saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDuplicateNextWeek() {
    if (!confirm(`Duplicate Week ${week} Day ${day} → Week ${week + 1} Day ${day}?`)) return;
    await duplicateDay({ planId: planId as Id<"plans">, srcWeek: week, srcDay: day, destWeek: week + 1, destDay: day });
    alert("Duplicated to next week ✅");
  }

  async function handleApplyAllWeeks() {
    if (!confirm(`Apply Week ${week} Day ${day} to all weeks? This will overwrite existing days.`)) return;
    await applyDayToAllWeeks({ planId: planId as Id<"plans">, srcWeek: week, dayIndex: day });
    alert("Applied to all weeks ✅");
  }

  const previewHref =
    plan && "slug" in plan && plan?.category === "students"
      ? `/programs/students/plans/${plan.slug}/week/${week}/day/${day}`
      : null;

  function addBlock(type: string) {
    setBlocks([...blocks, { type, items: [] }]);
  }

  const blockTypeColors: Record<string, string> = {
    warmup: "bg-orange-50 border-orange-200",
    main: "bg-blue-50 border-blue-200",
    finisher: "bg-purple-50 border-purple-200",
    pranayama: "bg-green-50 border-green-200",
    cooldown: "bg-cyan-50 border-cyan-200",
  };

  const blockTypeBadgeColors: Record<string, string> = {
    warmup: "bg-orange-100 text-orange-700",
    main: "bg-blue-100 text-blue-700",
    finisher: "bg-purple-100 text-purple-700",
    pranayama: "bg-green-100 text-green-700",
    cooldown: "bg-cyan-100 text-cyan-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Day Editor</h1>
              <p className="text-sm text-slate-500 mt-1">Create and manage workout days</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-slate-100 rounded-lg font-medium text-slate-700">
                Week {week}
              </span>
              <span className="text-slate-400">•</span>
              <span className="px-3 py-1.5 bg-slate-100 rounded-lg font-medium text-slate-700">
                Day {day}
              </span>
            </div>
          </div>

          {/* Week/Day Pickers */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label htmlFor="day-editor-week" className="block text-sm font-medium text-slate-700">
                Week Number
              </label>
              <input
                id="day-editor-week"
                type="number"
                value={pendingWeek}
                onChange={(e) => setPendingWeek(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min={1}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="day-editor-day" className="block text-sm font-medium text-slate-700">
                Day Number
              </label>
              <input
                id="day-editor-day"
                type="number"
                value={pendingDay}
                onChange={(e) => setPendingDay(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min={1}
              />
            </div>
            <div className="space-y-2 md:col-span-1 flex items-end">
              <button
                onClick={() => {
                  setWeek(pendingWeek);
                  setDay(pendingDay);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Load Day
              </button>
            </div>
          </div>
        </div>

        {/* Day Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Day Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="day-editor-title" className="block text-sm font-medium text-slate-700">
                Day Title
              </label>
              <input
                id="day-editor-title"
                placeholder="e.g., Push Day, Lower Body, Full Body"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="day-editor-focus" className="block text-sm font-medium text-slate-700">
                Primary Focus (Target Muscle / Goal)
              </label>
              <input
                id="day-editor-focus"
                placeholder="e.g., Chest, Shoulders, Triceps"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Workout Blocks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Workout Blocks</h2>
            <span className="text-sm text-slate-500">{blocks.length} block{blocks.length !== 1 ? 's' : ''}</span>
          </div>

          {blocks.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500 mb-2">No blocks added yet</p>
              <p className="text-sm text-slate-400">Add a block to get started</p>
            </div>
          )}

          <div className="space-y-4">
            {blocks.map((b, i) => (
              <div key={i} className={`border-2 rounded-xl p-5 transition-all ${blockTypeColors[b.type] || 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${blockTypeBadgeColors[b.type] || 'bg-slate-100 text-slate-700'}`}>
                      {b.type}
                    </span>
                    <span className="text-sm text-slate-500">{b.items.length} exercise{b.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <button
                    className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all font-medium"
                    onClick={() => setBlocks(blocks.filter((_, idx) => idx !== i))}
                  >
                    Remove Block
                  </button>
                </div>

                {/* Exercise Items */}
                <div className="space-y-3">
                  {b.items.map((it, j) => (
                    <div key={j} className="rounded-lg border border-slate-200 bg-white shadow-sm p-4 hover:shadow-md transition-all">
                      {/* Exercise Name */}
                      <div className="grid grid-cols-[120px,1fr,auto] gap-3 items-center mb-3">
                        <label
                          htmlFor={`exercise-name-${i}-${j}`}
                          className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                        >
                          Exercise Name
                        </label>
                        <input
                          id={`exercise-name-${i}-${j}`}
                          placeholder="Exercise name"
                          value={it.name}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].name = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <button
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all text-sm font-medium"
                          onClick={() => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items = newBlocks[i].items.filter((_, idx) => idx !== j);
                            setBlocks(newBlocks);
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Sets, Reps, Rest, Tempo in 2x2 Grid */}
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                          <label
                            htmlFor={`exercise-sets-${i}-${j}`}
                            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                          >
                            Sets (Count)
                          </label>
                          <input
                            id={`exercise-sets-${i}-${j}`}
                            placeholder="3"
                            value={Number.isNaN(it.sets) ? "" : it.sets}
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              const val = e.target.value;
                              const num = Number(val);
                              newBlocks[i].items[j].sets = Number.isNaN(num) ? 0 : num;
                              setBlocks(newBlocks);
                            }}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                          <label
                            htmlFor={`exercise-reps-${i}-${j}`}
                            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                          >
                            Reps or Time
                          </label>
                          <input
                            id={`exercise-reps-${i}-${j}`}
                            placeholder="8-12"
                            value={it.repsOrTime ?? ""}
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              newBlocks[i].items[j].repsOrTime = e.target.value;
                              setBlocks(newBlocks);
                            }}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                          <label
                            htmlFor={`exercise-rest-${i}-${j}`}
                            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                          >
                            Rest (Seconds)
                          </label>
                          <input
                            id={`exercise-rest-${i}-${j}`}
                            placeholder="45s"
                            value={it.rest ?? ""}
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              newBlocks[i].items[j].rest = e.target.value;
                              setBlocks(newBlocks);
                            }}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-[120px,1fr] gap-3 items-center">
                          <label
                            htmlFor={`exercise-tempo-${i}-${j}`}
                            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
                          >
                            Tempo (e.g., 2-1-2)
                          </label>
                          <input
                            id={`exercise-tempo-${i}-${j}`}
                            placeholder="2-1-2"
                            value={it.tempo ?? ""}
                            onChange={(e) => {
                              const newBlocks = [...blocks];
                              newBlocks[i].items[j].tempo = e.target.value;
                              setBlocks(newBlocks);
                            }}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="grid grid-cols-[120px,1fr] gap-3 items-start mt-3">
                        <label
                          htmlFor={`exercise-notes-${i}-${j}`}
                          className="text-xs font-semibold uppercase tracking-wide text-slate-600 pt-2"
                        >
                          Notes / Coaching Cues
                        </label>
                        <input
                          id={`exercise-notes-${i}-${j}`}
                          placeholder="Form cues, effort level, tips"
                          value={it.notes ?? ""}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].notes = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all font-medium w-full border-2 border-dashed border-blue-200 hover:border-blue-300"
                    onClick={() => {
                      const newBlocks = [...blocks];
                      newBlocks[i].items.push({ name: "", sets: 0, repsOrTime: "", rest: "", tempo: "", notes: "" });
                      setBlocks(newBlocks);
                    }}
                  >
                    + Add Exercise
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Block Buttons */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-3">Add Block Type</p>
            <div className="flex flex-wrap gap-2">
              {["warmup", "main", "finisher", "pranayama", "cooldown"].map((t) => (
                <button
                  key={t}
                  onClick={() => addBlock(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${
                    blockTypeBadgeColors[t] || 'bg-slate-100 text-slate-700'
                  } hover:scale-105`}
                >
                  + {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDuplicateNextWeek}
              className="flex-1 md:flex-none border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Duplicate to Next Week
            </button>
            <button
              onClick={handleApplyAllWeeks}
              className="flex-1 md:flex-none border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Apply to All Weeks
            </button>
            {previewHref ? (
              <Link
                href={previewHref}
                className="flex-1 md:flex-none border-2 border-blue-300 hover:border-blue-400 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-center transition-all"
              >
                Preview Day
              </Link>
            ) : (
              <span className="flex-1 md:flex-none border-2 border-slate-200 text-slate-400 px-6 py-3 rounded-lg font-semibold text-center">
                Preview Day
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
