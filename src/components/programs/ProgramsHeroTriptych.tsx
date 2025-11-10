// src/components/programs/ProgramsHeroTriptych.tsx
// src/components/programs/ProgramsHeroTriptych.tsx
"use client";

import * as React from "react";
import clsx from "clsx";

type Portrait = { src?: string; alt: string };

type Props = {
  title: string;
  subtext?: string;
  portraits: [Portrait, Portrait, Portrait]; // [professionals, students, housewives]
  chips?: string[];
  /** section height controls (vh) */
  minHeightVH?: { base?: number; md?: number; lg?: number };
  className?: string;
  /** show gray placeholders if images not ready */
  placeholder?: boolean;
  /** add soft radial glows behind portraits (disabled by default) */
  decorGlows?: boolean;
};

export default function ProgramsHeroTriptych({
  title,
  subtext,
  portraits,
  chips = [],
  minHeightVH = { base: 60, md: 68, lg: 72 },
  className,
  placeholder,
  decorGlows = false,
}: Props) {
  const styleVars = {
    ["--vh-base" as any]: `${minHeightVH.base ?? 60}vh`,
    ["--vh-md" as any]: `${minHeightVH.md ?? minHeightVH.base ?? 60}vh`,
    ["--vh-lg" as any]: `${minHeightVH.lg ?? minHeightVH.md ?? minHeightVH.base ?? 60}vh`,
  };

  return (
    <section
      className={clsx(
        // transparent surface — no background/border
        "relative w-full overflow-visible",
        "min-h-[60vh] md:min-h-[68vh] lg:min-h-[72vh]",
        className
      )}
      style={styleVars as React.CSSProperties}
    >
      {/* Optional soft glows (very subtle, disabled by default) */}
      {decorGlows && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/3 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,150,0.35),transparent_65%)] blur-2xl" />
            <div className="absolute left-2/3 top-28 h-60 w-60 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,200,255,0.35),transparent_65%)] blur-2xl" />
          </div>
        </>
      )}

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 pt-20 md:pt-24">
        {/* Heading */}
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
          {title}
        </h1>
        {subtext && (
          <p className="mt-3 text-center text-neutral-600 max-w-3xl mx-auto">
            {subtext}
          </p>
        )}

        {/* Chips */}
        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm ring-1 ring-black/5"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Triptych — no section box, just floating cards */}
        <div className="mt-8 md:mt-10">
          {/* desktop/tablet */}
          <div className="hidden sm:grid grid-cols-3 gap-6">
            {portraits.map((p, i) => (
              <PortraitCard key={i} src={placeholder ? undefined : p.src} alt={p.alt} />
            ))}
          </div>

          {/* mobile horizontal scroll */}
          <div className="sm:hidden overflow-x-auto no-scrollbar">
            <div className="flex gap-3 pr-4">
              {portraits.map((p, i) => (
                <PortraitCard key={i} src={placeholder ? undefined : p.src} alt={p.alt} mobile />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Height control via CSS vars */}
      <style jsx>{`
        section { min-height: var(--vh-base); }
        @media (min-width: 768px) { section { min-height: var(--vh-md); } }
        @media (min-width: 1024px) { section { min-height: var(--vh-lg); } }
      `}</style>
    </section>
  );
}

/* Single portrait */
function PortraitCard({
  src,
  alt,
  mobile,
}: {
  src?: string;
  alt: string;
  mobile?: boolean;
}) {
  const wrap = mobile
    ? "h-[58vh] w-[64vw] min-w-[64vw]"
    : "h-[64vh] w-full";

  return (
    <div
      className={clsx(
        "relative rounded-[28px] overflow-hidden",
        "ring-1 ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.15)]",
        wrap,
        "bg-neutral-200"
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-neutral-200" aria-label={alt} />
      )}
    </div>
  );
}
