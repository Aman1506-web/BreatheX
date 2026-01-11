"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function CompleteToggle() {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => setDone((v) => !v)}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 
                  rounded-full px-6 sm:px-8 py-3 sm:py-3.5 
                  text-sm sm:text-base font-bold 
                  transition-all duration-300 transform
                  active:scale-95
                  shadow-lg hover:shadow-xl
                  ${
                    done
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-200/50 hover:shadow-green-300/50"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-200/50 hover:shadow-blue-300/50"
                  }
                `}
      aria-pressed={done}
    >
      {done ? (
        <>
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span>Workout Complete! 🔥</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="h-5 w-5" />
          <span>Mark Complete</span>
        </>
      )}
    </button>
  );
}