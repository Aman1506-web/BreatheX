"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CarouselControls from "./CarouselControls";

export default function HeroCarousel() {
  // Slides array
  const slides = [
    {
      image: "/slide1.jpg",
      headline: "SMART\nWORKOUTS",
      subtext:
        "Personalized workout, diet & yoga plans — crafted by intelligent algorithms for your unique fitness journey.",
    },
    {
      image: "/slide2.jpg",
      headline: "ELEVATE BODY\n& MIND",
      subtext:
        "Boost strength, stamina & flexibility with intelligent programs that fit your lifestyle.",
    },
    {
      image: "/slide3.jpg",
      headline: "AI-POWERED\nYOGA FLOW",
      subtext: "Relax, recharge & build with yoga plans personalized by AI.",
    },
    {
      image: "/slide4.jpg",
      headline: "NUTRITION\nMADE EASY",
      subtext:
        "Smart diet plans for your fitness goals — generated instantly with AI.",
    },
  ];

  // toggle slides variables
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  // for auto play pause
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressKey, setProgressKey] = useState(0);

  const totalSlides = slides.length;

  // called when clicked this > button
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides); // forward the slide
    setProgressKey((prevKey) => prevKey + 1); // reset Progress circle on forward button press
  };

  // called when clicked this < button
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides); // backward the slide
    setProgressKey((prevKey) => prevKey + 1); // reset progress circle on clicking backward button
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % totalSlides;
          setProgressKey((prevkey) => prevkey + 1); // RESET on every slide change
          return nextSlide;
        });
      }, 5000); // 5 seconds
    }

    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  return (
    <section className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
      {/* for fade in out animation */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image} // replace with your image path
            alt="Hero Slide"
            fill
            className="absolute inset-0 object-cover  w-full h-full brightness-110"
            priority={index === currentSlide}
          />

          {/* Gradient shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-10" />

          {/* Text Overlay */}
          <div className="absolute top-[65%] left-6 sm:left-16 transform -translate-y-1/2 z-10 max-w-[90%] sm:max-w-[500px]">
            <h4
              className="text-sm mb-0.5 font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent tracking-wide drop-shadow-[1px_1px_2px_rgba(0,0,0,0.4)] transition
"
            >
              POWERED BY ARTIFICIAL INTELLIGENCE
            </h4>

            <h1
              className="text-white text-[65px] sm:text-[90px] leading-[1.1] -tracking-normal font-bold mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] whitespace-pre-line"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              {slide.headline}
            </h1>

            <p className="text-white text-sm sm:text-base mb-6 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
              {slide.subtext}
            </p>
            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]
">
                Learn More
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]
">
                Generate Now
              </button>
            </div>
          </div>

          {/* Carousel Controls */}
          <CarouselControls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            progressKey={progressKey}
            setProgressKey={setProgressKey}
          />

          {/* ⬤ Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index); // slide change
                  setProgressKey((prevKey) => prevKey + 1); // reset progress ring
                }}
                className={`w-2 h-2 rounded-full transition ${
                  currentSlide === index
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
