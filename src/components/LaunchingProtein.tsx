"use client";

export default function LaunchProteinTeaser() {
  return (
    <section id="launch-protein-section" className="w-full py-5 mb-20 flex justify-center">
      {/* card: same width as site, height locked */}
      <div
        className="relative w-full max-w-[1200px] rounded-2xl overflow-hidden border  border-cyan-500
                   h-[260px] sm:h-[340px] md:h-[420px] bg-black shadow-[0_0_20px_rgba(34,211,238,0.25)]"
      >
        {/* soft global vignette so image feels embedded */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.8)_100%)]" />

        {/* grid fills full height */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 h-full">
          {/* LEFT — copy */}
          <div className="h-full flex flex-col justify-center gap-3 px-6 sm:px-8">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/80">
              LAUNCHING SOON
            </span>

            <h2
              className="uppercase text-2xl sm:text-3xl md:text-5xl font-bold
                         text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500
                         drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              The Ultimate Protein
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-md">
              Clean blend • 25g protein • 0g sugar • Smooth mixability
            </p>

            <div className="mt-1 flex gap-3 items-center">
              <button className="px-5 py-2 rounded-full text-sm font-medium tracking-wide border border-cyan-400/70 text-white hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                Notify Me
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-light border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT — image as background (feels part of card) */}
          <div
            className="relative h-full w-full bg-no-repeat bg-contain bg-[position:85%_center] sm:bg-right"
            style={{
              backgroundImage: "url(/images/protein-gym.jpg)",
            }}
          >
            {/* side & top/bottom fades for seamless embed */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
          </div>
        </div>

      

      </div>
    </section>
  );
}
