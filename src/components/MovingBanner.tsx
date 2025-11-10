export default function BuiltToEndureBanner() {
  return (
    <div className="endure-banner w-full bg-black text-white overflow-hidden border-b border-border py-6 flex items-center z-[50]">
      <div className="endure-marquee whitespace-nowrap w-full text-center">
        <h2
          className="inline-block text-4xl sm:text-5xl font-bold uppercase tracking-wide"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          {Array(50).fill(0).map((_, i) => (
            <span key={i} className="mr-[80px] inline-block">
              <span className="text-transparent stroke-white-endure mr-2 inline-block">
                BUILT TO
              </span>
              <span className="text-white">ENDURE</span>
              
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
