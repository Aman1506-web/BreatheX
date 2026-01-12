"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "Trending" | "Bestseller" | "Top pick";
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useCart();

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
      size: "M", // Default size
      discount: discountPercentage,
      slug: product.slug,
    });

    openCart();
  };

  return (
    <Link href={`/shop/products/${product.slug}`}>
      <div className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
          {product.badge && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
              <span className="bg-[#FFD700] text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                {product.badge}
              </span>
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
          {/* Product Name */}
          <h3 className="text-[11px] sm:text-xs lg:text-sm font-bold text-black uppercase line-clamp-2 min-h-[32px] sm:min-h-[36px] lg:min-h-[40px]">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-lg lg:text-2xl font-bold text-black">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs lg:text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white font-semibold text-[10px] sm:text-xs lg:text-sm py-2 sm:py-2.5 lg:py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
}
