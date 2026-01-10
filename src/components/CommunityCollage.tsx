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
    <section className="bg-black text-white py-10 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-6 sm:gap-y-8 lg:gap-y-0">
          {/* Heading - MOBILE OPTIMIZED */}
          <div className="lg:col-span-5">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              A judgement-free
              <br />
              space for everyone
              {/* <span className="absolute -bottom-2 left-0 w-full h-[0.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full" /> */}
            </h2>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/60 max-w-md">
              Real members across ages, goals and backgrounds. If youre in, you
              belong.
            </p>
          </div>

          {/* Collage - MOBILE OPTIMIZED */}
          <div className="lg:col-span-7 relative h-[50vh] sm:h-[52vh] md:h-[56vh] lg:h-[70vh]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(1200px_600px_at_60%_50%,rgba(255,255,255,0.05),transparent_60%)]" />

            {/* Desktop scatter - UNCHANGED */}
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
                    scale-100 hover:scale-[1.02]
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

            {/* Mobile / tablet grid - COMPLETELY REDESIGNED */}
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 h-full auto-rows-fr">
              {TILES.slice(0, 6).map((t, i) => (
                <figure
                  key={i}
                  className="rounded-2xl sm:rounded-3xl shadow-lg shadow-black/30 ring-1 ring-white/10 bg-white/5 p-1 sm:p-1.5
                             transition-all duration-300 origin-center
                             grayscale-[0.5] hover:grayscale-0"
                >
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={t.src}
                        alt={t.alt}
                        fill
                        sizes="(max-width: 640px) 48vw, 32vw"
                        className="object-cover object-center transition duration-500
                                   hover:brightness-110"
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