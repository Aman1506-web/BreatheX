"use client";

import Image from "next/image";

type Tile = {
  src: string;
  alt: string;
  w: string;
  top: string;
  left: string;
};

const TILES: Tile[] = [
  {
    src: "/images/community/man-left.jpg",
    alt: "Man portrait",
    w: "17%",
    top: "26%",
    left: "3%",
  },
  {
    src: "/images/community/women-yoga.jpg",
    alt: "Powerlifter",
    w: "23%",
    top: "38%",
    left: "22%",
  },
  {
    src: "/images/community/couple-gray.jpg",
    alt: "Fit couple",
    w: "19%",
    top: "8%",
    left: "45%",
  },
  {
    src: "/images/community/woman-flex.jpg",
    alt: "Woman flexing",
    w: "17%",
    top: "16%",
    left: "68%",
  },
  {
    src: "/images/community/woman-right.jpg",
    alt: "Bodybuilder",
    w: "15%",
    top: "16%",
    left: "86%",
  },

  // ⬇️ center cluster spread + slight size bump
  {
    src: "/images/community/man-center.jpg",
    alt: "Center athlete",
    w: "24%",
    top: "40%",
    left: "40%",
  },
  {
    src: "/images/community/yoga-group.jpg",
    alt: "Yoga group",
    w: "22%",
    top: "44%",
    left: "66%",
  },

  {
    src: "/images/community/prosthetic-leg.jpg",
    alt: "prosthetic leg",
    w: "23%",
    top: "64%",
    left: "70%",
  },
  {
    src: "/images/community/child.jpg",
    alt: "Smiling boy",
    w: "19%",
    top: "62%",
    left: "32%",
  },
  {
    src: "/images/community/old-woman.jpg",
    alt: "Woman posing",
    w: "19%",
    top: "64%",
    left: "6%",
  },
];

export default function CommunityViewportCollage() {
  return (
    <section className="bg-black text-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1350px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-12 lg:gap-y-0">
          {/* Heading */}
          <div className="lg:col-span-5">
            <h2
              className="text-5xl md:text-6xl font-bold relative z-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
  style={{ fontFamily: "Anton, sans-serif" }}
            >
              A judgement-free
              <br />
              space for everyone
              <span className="absolute -bottom-2 left-0 w-full h-[0.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full" />
            </h2>

            <p className="mt-4 text-sm sm:text-base text-white/60 max-w-md">
              Real members across ages, goals and backgrounds. If you’re in, you
              belong.
            </p>
          </div>

          {/* Collage */}
          <div className="lg:col-span-7 relative h-[52vh] sm:h-[56vh] lg:h-[70vh]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(1200px_600px_at_60%_50%,rgba(255,255,255,0.05),transparent_60%)]" />

            {/* Desktop scatter */}
            <div className="hidden lg:block absolute inset-0">
              {TILES.map((t, i) => (
                <figure
                  key={i}
                  style={{ width: t.w, top: t.top, left: t.left }}
                  className="
    absolute rounded-3xl
    transition-transform duration-300
    shadow-xl shadow-black/25
     p-2     
    origin-center
    scale-100 hover:scale-[1.02]   /* was scale-[0.97]→100 */
  "
                >
                  <div className="rounded-2xl overflow-hidden">
                    <div
                      className="relative w-full"
                      style={{ paddingTop: "130%" }}
                    >
                      <Image
                        src={t.src}
                        alt={t.alt}
                        fill
                        sizes="25vw"
                        priority={i < 4}
                        className="object-cover object-center transition duration-500
                   grayscale hover:grayscale-0 hover:brightness-110"
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            {/* Mobile / tablet grid */}
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 h-full content-center">
              {TILES.slice(0, 6).map((t, i) => (
                <figure
                  key={i}
                  className="rounded-3xl shadow-xl shadow-black/25 ring-1 ring-white/10 bg-white/5 p-1.5
                             transition-transform duration-300 origin-center scale-[0.98] hover:scale-100"
                >
                  <div className="rounded-2xl overflow-hidden">
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={t.src}
                        alt={t.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, 30vw"
                        className="object-cover object-center transition duration-500
                                   grayscale hover:grayscale-0 hover:brightness-110"
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
