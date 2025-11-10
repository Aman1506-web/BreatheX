"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type CategoryCardProps = {
  emoji: string;
  title: string;
  tagline: string;
  href: string;
};

export default function CategoryCard({
  emoji,
  title,
  tagline,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition"
    >
      {/* Placeholder image */}
      <div className="h-40 sm:h-48 md:h-56 bg-neutral-200 grid place-items-center text-4xl">
        {emoji}
      </div>

      {/* Content */}
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-neutral-600">{tagline}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-600 mt-1" />
      </div>
    </Link>
  );
}
