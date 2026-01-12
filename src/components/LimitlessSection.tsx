"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, type ProductCategory } from "@/constants/everydayData";
import { useCart } from "@/contexts/CartContext";

export default function LimitlessSection() {
  const categories = Object.keys(PRODUCTS) as ProductCategory[];
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("Men");
  const { addToCart, openCart } = useCart();

  const handleAddToCart = async (product: typeof PRODUCTS[ProductCategory][number]) => {
    const discountPercentage = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

    await addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.oldPrice,
      image: product.img,
      size: "M", // Default size
      discount: discountPercentage,
      slug: product.slug,
    });

    openCart();
  };

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-wide mb-3 sm:mb-4 text-gray-500">Explore</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6" style={{ fontFamily: "Anton, sans-serif" }}>
          <span className="text-transparent stroke-black-product">THE </span>
          <span className="font-black">EVERYDAY</span>
          <span className="text-transparent stroke-black-product"> COLLECTION</span>
        </h2>

        {/* Category Tabs - MOBILE OPTIMIZED */}
        <div className="flex justify-center items-center gap-4 sm:gap-10 mt-3 sm:mt-4 mb-6 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 transition text-xs sm:text-sm font-light mt-2 sm:mt-3 cursor-pointer ${
                selectedCategory === category
                  ? "bg-white rounded-full border border-black text-black"
                  : "border-black text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards - HORIZONTAL SCROLL ON MOBILE, GRID ON DESKTOP */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 flex md:flex-none overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {PRODUCTS[selectedCategory].map((product, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center group"
            >
              {/* Image Container with Link */}
              <Link href={`/shop/products/${product.slug}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-xl relative cursor-pointer">
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={366}
                    height={366}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              </Link>

              {/* Price and Name Box */}
              <div className="p-3 sm:p-4 bg-white">
                <Link href={`/shop/products/${product.slug}`}>
                  <h3 className="text-base sm:text-lg md:text-xl font-light mb-1 hover:underline cursor-pointer">{product.title}</h3>
                </Link>
                <div className="text-sm sm:text-base mb-3">
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
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
