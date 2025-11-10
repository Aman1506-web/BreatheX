"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";

export default function DayEditor({ planId }: { planId: string }) {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);

  const dayData = useQuery(api.admin.getDay, { planId: planId as any, weekIndex: week, dayIndex: day });
  const saveDay = useMutation(api.admin.upsertDay);
  const duplicateDay = useMutation(api.admin.duplicateDay);
  const applyDayToAllWeeks = useMutation(api.admin.applyDayToAllWeeks);

  const [title, setTitle] = useState("");
  const [focus, setFocus] = useState("");
  const [blocks, setBlocks] = useState<any[]>([]);

  // Sync fetched data → local state
  if (dayData && blocks.length === 0 && dayData.blocks) {
    setTitle(dayData.title);
    setFocus(dayData.focus);
    setBlocks(dayData.blocks);
  }

  async function handleSave() {
    await saveDay({ planId: planId as any, weekIndex: week, dayIndex: day, title, focus, blocks });
    alert("Saved ✅");
  }

  function addBlock(type: string) {
    setBlocks([...blocks, { type, items: [] }]);
  }

  return (
    <div className="space-y-6">
      {/* Pickers */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Week</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Day</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <input
          placeholder="Day Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          placeholder="Focus"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Blocks */}
      <div className="space-y-4">
        {blocks.map((b, i) => (
          <div key={i} className="border rounded p-3">
            <h4 className="font-semibold mb-2">{b.type}</h4>
            <button
              className="text-xs text-red-500 mb-2"
              onClick={() => setBlocks(blocks.filter((_, idx) => idx !== i))}
            >
              Remove block
            </button>

            <div className="space-y-2">
              {b.items.map((it: any, j: number) => (
                <div key={j} className="flex gap-2 text-sm">
                  <input
                    placeholder="Exercise"
                    value={it.name}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[i].items[j].name = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <input
                    placeholder="Sets"
                    value={it.sets}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[i].items[j].sets = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <input
                    placeholder="Reps/Time"
                    value={it.reps}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[i].items[j].reps = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    className="w-24 border rounded px-2 py-1"
                  />
                </div>
              ))}
              <button
                className="text-xs text-blue-500"
                onClick={() => {
                  const newBlocks = [...blocks];
                  newBlocks[i].items.push({ name: "", sets: "", reps: "" });
                  setBlocks(newBlocks);
                }}
              >
                + Add item
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          {["warmup", "main", "finisher", "pranayama", "cooldown"].map((t) => (
            <button
              key={t}
              onClick={() => addBlock(t)}
              className="rounded bg-gray-200 px-3 py-1 text-sm"
            >
              + {t}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={handleSave} className="rounded bg-black text-white px-4 py-2">
          Save
        </button>
        <button
          onClick={() => duplicateDay({ planId: planId as any, srcWeek: week, srcDay: day, destWeek: week + 1, destDay: day })}
          className="rounded border px-4 py-2"
        >
          Duplicate to Next Week
        </button>
        <button
          onClick={() => applyDayToAllWeeks({ planId: planId as any, srcWeek: week, dayIndex: day })}
          className="rounded border px-4 py-2"
        >
          Apply to All Weeks
        </button>
        <Link
          href={`/programs/students/plans/sample-plan/week/${week}/day/${day}`}
          className="rounded border px-4 py-2 text-blue-600"
        >
          Preview
        </Link>
      </div>
    </div>
  );
}




/// copy the latest DayEditor.tsx code from convex students setup part 2 ChatGPt and compare the fields in both the codes bcoz somethings are missing