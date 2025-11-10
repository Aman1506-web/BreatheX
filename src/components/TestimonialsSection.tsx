"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TItem = {
  title: string;
  blurb: string;
  before: string;
  after: string;
};

const ITEMS: TItem[] = [
  {
    title: "Rahul & Isha",
    blurb:
      "Even with crazy work hours, we still train together. GenX AI plans keep us on track every week.",
    before: "/images/testimonials/rahul-isha-before.jpg",
    after: "/images/testimonial1.jpg",
  },
  {
    title: "Shilpa Mehta",
    blurb:
      "At this age, yoga keeps me strong and peaceful. GenX AI’s routines fit perfectly into my mornings.",
    before: "/images/testimonials/shilpa-before.jpg",
    after: "/images/testimonial2.jpg",
  },
  {
    title: "Dr Anirudh Deepak",
    blurb:
      "From feeling stuck to building strength — GenX AI gave me the structure I needed to transform.",
    before: "/images/testimonials/anirudh-before.jpg",
    after: "/images/testimonial4.jpg",
  },
  {
    title: "Aisha Khan",
    blurb:
      "Balancing strength and flexibility is now effortless. GenX AI’s mix of yoga and fitness is perfect.",
    before: "/images/testimonials/aisha-before.jpg",
    after: "/images/testimonial7.jpg",
  },
];

export default function GenXTestimonials() {
  const railRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const tick = () => {
      const w = rail.clientWidth;
      const max = rail.scrollWidth - w;
      const next = rail.scrollLeft + w;
      if (next >= max - 8) rail.scrollTo({ left: 0, behavior: "smooth" });
      else rail.scrollBy({ left: w, behavior: "smooth" });
    };

    if (isHover) return;
    const id = setInterval(tick, 2500);
    return () => clearInterval(id);
  }, [isHover]);

  const scrollByPage = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: rail.clientWidth * dir, behavior: "smooth" });
  };

  return (
    <section className="bg-black text-white min-h-[100svh] flex items-center justify-center py-12 md:py-16">
      <div className="w-full max-w-[1320px] px-6 md:px-8">
        {/* Header */}
        <div className="w-full flex justify-center mb-6 mt-3">
          <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-white/10 border border-white/15">
            Powered by{" "}
            <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-bold">
              GenX AI
            </span>
          </span>
        </div>

        <h2
          className="text-center mb-4 lg:text-6xl sm:text-5xl text-4xl"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          <span className="text-transparent stroke-white mr-2 inline-block">CLIENT</span>
          <span className="text-white">TESTIMONIALS</span>
        </h2>

        <p className="text-center text-sm sm:text-base text-white/70 max-w-3xl mx-auto mb-10 md:mb-12">
          Real people, real results. AI-generated{" "}
          <span className="text-white">workout • diet • yoga</span> plans tailored to their lives.
        </p>

        {/* Slider rail */}
        <div
          className="mt-5 relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Arrows */}
          <button
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="fill-white/80">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="fill-white/80">
              <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>

          {/* Rail */}
          <div
            ref={railRef}
            className="flex gap-10 md:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory scroll-smooth px-3 md:px-6"
          >
            {ITEMS.map((it, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[88%] sm:w-[68%] md:w-[32%] lg:w-[31%]"
              >
                {/* Gradient ring */}
                <div className="p-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">
                  {/* Card: bigger + consistent text block */}
                  <article className="rounded-3xl bg-black border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] h-[500px] md:h-[580px] flex flex-col">
                    {/* fixed-height text area so images align across cards */}
                    <div className="px-7 pt-6 pb-4 text-center shrink-0 min-h-[120px] md:min-h-[132px]">
                      <h3 className="text-lg font-semibold">{it.title}</h3>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        {it.blurb}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="relative flex-1 min-h-0 mx-4 mb-4 rounded-3xl overflow-hidden">
                      <Image
                        src={it.after}
                        alt={it.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 90vw, 30vw"
                        priority={idx < 3}
                      />
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* note */}
        <p className="mt-8 text-center text-xs text-white/50">
          * Results vary by individual. GenX AI adapts plans to your inputs, lifestyle and progress.
        </p>

        {/* CTA button with gradient outline */}
        <div className="mt-6 flex justify-center">
          <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">
            <button
              className="px-7 py-3 rounded-full bg-black cursor-pointer text-white text-base font-semibold
                         shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                         transition will-change-transform
                         hover:scale-[1.03] focus:outline-none"
            >
              Generate Your Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
