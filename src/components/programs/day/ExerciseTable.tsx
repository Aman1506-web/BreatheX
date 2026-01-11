"use client";

import type { ExerciseItem } from "./types";

export default function ExerciseTable({ items }: { items: ExerciseItem[] }) {
  return (
    <div className="overflow-x-auto -mx-3 sm:mx-0">
      <div className="inline-block min-w-full align-middle px-3 sm:px-0">
        <div className="overflow-hidden rounded-lg sm:rounded-xl border border-neutral-200 shadow-md">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white">
              <tr className="[&>th]:px-2 sm:[&>th]:px-3 [&>th]:py-3 text-left">
                <th className="font-bold">Exercise</th>
                <th className="whitespace-nowrap font-bold">Sets</th>
                <th className="whitespace-nowrap font-bold">Reps/Time</th>
                <th className="font-bold hidden sm:table-cell">Rest</th>
                <th className="font-bold hidden md:table-cell">Tempo</th>
                <th className="font-bold hidden lg:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {items.map((it, i) => (
                <tr 
                  key={i} 
                  className={`[&>td]:px-2 sm:[&>td]:px-3 [&>td]:py-3 sm:[&>td]:py-3.5 align-top 
                             hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                             transition-all duration-200 cursor-pointer
                             ${i % 2 === 0 ? 'bg-neutral-50/50' : 'bg-white'}`}
                >
                  <td className="font-semibold text-neutral-900">
                    <div className="line-clamp-2 sm:line-clamp-1">{it.name}</div>
                    {/* Mobile: Show rest/tempo/notes as metadata below exercise name */}
                    <div className="mt-2 space-y-1 text-[11px] text-neutral-600 sm:hidden">
                      {(it.rest || it.tempo || it.notes) && (
                        <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                          {it.rest && (
                            <div className="flex gap-1.5 items-center">
                              <span className="font-bold text-orange-600 text-[10px] bg-orange-50 px-1.5 py-0.5 rounded">REST</span>
                              <span className="font-medium">{it.rest}</span>
                            </div>
                          )}
                          {it.tempo && (
                            <div className="flex gap-1.5 items-center md:hidden">
                              <span className="font-bold text-purple-600 text-[10px] bg-purple-50 px-1.5 py-0.5 rounded">TEMPO</span>
                              <span className="font-medium">{it.tempo}</span>
                            </div>
                          )}
                          {it.notes && (
                            <div className="flex gap-1.5 items-start lg:hidden">
                              <span className="font-bold text-blue-600 text-[10px] bg-blue-50 px-1.5 py-0.5 rounded flex-shrink-0">NOTES</span>
                              <span className="flex-1 font-medium">{it.notes}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-center sm:text-left">
                    <span className="inline-flex items-center justify-center font-bold text-indigo-700 bg-indigo-50 rounded-md px-2 py-0.5 min-w-[28px]">
                      {it.sets ?? "-"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="font-semibold text-neutral-800">
                      {it.repsOrTime ?? it.reps ?? it.time ?? "-"}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell">
                    <span className="inline-flex items-center font-medium text-orange-700 bg-orange-50 rounded px-2 py-0.5">
                      {it.rest ?? "-"}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="inline-flex items-center font-medium text-purple-700 bg-purple-50 rounded px-2 py-0.5">
                      {it.tempo ?? "-"}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell text-neutral-700 max-w-[200px]">
                    <div className="line-clamp-2 text-sm">{it.notes ?? "-"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}