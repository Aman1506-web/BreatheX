"use client";

import type { ExerciseItem } from "./types";

export default function ExerciseTable({ items }: { items: ExerciseItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 text-neutral-600">
          <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
            <th>Exercise</th>
            <th className="whitespace-nowrap">Sets</th>
            <th className="whitespace-nowrap">Reps/Time</th>
            <th>Rest</th>
            <th>Tempo</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((it, i) => (
            <tr key={i} className="[&>td]:px-3 [&>td]:py-2 align-top">
              <td className="font-medium">{it.name}</td>
              <td>{it.sets ?? "-"}</td>
              <td>{it.reps ?? it.time ?? "-"}</td>
              <td>{it.rest ?? "-"}</td>
              <td>{it.tempo ?? "-"}</td>
              <td className="text-neutral-600">{it.notes ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
