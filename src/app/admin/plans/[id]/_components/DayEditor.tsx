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

  const blockColors: Record<string, { bg: string; badge: string; border: string }> = {
    warmup: { bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700 border-amber-200", border: "border-l-amber-500" },
    main: { bg: "bg-sky-50", badge: "bg-sky-100 text-sky-700 border-sky-200", border: "border-l-sky-500" },
    finisher: { bg: "bg-rose-50", badge: "bg-rose-100 text-rose-700 border-rose-200", border: "border-l-rose-500" },
    pranayama: { bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", border: "border-l-emerald-500" },
    cooldown: { bg: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-700 border-cyan-200", border: "border-l-cyan-500" },
  };

  return (
    <div className="space-y-5">
      {/* Day Selector */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Select Day to Edit</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <div className="flex gap-3 flex-1">
            <div className="flex-1">
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Week</label>
              <input
                type="number"
                value={pendingWeek}
                onChange={(e) => setPendingWeek(Number(e.target.value))}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                min={1}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Day</label>
              <input
                type="number"
                value={pendingDay}
                onChange={(e) => setPendingDay(Number(e.target.value))}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                min={1}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setWeek(pendingWeek);
              setDay(pendingDay);
            }}
            className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all sm:whitespace-nowrap"
          >
            Load Day
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
          <span className="text-xs text-neutral-500">Editing:</span>
          <span className="px-2.5 py-1 bg-neutral-900 text-white rounded-lg text-xs font-semibold">Week {week}</span>
          <span className="px-2.5 py-1 bg-neutral-900 text-white rounded-lg text-xs font-semibold">Day {day}</span>
        </div>
      </div>

      {/* Day Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Day Title</label>
          <input
            placeholder="e.g., Push Day, Upper Body"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <label className="block text-sm font-semibold text-neutral-900 mb-2">Primary Focus</label>
          <input
            placeholder="e.g., Chest, Shoulders, Triceps"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>
      </div>

      {/* Blocks */}
      <div className="space-y-4">
        {blocks.length === 0 && (
          <div className="bg-white rounded-xl border-2 border-dashed border-neutral-200 p-12 text-center">
            <p className="text-sm font-medium text-neutral-600 mb-1">No workout blocks added yet</p>
            <p className="text-xs text-neutral-500">Add a block type below to get started</p>
          </div>
        )}

        {blocks.map((b, i) => {
          const colors = blockColors[b.type] || { bg: "bg-neutral-50", badge: "bg-neutral-100 text-neutral-700 border-neutral-200", border: "border-l-neutral-400" };
          return (
            <div key={i} className={`${colors.bg} rounded-xl border border-neutral-200 ${colors.border} border-l-4 p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${colors.badge}`}>
                    {b.type}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">{b.items.length} exercise{b.items.length !== 1 ? 's' : ''}</span>
                </div>
                <button
                  className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all font-medium"
                  onClick={() => setBlocks(blocks.filter((_, idx) => idx !== i))}
                >
                  Remove Block
                </button>
              </div>

              <div className="space-y-3">
                {b.items.map((it, j) => (
                  <div key={j} className="border border-neutral-200 rounded-xl p-4 bg-white hover:shadow-sm transition-all">
                    {/* Exercise Name Row */}
                    <div className="grid grid-cols-[1fr,auto] gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Exercise Name</label>
                        <input
                          placeholder="e.g., Bench Press, Squats"
                          value={it.name}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].name = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                      </div>
                      <button
                        className="mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                        onClick={() => {
                          const newBlocks = [...blocks];
                          newBlocks[i].items = newBlocks[i].items.filter((_, idx) => idx !== j);
                          setBlocks(newBlocks);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Parameters Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Sets</label>
                        <input
                          placeholder="3"
                          value={Number.isNaN(it.sets) ? "" : it.sets}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            const num = Number(e.target.value);
                            newBlocks[i].items[j].sets = Number.isNaN(num) ? 0 : num;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Reps/Time</label>
                        <input
                          placeholder="8-12"
                          value={it.repsOrTime ?? ""}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].repsOrTime = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Rest</label>
                        <input
                          placeholder="45s"
                          value={it.rest ?? ""}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].rest = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Tempo</label>
                        <input
                          placeholder="2-1-2"
                          value={it.tempo ?? ""}
                          onChange={(e) => {
                            const newBlocks = [...blocks];
                            newBlocks[i].items[j].tempo = e.target.value;
                            setBlocks(newBlocks);
                          }}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Notes & Form Cues</label>
                      <input
                        placeholder="e.g., Keep chest up, control the descent"
                        value={it.notes ?? ""}
                        onChange={(e) => {
                          const newBlocks = [...blocks];
                          newBlocks[i].items[j].notes = e.target.value;
                          setBlocks(newBlocks);
                        }}
                        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                      />
                    </div>
                  </div>
                ))}
                
                <button
                  className="w-full text-sm text-neutral-700 hover:text-neutral-900 hover:bg-white px-4 py-3 rounded-lg border-2 border-dashed border-neutral-300 hover:border-neutral-400 transition-all font-medium bg-white/50"
                  onClick={() => {
                    const newBlocks = [...blocks];
                    newBlocks[i].items.push({ name: "", sets: 0, repsOrTime: "", rest: "", tempo: "", notes: "" });
                    setBlocks(newBlocks);
                  }}
                >
                  + Add Exercise to {b.type.charAt(0).toUpperCase() + b.type.slice(1)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Block Buttons */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Add Workout Block</h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
          {["warmup", "main", "finisher", "pranayama", "cooldown"].map((t) => {
            const colors = blockColors[t];
            return (
              <button
                key={t}
                onClick={() => addBlock(t)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all hover:scale-105 hover:shadow-lg ${colors.badge}`}
              >
                + {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-black hover:bg-neutral-800 text-white px-6 py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isSaving ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            onClick={handleDuplicateNextWeek}
            className="border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 hover:bg-neutral-50 px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-sm hover:shadow-md"
          >
            Duplicate to Next Week
          </button>
          <button
            onClick={handleApplyAllWeeks}
            className="border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 hover:bg-neutral-50 px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-sm hover:shadow-md"
          >
            Apply to All Weeks
          </button>
          {previewHref ? (
            <Link
              href={previewHref}
              className="border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 hover:bg-neutral-50 px-6 py-4 rounded-2xl text-base font-bold text-center transition-all shadow-sm hover:shadow-md"
            >
              Preview Day
            </Link>
          ) : (
            <span className="border-2 border-neutral-200 text-neutral-400 px-6 py-4 rounded-2xl text-base font-bold text-center cursor-not-allowed">
              Preview Day
            </span>
          )}
        </div>
      </div>
    </div>
  );
}