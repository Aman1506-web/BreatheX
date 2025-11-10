// components/TopMarquee.tsx
export default function TopMarquee() {
  return (
    <div className="banner-container fixed w-full bg-black text-white text-xs font-medium overflow-hidden border-b border-border h-9 flex items-center z-[60] ">
      <div className="marquee whitespace-nowrap text-sm font-geist tracking-wide">
        <span className="inline-block px-4">
          {" "}
          {Array(50).fill(" ELEVATE YOUR BODY & MIND WITH AI ⚡\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0").join(" ")}
        </span>
      </div>
    </div>
  );
}
