"use client";

type Props = { weeksCount: number };

export default function WeeksTOC({ weeksCount }: Props) {
  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-4">
      <h4 className="text-sm font-semibold mb-2">Weeks</h4>
      <ul className="grid grid-cols-3 gap-2">
        {Array.from({ length: weeksCount }).map((_, i) => (
          <li key={i}>
            <a
              href={`#week-${i + 1}`}
              className="block rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-500">Tip: Use this to jump quickly.</p>
    </div>
  );
}
