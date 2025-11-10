"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCTS } from "@/constants/everydayData"; // ⬅️ Import here

export default function LimitlessSection() {
  const categories = Object.keys(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("Men");

  return (
    <section className="bg-white py-1 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-wide mb-4 text-gray-500">Explore</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "Anton, sans-serif" }}>
          <span className="text-transparent stroke-black-product">THE </span> <span className="font-black">EVERYDAY</span> <span className="text-transparent stroke-black-product"> COLLECTION</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-10 mt-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2  transition text-sm font-light mt-3 cursor-pointer ${
                selectedCategory === category
                  ? "bg-white rounded-full border border-black text-black"
                  : "border-black text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS[selectedCategory].map((product, idx) => (
            <div
              key={idx}
              className="aspect-[3/4] w-full overflow-hidden rounded-xl"
            >
              <Image
                src={product.img}
                alt={product.title}
                width={366}
                height={366}
                className="object-cover rounded w-[366px] h-[366px]"
              />
              {/* price and name box */}
              <div className="p-4 bg-white">
                <h3 className="text-xl font-light mb-1 ">{product.title}</h3>
                <div className="text-base">
                  <span className="line-through text-gray-400 mr-2 font-light">
                    ₹{product.oldPrice}
                  </span>
                  <span className="text-black font-medium mr-2">
                    ₹{product.price}
                  </span>
                  <span className="text-blue-600 font-medium">
                    {product.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
