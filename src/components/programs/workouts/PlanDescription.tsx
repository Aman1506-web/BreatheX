"use client";

type PlanDescriptionProps = {
  bullets?: string[];   // quick points
  description?: string; // longer paragraph
};

export default function PlanDescription({
  bullets = [],
  description,
}: PlanDescriptionProps) {
  return (
    <section className="rounded-2xl border bg-white p-5 sm:p-6">
      <h2 className="text-lg font-semibold">About this plan</h2>
      {description && (
        <p className="mt-2 text-neutral-700 leading-relaxed">{description}</p>
      )}

      {bullets.length > 0 && (
        <ul className="mt-4 grid gap-1 text-sm text-neutral-800">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="select-none">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
