"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function CompleteToggle() {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => setDone((v) => !v)}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition
        ${done ? "bg-green-600 text-white" : "bg-black text-white hover:opacity-90"}
      `}
      aria-pressed={done}
    >
      <CheckCircle2 className="h-5 w-5" />
      {done ? "Marked Complete" : "Mark Complete"}
    </button>
  );
}
