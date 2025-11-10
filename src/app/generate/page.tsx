export default function GeneratePage() {
  return (
    <section className="relative min-h-[100svh] bg-[#0a0b0d] overflow-hidden">
      {/* 🔮 GLOBAL BACKGROUND (fixed so nav blends; no boundaries) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* deep base */}
        <div className="absolute inset-0 bg-[#0a0b0d]" />

        {/* top-left aurora (purple→blue) */}
        <div
          className="absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full blur-[90px] opacity-80"
          style={{
            background:
              "radial-gradient(closest-side, rgba(106,76,255,0.65), rgba(42,138,255,0.35) 55%, transparent 65%)",
          }}
        />

        {/* right-edge glow (teal→cyan) */}
        <div
          className="absolute -top-10 right-[-120px] h-[420px] w-[520px] rounded-full blur-[100px] opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,215,255,0.45), rgba(0,145,245,0.25) 55%, transparent 70%)",
          }}
        />

        {/* bottom-left nebula (pink→orange) */}
        <div
          className="absolute bottom-[-120px] left-[-80px] h-[620px] w-[620px] rounded-full blur-[110px] opacity-75"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,90,150,0.50), rgba(255,150,80,0.35) 55%, transparent 70%)",
          }}
        />

        {/* soft vertical fade for readability */}
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* CONTENT (push below transparent navbar) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28">
        <header className="mb-10">
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.35)]"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            MEET GENX AI
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            Talk to your AI coach. Answer a few questions and get a tailored workout, diet, and yoga plan.
          </p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-white">
          GENERATE PAGE
        </div>

        <div className="h-24" />
      </main>
    </section>
  );
}
