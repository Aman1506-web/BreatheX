// src/components/programs/InfoAlert.tsx
"use client";

import * as React from "react";
import { ShieldAlert, Info as InfoIcon } from "lucide-react";

type Tone = "danger" | "info";

type InfoAlertProps = {
  /** Heading on the alert */
  title: string;
  /** Paragraphs to render (each becomes its own <p>) */
  paragraphs?: string[];
  /** Visual style: "danger" (red) or "info" (neutral/blue-ish) */
  tone?: Tone;
  /** Optional custom icon (defaults based on tone) */
  icon?: React.ReactNode;
  /** Optional extra node at the end (buttons/links etc.) */
  trailing?: React.ReactNode;
  className?: string;
};

export default function InfoAlert({
  title,
  paragraphs = [],
  tone = "info",
  icon,
  trailing,
  className = "",
}: InfoAlertProps) {
  const t = tone === "danger" ? dangerStyles : infoStyles;
  const DefaultIcon = tone === "danger" ? ShieldAlert : InfoIcon;

  return (
    <div className={`${t.container} ${className}`}>
      <div className="shrink-0">
        {icon ?? <DefaultIcon className={`h-6 w-6 ${t.icon}`} aria-hidden="true" />}
      </div>

      <div className="space-y-1">
        <h3 className={`${t.title} font-semibold`}>{title}</h3>

        {paragraphs.map((p, i) => (
          <p key={i} className={`text-sm leading-relaxed ${t.text}`}>
            {p}
          </p>
        ))}
      </div>

      {trailing ? <div className="ml-auto">{trailing}</div> : null}
    </div>
  );
}

/* ---------- tone styles ---------- */
const dangerStyles = {
  container:
    "rounded-2xl border border-red-300 bg-red-50 p-5 sm:p-6 flex gap-3 items-start",
  icon: "text-red-600",
  title: "text-red-800",
  text: "text-red-700/90",
};

const infoStyles = {
  container:
    "rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 flex gap-3 items-start",
  icon: "text-neutral-600",
  title: "text-neutral-900",
  text: "text-neutral-700",
};
