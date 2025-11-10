// src/components/programs/PillarsInfoGrid.tsx
"use client";

import * as React from "react";
import clsx from "clsx";

type PillarItem = {
  icon: React.ReactNode;      // e.g. <Dumbbell className="h-5 w-5" />
  title: string;
  text: string;               // short supporting copy
};

type PillarsInfoGridProps = {
  heading?: string;
  description?: string;
  items: PillarItem[];
  /** Columns on lg+ screens (defaults to 3). sm = 2 automatically. */
  columnsLg?: 2 | 3 | 4;
  /** Compact density (smaller paddings). */
  dense?: boolean;
  /** Extra class for wrapper. */
  className?: string;
};

export default function PillarsInfoGrid({
  heading = "Why these pillars matter",
  description,
  items,
  columnsLg = 3,
  dense = false,
  className,
}: PillarsInfoGridProps) {
  const cellPad = dense ? "p-3" : "p-4";
  const titleSize = dense ? "text-[15px]" : "text-base";

  return (
    <section className={clsx("w-full rounded-2xl border bg-white", dense ? "p-4" : "p-5 sm:p-6", className)}>
      {/* header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{heading}</h3>
        {description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}
      </div>

      {/* grid */}
      <div
        className={clsx(
          "grid gap-3 sm:grid-cols-2",
          columnsLg === 2 && "lg:grid-cols-2",
          columnsLg === 3 && "lg:grid-cols-3",
          columnsLg === 4 && "lg:grid-cols-4"
        )}
      >
        {items.map((it, idx) => (
          <article
            key={`${it.title}-${idx}`}
            className={clsx(
              "flex gap-3 rounded-xl border transition",
              cellPad,
              "hover:bg-neutral-50"
            )}
          >
            <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-neutral-100 text-neutral-700">
              {it.icon}
            </div>
            <div className="min-w-0">
              <h4 className={clsx("font-medium", titleSize)}>{it.title}</h4>
              <p className="text-sm text-neutral-600">{it.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
