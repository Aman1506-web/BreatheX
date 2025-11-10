"use client";

import Link from "next/link";

type CTASectionProps = {
  title: string;
  subtext?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTASection({
  title,
  subtext,
  primary,
  secondary,
}: CTASectionProps) {
  return (
    <section className="relative bg-black text-white py-16 px-6 text-center">
      <div className="mx-auto max-w-2xl space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{title}</h2>
        {subtext && <p className="text-white/80">{subtext}</p>}

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href={primary.href}
            className="rounded-full bg-white text-black px-6 py-3 font-semibold text-sm hover:bg-white/90 transition"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-sm hover:bg-white/20 transition"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
