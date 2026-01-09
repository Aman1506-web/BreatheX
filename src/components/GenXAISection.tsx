"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedStats from "./AnimatedStats";

gsap.registerPlugin(ScrollTrigger);

export default function GenXAISection() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="flex justify-center items-center pt-0 pb-10 bg-white px-4 sm:px-0">
      {/* ✅ Unified Width and Rounded Border - MOBILE HEIGHT FIXED */}
      <div
        ref={boxRef}
        className="relative w-full max-w-[1200px] rounded-[20px] p-[2px] overflow-visible h-auto sm:h-[600px]"
        style={{
          background:
            "linear-gradient(90deg, #4F9DFF, #9D4EDD, #FF61C7, #FFA500)",
        }}
      >
        {/* Inner Black Box - MOBILE PADDING REDUCED */}
        <div className="relative bg-black rounded-[18px] h-full w-full p-4 sm:p-6 md:p-10 flex flex-col items-center text-center space-y-3 sm:space-y-6 overflow-hidden">
          {/* Inner Glow */}
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none z-0 w-full h-full"
            style={{
              boxShadow: `
                inset 4px 0 15px rgba(40, 100, 255, 0.9),
                inset -4px 0 15px rgba(255, 100, 0, 0.8),
                inset 0 4px 15px rgba(150, 50, 255, 0.85),
                inset 0 0px 15px rgba(255, 100, 0, 0.75)
              `,
            }}
          ></div>

          {/* Content - MOBILE SPACING OPTIMIZED */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-6">
            {/* HEADING - SMALLER ON MOBILE */}
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold relative z-10 glow-outline text-purple-400 drop-shadow-[0_0_8px_rgba(160,64,255,0.6)]"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              MEET GENX AI
            </h2>

            {/* Video - SMALLER ON MOBILE */}
            <div className="w-[160px] sm:w-[200px] md:w-[250px] h-[100px] sm:h-[120px] md:h-[150px] overflow-hidden rounded-lg shadow-lg mx-auto mt-2 sm:mt-8">
              <video
                src="/videos/assistant.mp4"
                muted
                playsInline
                className="w-full h-full object-cover"
                onMouseOver={(e) => {
                  const videoEl = e.currentTarget;
                  if (videoEl.paused) {
                    videoEl.play().catch(() => {
                      // ignore interrupted play calls
                    });
                  }
                }}
                onMouseOut={(e) => e.currentTarget.pause()}
                preload="none"
              ></video>
            </div>

            {/* Description - SMALLER TEXT & REDUCED SPACING */}
            <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl px-2 sm:px-0">
              Our{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                GenX AI
              </span>{" "}
              helps in building personalized workout plans, cardio routines, and
              breathing techniques tailored to your goals.
            </p>

            {/* Animated Stats */}
            <AnimatedStats />

            {/* CTA Button - SMALLER ON MOBILE */}
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full hover:scale-105 transition-transform hover:brightness-110 shadow-md hover:shadow-lg mt-2 sm:mt-4" >
              Generate Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}