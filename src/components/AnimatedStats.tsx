"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Timer, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedStats() {
  const usersRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // For GSAP context

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animateCount = (
        ref: React.RefObject<HTMLSpanElement | null>,
        end: number,
        suffix = ""
      ) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power1.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${Math.floor(obj.val)}${suffix}`;
            }
          },
        });
      };

      ScrollTrigger.create({
        trigger: "#genx-stats",
        start: "top 80%",
        once: true,
        onEnter: () => {
          animateCount(usersRef, 100, "+");
          animateCount(timeRef, 3, " min");
          animateCount(percentRef, 100, "%");
        },
      });

      ScrollTrigger.refresh(); // Ensure trigger is recalculated correctly
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      id="genx-stats"
      className="flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap mt-2"
    >
      <div className="flex items-center gap-1 text-lg font-semibold text-white">
        <Users className="w-5 h-5 text-purple-400" />
        <span ref={usersRef} className="text-white">
          0
        </span>{" "}
        active users
      </div>

      {/* Gradient Separator */}
      <span
        className="text-transparent bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-bold opacity-80"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        |
      </span>

      <div className="flex items-center gap-1 text-lg font-semibold text-white">
        <Timer className="w-5 h-5 text-pink-400" />
        <span ref={timeRef} className="text-white">
          0
        </span>{" "}
        generation
      </div>

      {/* Gradient Separator */}
      <span
        className="text-transparent bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-bold opacity-80"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        |
      </span>

      <div className="flex items-center gap-1 text-lg font-semibold text-white">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span ref={percentRef} className="text-white">
          0
        </span>{" "}
        personalized
      </div>
    </div>
  );
}
