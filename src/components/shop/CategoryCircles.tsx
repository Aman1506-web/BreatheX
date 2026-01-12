"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { scroller } from "react-scroll";

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: "bestseller", name: "Bestseller", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop" },
  { id: "apparel", name: "Apparel", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { id: "supplements", name: "Supplements", image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=400&fit=crop" },
  { id: "bottles", name: "Bottles", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop" },
  { id: "footwear", name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { id: "equipment", name: "Equipment", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop" },
  { id: "bags", name: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop" },
  { id: "yoga", name: "Yoga", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop" },
  { id: "home-workout", name: "Home Workout", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop" },
];

interface CategoryCirclesProps {
  onCategorySelect?: (categoryId: string) => void;
}

export default function CategoryCircles({ onCategorySelect }: CategoryCirclesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("bestseller");
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect?.(categoryId);

    // Scroll selected category into view horizontally
    const categoryElement = categoryRefs.current[categoryId];
    if (categoryElement) {
      categoryElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    // Scroll to products section
    scroller.scrollTo("products-section", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100, // Offset for fixed header if any
    });
  };

  return (
    <section className="w-full bg-white py-6 sm:py-8 lg:py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Scrollable Category Container with extra padding */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max py-2 sm:py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(el) => {
                  categoryRefs.current[category.id] = el;
                }}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer transition-all"
              >
                {/* Circle Image Container */}
                <div
                  className={`relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-gray-100 transition-all ${
                    selectedCategory === category.id
                      ? "ring-2 sm:ring-4 ring-black scale-105"
                      : "ring-2 ring-transparent hover:ring-gray-300"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Category Name */}
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "text-black"
                      : "text-gray-600 group-hover:text-black"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
