"use client";

import Link from "next/link";

export default function ShopHero() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-black overflow-hidden">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="space-y-3 sm:space-y-6">
            <h1 className="text-[50px] sm:text-[80px] lg:text-[120px] font-black leading-none tracking-tight">
              <span className="text-[#FFD700]">NO</span>
              <br />
              <span className="text-[#FFD700]">EXCUSES</span>
              <br />
              <span className="relative inline-block">
                <span className="text-[#FFD700]">SALE</span>
                {/* White circle outline around SALE */}
                <svg
                  className="absolute -top-2 sm:-top-4 -left-4 sm:-left-8 w-[140px] h-[60px] sm:w-[280px] sm:h-[120px]"
                  viewBox="0 0 280 120"
                >
                  <ellipse
                    cx="140"
                    cy="60"
                    rx="130"
                    ry="50"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    transform="rotate(-5 140 60)"
                  />
                </svg>
              </span>
            </h1>

            <Link
              href="#products"
              className="inline-block bg-white text-black font-bold text-sm sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full hover:bg-gray-200 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Center - Person Image with Yellow Outline - Hidden on mobile */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-[300px] xl:w-[400px] h-[400px] xl:h-[500px]">
            {/* Yellow glow outline */}
            <div
              className="absolute inset-0 blur-3xl opacity-60"
              style={{
                background: 'radial-gradient(ellipse, #FFD700 0%, transparent 70%)',
              }}
            />

            {/* Person silhouette - using placeholder */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-[200px] flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-24 xl:w-32 h-24 xl:h-32 bg-gray-600 rounded-full mx-auto mb-4" />
                  <div className="w-36 xl:w-48 h-48 xl:h-64 bg-gray-600 rounded-3xl mx-auto" />
                </div>
              </div>

              {/* Yellow border outline */}
              <svg
                className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)]"
                viewBox="0 0 500 600"
              >
                <path
                  d="M 250,50 Q 150,100 150,300 T 250,550 Q 350,500 350,300 T 250,50"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Discount Text */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="text-center md:text-right">
            <h2 className="text-[50px] sm:text-[70px] lg:text-[100px] font-black leading-none tracking-tight">
              <span className="text-white">UPTO</span>
              <br />
              <span className="text-[#FFD700]">40%</span>
              <span className="text-white"> OFF</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
