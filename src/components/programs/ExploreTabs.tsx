// src/components/programs/ExploreTabs.tsx
"use client";

import * as React from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

/* ---------- Types ---------- */
export type ExploreCard = {
  title: string;
  meta?: string;
  href?: string; // optional link if you want cards to be clickable later
};

export type ExploreSection = {
  title: string;
  cards: ExploreCard[]; // usually 2 cards per your spec
};

export type ExploreTab = {
  key: string;
  label: string;
  sections: ExploreSection[];
};

type ExploreTabsProps = {
  tabs: ExploreTab[];
  heading?: string;
  subheading?: string;
  /** default active tab key (falls back to the first tab) */
  initialKey?: string;
  /** compact paddings */
  dense?: boolean;
  className?: string;
  /** optional callback */
  onTabChange?: (key: string) => void;
};

/* ---------- Component ---------- */
export default function ExploreTabs({
  tabs,
  heading = "Plans that boost your study game",
  subheading,
  initialKey,
  dense = false,
  className,
  onTabChange,
}: ExploreTabsProps) {
  const initial = React.useMemo(
    () => initialKey ?? tabs[0]?.key,
    [initialKey, tabs]
  );
  const [active, setActive] = React.useState(initial);

  React.useEffect(() => {
    setActive(initial);
  }, [initial]);

  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  function switchTab(key: string) {
    setActive(key);
    onTabChange?.(key);
  }

  return (
    <section className={clsx("w-full", className)}>
      {/* Header */}
      <header className={clsx("space-y-3", dense ? "mb-4" : "mb-6")}>
        <p className="text-xs tracking-widest text-neutral-500">EXPLORE</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="text-neutral-600 max-w-2xl">{subheading}</p>
        )}

        {/* Tabs */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <TabChip
              key={t.key}
              active={t.key === active}
              onClick={() => switchTab(t.key)}
            >
              {t.label}
            </TabChip>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="space-y-8">
        {current.sections.map((sec, i) => (
          <ExploreGroup key={`${sec.title}-${i}`} title={sec.title}>
            <div className="grid gap-4 sm:grid-cols-2">
              {sec.cards.map((c, j) => (
                <ExploreCardItem key={`${c.title}-${j}`} card={c} />
              ))}
            </div>
          </ExploreGroup>
        ))}
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function TabChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center rounded-full px-4 py-2 text-sm transition border focus:outline-none focus:ring-2 focus:ring-black/15",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function ExploreGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function ExploreCardItem({ card }: { card: ExploreCard }) {
  const content = (
    <article className="rounded-2xl border overflow-hidden bg-white hover:shadow-sm transition">
      {/* Gray placeholder image */}
      <div className="h-48 bg-neutral-200" />

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-medium">{card.title}</h4>
          {card.meta && (
            <p className="text-sm text-neutral-500">{card.meta}</p>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-neutral-400 shrink-0" />
      </div>
    </article>
  );

  return card.href ? (
    <a href={card.href} className="block">{content}</a>
  ) : (
    content
  );
}
