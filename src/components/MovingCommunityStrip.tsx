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

  // keep image + card in perfect squares; tweak one constant to resize all
  const size = 300; // 300, or 320/340 if you want larger

  return (
    <section className="relative bg-black py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="group flex items-center">
          {/* Track (left) fills remaining space; card sits fixed on right */}
          <div className="relative flex-1 overflow-hidden">
            {/* optional fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />

            <ul
              className="
                flex gap-3
                will-change-transform
                animate-[marquee_40s_linear_infinite]
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
                  className="relative flex-shrink-0 overflow-hidden rounded-2xl bg-white/5"
                  style={{ width: size, height: size }}
                >
                  <Image
                    src={src}
                    alt="Community"
                    fill
                    className="object-cover object-center"
                    sizes={`${size}px`}
                    priority={i < 4}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Pinned CTA (right) — identical square size */}
          <div
            className="
              flex-shrink-0 ml-4 rounded-2xl bg-black text-white
              shadow-xl shadow-black/40
              flex flex-col items-center justify-center
            "
            style={{ width: size, height: size }}
          >
            <h2
  className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] flex justify-center flex-wrap"
  style={{ fontFamily: "Anton, sans-serif" }}
>
  <span className="text-white">JOIN THE</span>
  <span
    className="text-transparent stroke-white ml-2 inline-block mt-1"
    style={{
      WebkitTextStroke: "2px white",
      color: "transparent",
    }}
  >
   FAMILY
  </span>
</h2>


            <p className="text-white/85 text-sm md:text-base leading-relaxed text-center mt-3 px-4">
  Be part of our growing community of fitness enthusiasts &amp; wellness seekers.
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
