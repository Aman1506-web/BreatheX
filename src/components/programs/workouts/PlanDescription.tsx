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
    <section className="rounded-xl sm:rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <h2 className="text-base sm:text-lg font-bold text-neutral-900">About this plan</h2>
      </div>
      
      {description && (
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {description}
        </p>
      )}

      {bullets.length > 0 && (
        <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 items-start group">
              <span className="flex-shrink-0 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-blue-600 font-bold text-xs group-hover:scale-110 transition-transform">
                ✓
              </span>
              <span className="text-sm sm:text-base text-neutral-800 leading-relaxed flex-1">
                {b}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}