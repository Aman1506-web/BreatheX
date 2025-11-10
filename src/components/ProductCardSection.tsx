"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCardSection() {
  const [quantity, setQuantity] = useState(1);
  const sizes = ["X-SMALL", "SMALL", "MEDIUM", "LARGE", "X-LARGE", "XX-LARGE"];
  const [selectedSize, setSelectedSize] = useState("UK 06");

  const thumbnails = [
    "/images/shorts1.jpg",
    "/images/shorts2.jpg",
    "/images/shorts3.jpg",
    "/images/shorts4.jpg",
  ];
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

  return (
    <section className="bg-white py-16 flex justify-center">
      <div className="w-full max-w-[1200px] px-4">
        {/* Heading */}
        <div className="flex items-center mb-8">
          <h2
            className="text-4xl sm:text-5xl font-bold uppercase tracking-wide flex items-center"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            <span className="text-transparent stroke-black-product mr-2">
              NEW
            </span>
            <span className="text-black">ARRIVALS</span>⚡
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left - Image + Thumbnails */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3">
              {thumbnails.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${
                    selectedImage === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Gym Shorts"
                width={600}
                height={750}
                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col gap-6">
            {/* Discount Badge */}
            <div className="bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded w-max">
              42% OFF
            </div>

            {/* Title */}
            <h3 className="text-2xl font-light leading-snug">
              BREATHEX GYM SHORTS - BLACK/WHITE
            </h3>

            {/* Brand */}
            <p className="text-gray-500 text-sm underline cursor-pointer">
              BREATHEX
            </p>

            {/* Price Section */}
            <div className="text-lg space-x-3">
              <span className="line-through text-gray-400">₹1500</span>
              <span className="text-red-700 font-semibold">₹650</span>
              <span className="text-blue-700 font-semibold">42% OFF</span>
              <span className="text-xs text-gray-500">TAXES INCLUDED</span>
            </div>

            {/* Divider */}
            <hr className="-mt-3 mb-5 border-t border-gray-200" />

            {/* Size Selector */}
            <div>
              <p className="text-sm mb-2 font-normal">SIZE: {selectedSize}</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 cursor-pointer font-light rounded border ${
                      selectedSize === size
                        ? "border-black text-sm"
                        : "border-gray-300 text-sm"
                    } hover:bg-black hover:text-white transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              {/* - 1 + Group with same height and outline */}
              <div className="flex items-center border border-gray-300 rounded-full px-4 h-10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-lg font-light px-2 text-gray-400 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-base font-light">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg font-light px-2 text-gray-400 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="bg-black w-full text-white px-8 md:px-12 py-2.5 h-10 rounded-full hover:bg-white hover:text-black border border-black transition-all duration-300 text-sm font-light cursor-pointer">
                Add to Cart
              </button>
            </div>

            {/* Buy Now Button */}
            <button className="border border-black text-black px-8 md:px-12 py-2.5 h-10 rounded-full text-sm font-light hover:bg-black hover:text-white transition cursor-pointer">
              Buy It Now
            </button>

            {/* View Product Link */}
            <button className="text-sm text-black underline underline-offset-4 hover:opacity-70 font-light cursor-pointer">
              View Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
