"use client";

import React from "react";

const videos = [
  {
    title: "Build Strength\nWith Precision",
    src: "/videos/strength1.mp4",
  },
  {
    title: "Endure. Breathe.\nPush Limits.",
    src: "/videos/cardio1.mp4",
  },
  {
    title: "Balance Mind & Body\nWith Breath",
    src: "/videos/yoga1.mp4",
  },
];

export default function OurPhilosophy() {
  return (
    <section className="bg-white text-black py-16 flex justify-center">
      {/* ✅ Unified Width Container */}
      <div className="w-full max-w-[1200px] px-4">
        {/* Heading */}
        <h2
          className="lg:text-6xl sm:text-5xl text-4xl text-center mb-8"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          <span className="text-transparent stroke-black stroke-[1.5px] mr-2 inline-block">
            OUR
          </span>
          <span className="text-black">PHILOSOPHY</span>
        </h2>

        <p className="text-center text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-10">
          We combine <span className="font-semibold text-black">strength</span>,{" "}
          <span className="font-semibold text-black">cardio</span>, and{" "}
          <span className="font-semibold text-black">yoga</span> to elevate your
          body & mind —{" "}
          <span className="font-bold text-black">
            building true holistic fitness.
          </span>
        </p>

        {/* 🔹 Mobile Scrollable Videos */}
        <div className="flex md:hidden gap-4 overflow-x-auto scrollbar-hide px-1">
          {videos.map((video, index) => (
            <div
              key={index}
              className="min-w-[80%] sm:min-w-[70%] h-[350px] sm:h-[380px] max-h-[80vh] rounded-2xl overflow-hidden relative group shadow-lg flex-shrink-0"
            >
              <video
                src={video.src}
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-contain bg-black transition duration-300"
                onMouseOver={(e) => {
                  const videoEl = e.currentTarget;
                  if (videoEl.paused) {
                    videoEl.play().catch(() => {
                      // ignore interrupted play calls (e.g., quick hover out)
                    });
                  }
                }}
                onMouseOut={(e) => e.currentTarget.pause()}
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-base sm:text-lg font-semibold leading-snug whitespace-pre-line drop-shadow">
                {video.title}
              </div>
            </div>
          ))}
        </div>

        {/* 🔸 Desktop Grid Videos */}
        <div className="hidden md:flex flex-row gap-6 justify-center items-center mt-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="w-[32%] aspect-[9/14] rounded-2xl overflow-hidden relative group shadow-lg"
            >
              <video
                src={video.src}
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                onMouseOver={(e) => {
                  const videoEl = e.currentTarget;
                  if (videoEl.paused) {
                    videoEl.play().catch(() => {
                      // ignore interrupted play calls (e.g., quick hover out)
                    });
                  }
                }}
                onMouseOut={(e) => e.currentTarget.pause()}
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-base font-semibold leading-snug whitespace-pre-line drop-shadow">
                {video.title}
              </div>
            </div>
          ))}
        </div>

        {/* Separator Gap */}
        <div className="mt-12" />
      </div>
    </section>
  );
}
