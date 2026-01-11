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
    <section className="space-y-6 sm:space-y-8">
      {weeks.map((week, wi) => (
        <div key={wi} className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">{week.label}</h3>
          </div>

          <div className="grid gap-2 sm:gap-3">
            {week.days.map((d, di) => {
              const href =
                d.href ?? `${baseHref ?? ""}?week=${wi + 1}&day=${di + 1}`;
              return (
                <Link
                  key={di}
                  href={href}
                  className="group rounded-xl sm:rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4 
                             flex items-center gap-3 
                             hover:shadow-lg hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30
                             active:scale-[0.99] transition-all duration-200"
                >
                  {/* small image placeholder */}
                  <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden relative ring-1 ring-neutral-300/50">
                    {d.imageSrc ? (
                      <Image
                        src={d.imageSrc}
                        alt={d.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-neutral-400">
                          {di + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base line-clamp-2 sm:line-clamp-1 
                                  text-neutral-900 group-hover:text-blue-700 transition-colors">
                      {d.title}
                    </p>
                    {d.meta && (
                      <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1 font-medium">
                        {d.meta}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                    <ChevronRight className="h-4 w-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}