"use client";

import Image from "next/image";

const IMAGES = [
  "/images/strip/1.jpg",
  "/images/strip/2.jpg",
  "/images/strip/3.jpg",
  "/images/strip/4.jpg",
  "/images/strip/5.jpg",
  "/images/strip/6.jpg",
];

export default function MovingCommunityStrip() {
  // duplicate once for seamless loop (0% -> -50%)
  const items = [...IMAGES, ...IMAGES];

  return (
    <section className="relative bg-black py-14 sm:py-14 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="group flex flex-col gap-6 md:flex-row md:items-center">
          {/* Track (left) fills remaining space; card sits fixed on right */}
          <div className="relative flex-1 overflow-hidden">
            {/* optional fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-14 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 bg-gradient-to-l from-black to-transparent" />

            <ul
              className="
                flex gap-3 sm:gap-4
                will-change-transform
                animate-[marquee_40s_linear_infinite]
                [animation-duration:10s] md:[animation-duration:40s]
                group-hover:[animation-play-state:paused]
                motion-reduce:animate-none
              "
              style={{
                // help the browser plan layout (prevents small jolts)
                // each li is fixed width; duplicating items makes seamless 50% shift
                minWidth: "200%", // not strictly required but nice for predictability
              }}
            >
              {items.map((src, i) => (
                <li
                  key={`img-${i}`}
                  className="relative flex-shrink-0 overflow-hidden rounded-2xl bg-white/5 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]"
                >
                  <Image
                    src={src}
                    alt="Community"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
                    priority={i < 4}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Pinned CTA (right) — identical square size */}
          <div
            className="
              flex-shrink-0 rounded-2xl bg-black text-white
              shadow-xl shadow-black/40
              flex flex-col items-center justify-center
              w-full max-w-[420px] mx-auto
              md:ml-4 md:w-[300px] md:h-[300px]
            "
          >
            <h2
              className="text-[2.2rem] sm:text-5xl lg:text-6xl leading-[0.95] flex justify-center flex-wrap text-center px-4"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              <span className="text-white block sm:inline">JOIN THE </span>
              <span
                className="text-transparent stroke-white sm:ml-2 inline-block lg:[-webkit-text-stroke-width:2px]"
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                &nbsp;FAMILY
              </span>
            </h2>

            <p className="text-white/85 text-sm md:text-base leading-relaxed text-center mt-3 px-5 sm:px-6">
              Be part of our growing community of fitness enthusiasts &amp;
              wellness seekers.
            </p>

            <a
              href="https://instagram.com/yourbrand"
              target="_blank"
              rel="noreferrer"
              className="
                mt-4 inline-flex items-center gap-2
                rounded-full px-6 py-2
                bg-white text-black font-medium
                hover:opacity-90 transition
              "
            >
              Follow us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
