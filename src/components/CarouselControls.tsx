import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";


export default function CarouselControls({
  isPlaying,
  setIsPlaying,
  prevSlide,
  nextSlide,
  progressKey,
  setProgressKey,
}: {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>; // proper typre for setter function
  prevSlide: () => void;
  nextSlide: () => void;
  progressKey: number; // key to force re-animation
  setProgressKey: (v: (prev: number) => number) => void;
}) {
  const togglePlay = () => {
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (nextState) {
        setProgressKey((prevKey) => prevKey + 1); // restarts animation
      }
      return nextState;
    });
  };

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
      <div className="relative w-10 h-10">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-transparent text-white flex items-center justify-center hover:bg-[#c0c0c0] transition relative z-10"
        >
          {/* Progress Circle */}
          <svg
            
            className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="opacity-20"
            />
            <circle
            key={progressKey}
              cx="18"
              cy="18"
              r="16"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="100"
              className={isPlaying ? "animate-progress" : "opacity-0"}
            />
          </svg>

          {/* Icon */}
          {isPlaying ? (
            <Pause className="w-4 h-4 z-10 fill-white" />
          ) : (
            <Play className="w-4 h-4 z-10 fill-white" />
          )}
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="w-10 h-10 rounded-full bg-[#d9d9d9] flex items-center justify-center hover:bg-[#c0c0c0] transition"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="w-10 h-10 rounded-full bg-[#d9d9d9] flex items-center justify-center hover:bg-[#c0c0c0] transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
