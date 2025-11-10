"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogPost = {
  title: string;
  cover: string;
  author: string;
  date: string;
  href: string;
};

const POSTS: BlogPost[] = [
  // first 3
  {
    title: "Workouts That Fit Busy Schedules: 20-Minute Routines",
    cover: "/images/blogs/busyworkout.jpg",
    author: "Team BreatheX",
    date: "January 30, 2025",
    href: "/blog/busy-workouts",
  },
  {
    title: "The Ultimate Guide to Recovery: Rest, Rebuild, Perform",
    cover: "/images/blogs/recovery.jpg",
    author: "Team BreatheX",
    date: "January 30, 2025",
    href: "/blog/recovery-guide",
  },
  {
    title: "Push Your Limits: Fitness Challenges to Try This Year",
    cover: "/images/blogs/challenge.jpg",
    author: "Team BreatheX",
    date: "January 30, 2025",
    href: "/blog/fitness-challenges",
  },
  // next 3 (slide to reveal)
  {
    title: "Macro Basics: Nail Your Protein, Carbs & Fats",
    cover: "/images/blogs/macros.jpg",
    author: "Team BreatheX",
    date: "February 2, 2025",
    href: "/blog/macro-basics",
  },
  {
    title: "Mobility Routines That Actually Save Time",
    cover: "/images/blogs/mobility.jpg",
    author: "Team BreatheX",
    date: "February 4, 2025",
    href: "/blog/mobility-time-savers",
  },
  {
    title: "Beginner’s Guide: Strength Training Without Intimidation",
    cover: "/images/blogs/beginner.jpg",
    author: "Team BreatheX",
    date: "February 6, 2025",
    href: "/blog/beginner-strength",
  },
];

export default function GenXBlogs() {
  const railRef = useRef<HTMLDivElement>(null);

  // 1) underline animation class (fixed)
  // 1) Tweak this
const baseClass =
  "inline-block relative text-sm font-medium " +
  // animated underline using background-size
  "[background-image:linear-gradient(currentColor,currentColor)] bg-no-repeat " +
  "[background-position:0_100%] [background-size:0%_1.5px] " +
  "transition-[background-size] duration-500 hover:[background-size:100%_1.5px] " +
  "pb-0.5"; // tiny space so the line isn't clipped


  const scrollByPage = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * dir;
    rail.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-black text-white py-14 md:py-20">
      <div className="w-full max-w-[1320px] px-6 md:px-8 mx-auto">
        {/* Top Row: heading left, visit+arrows right */}
        <div className="flex flex-wrap items-end justify-between gap-y-4 mb-8 md:mb-12">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            <span className="text-white">UNLEASHED</span>
            <span className="text-transparent stroke-white ml-2 inline-block">
              BY BREATHEX
            </span>
          </h2>

          <div className="flex items-center gap-4 self-end pb-1">
            {/* Visit Blog with underline */}
            <Link href="/blog" className={`${baseClass} text-white`}>
              Visit Blog
            </Link>

            {/* Arrows (lucide, no border) */}
            <div className="hidden md:flex gap-2">
              <button
                aria-label="Previous"
                onClick={() => scrollByPage(-1)}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <ChevronLeft className="w-5 h-5 text-white/90" />
              </button>
              <button
                aria-label="Next"
                onClick={() => scrollByPage(1)}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <ChevronRight className="w-5 h-5 text-white/90" />
              </button>
            </div>
          </div>
        </div>

        {/* Rail (3-up carousel with snap) */}
        <div className="relative">
          <div
            ref={railRef}
            className="flex gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {POSTS.map((p, i) => (
              <article
                key={i}
                className="snap-start shrink-0 w-[88%] sm:w-[65%] md:w-[32%]"
              >
                <Link href={p.href} className="block group">
                  {/* Image – rounded, no border */}
                  <div
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-black/30
                                  transition-transform duration-300 group-hover:scale-[1.01]"
                  >
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 65vw, 32vw"
                      priority={i < 3}
                    />
                  </div>

                  {/* Copy */}
                  <div className="pt-5">
                    <h3 className="text-lg md:text-xl font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-xs md:text-sm text-white/60">
                      {p.author} · Posted on {p.date}
                    </p>
                    
                  </div>
                  <span
                      className={`mt-5 inline-block ${baseClass} text-white/80 hover:text-white`}
                    >
                      Read More
                    </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
