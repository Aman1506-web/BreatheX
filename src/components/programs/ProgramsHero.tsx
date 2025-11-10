// src/components/programs/ProgramsHero.tsx

"use client";

import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProgramsHeroProps = {
  title: string;
  subtext?: string;
  chips?: string[];

  leftImageSrc?: string;
  rightImageSrc?: string;
  leftAlt?: string;
  rightAlt?: string;

  stackOnMobile?: boolean;
  divider?: "diagonal" | "vertical" | "none";
  overlayStrength?: 0 | 1 | 2;
  placeholder?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function ProgramsHero({
  title,
  subtext,
  chips = [],
  leftImageSrc,
  rightImageSrc,
  leftAlt = "Left hero image",
  rightAlt = "Right hero image",
  stackOnMobile = true,
  divider = "diagonal",
  overlayStrength = 1,
  placeholder = false,
  className,
  ...rest
}: ProgramsHeroProps) {
  // STATIC, TAILWIND-SAFE HEIGHTS (no runtime strings / css vars)
  const containerHeights = "h-[68vh] md:h-[76vh] lg:h-[82vh]"; // ← change here if you want

  const gridCols = stackOnMobile ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2";

  // brighter overlays
  const overlayLeft =
    overlayStrength === 0
      ? ""
      : overlayStrength === 1
      ? "from-black/15 via-black/10 to-black/15"
      : "from-black/28 via-black/20 to-black/32";
  const overlayRight =
    overlayStrength === 0
      ? ""
      : overlayStrength === 1
      ? "from-black/15 via-black/10 to-black/20"
      : "from-black/30 via-black/22 to-black/36";

  return (
    <section
      // hard fallback height in case Tailwind fails to load (extremely rare)
      style={{ minHeight: "60vh" }}
      className={cn(
        "relative block w-full overflow-hidden isolate", // isolate keeps overlays inside
        containerHeights,
        className
      )}
      aria-label="Programs hero"
      {...rest}
    >
      {/* SPLIT GRID */}
      <div className={cn("absolute inset-0 grid h-full w-full", gridCols)}>
        {/* LEFT */}
        <div className="relative h-full w-full">
          {placeholder ? (
            <div className="absolute inset-0 bg-neutral-800" />
          ) : (
            leftImageSrc && (
              <Image
                src={leftImageSrc}
                alt={leftAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            )
          )}
          {overlayStrength !== 0 && (
            <div className={cn("absolute inset-0 bg-gradient-to-b", overlayLeft)} />
          )}
        </div>

        {/* RIGHT */}
        <div className="relative h-full w-full">
          {placeholder ? (
            <div className="absolute inset-0 bg-neutral-700" />
          ) : (
            rightImageSrc && (
              <Image
                src={rightImageSrc}
                alt={rightAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            )
          )}
          {overlayStrength !== 0 && (
            <div className={cn("absolute inset-0 bg-gradient-to-b", overlayRight)} />
          )}
        </div>
      </div>

      {/* DIVIDER (desktop only) */}
      {divider !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 hidden md:block",
            divider === "vertical" ? "left-1/2 w-px -translate-x-1/2" : "left-1/2 w-[1px]"
          )}
        >
          {divider === "vertical" ? (
            <div className="absolute inset-0 bg-white/50 mix-blend-overlay" />
          ) : (
            <>
              <div className="absolute inset-y-0 -left-8 right-8 origin-center -skew-x-12 bg-white/40 mix-blend-overlay" />
              <div className="absolute inset-y-0 -left-12 right-12 origin-center -skew-x-12 bg-white/10" />
            </>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 md:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow">
            {title}
          </h1>
          {subtext && (
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-white/85">
              {subtext}
            </p>
          )}
          {!!chips?.length && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {chips.map((c, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* lighter global wash for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
    </section>
  );
}
