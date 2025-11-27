"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export type WorkoutDay = {
  title: string; // "Day 1 • Push 1 (Chest/Shoulders/Triceps)"
  meta?: string; // "30 mins • Full Body"
  href?: string; // will open day detail later
  imageSrc?: string; // optional later
};

export type Week = { label: string; days: WorkoutDay[] };

type WeeksProps = { weeks: Week[]; baseHref?: string };

export default function Weeks({ weeks, baseHref }: WeeksProps) {
  return (
    <section className="space-y-8">
      {weeks.map((week, wi) => (
        <div key={wi} className="space-y-4">
          <h3 className="text-xl font-semibold">{week.label}</h3>

          <div className="grid gap-3">
            {week.days.map((d, di) => {
              const href =
                d.href ?? `${baseHref ?? ""}?week=${wi + 1}&day=${di + 1}`;
              return (
                <Link
                  key={di}
                  href={href}
                  className="group rounded-2xl border bg-white p-3 sm:p-4 flex items-center gap-3 hover:shadow-sm transition"
                >
                  {/* small image placeholder */}
                  <div className="h-14 w-14 rounded-lg bg-neutral-200 overflow-hidden relative">
                    {d.imageSrc ? (
                      <Image
                        src={d.imageSrc}
                        alt={d.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{d.title}</p>
                    {d.meta && (
                      <p className="text-sm text-neutral-500">{d.meta}</p>
                    )}
                  </div>

                  <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
