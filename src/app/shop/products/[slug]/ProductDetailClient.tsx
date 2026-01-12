"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Maximize2 } from "lucide-react";
import { Product } from "@/components/shop/ProductCard";
import { useCart } from "@/contexts/CartContext";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import Footer from "@/components/Footer";
import { mockProducts } from "@/components/shop/mockProducts";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [sortBy, setSortBy] = useState("most-recent");

  // Get a frequently bought together product (knee support cap as default)
  const frequentlyBoughtProduct = mockProducts.find(p => p.id === "22") || mockProducts[0];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const features = [
    { icon: "💧", title: "Water Resistant Nylon", description: "Keeps you dry" },
    { icon: "🌬️", title: "Wind Blocking Collar", description: "Stay warm" },
    { icon: "👕", title: "Snug Elastic Hem", description: "Perfect fit" },
    { icon: "👖", title: "Dual pocket system", description: "Store essentials" },
  ];

  const reviews = [
    {
      name: "Krishna Patil",
      rating: 5,
      title: "Perfect for Every Chill",
      text: "Got this for training in the cold. Padding is sturdy, keeps me warm without bulk. Feels nice on th body, and U can move effortlessly.",
      location: "Vadodara",
      timeAgo: "2 days ago",
      verified: true
    },
    {
      name: "Radha Singh",
      rating: 5,
      title: "Really worth every rupeee.",
      text: "The tee feels fantastic while running.. Outstanding quality for the price.",
      location: "Gwalior",
      timeAgo: "2 days ago",
      verified: true
    },
    {
      name: "Radha Bhasin",
      rating: 5,
      title: "Amazing!",
      text: "This tee is comfy for cycling Nice touch and amazing value.",
      location: "Patna",
      timeAgo: "3 days ago",
      verified: false
    }
  ];

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
      size: selectedSize,
      discount: discountPercentage,
      slug: product.slug,
    });

    openCart();
  };

  const handleQuickAdd = async () => {
    const fbProduct = frequentlyBoughtProduct;
    const fbDiscountPercentage = fbProduct.originalPrice
      ? Math.round(((fbProduct.originalPrice - fbProduct.price) / fbProduct.originalPrice) * 100)
      : 0;

    await addToCart({
      id: fbProduct.id,
      name: fbProduct.name,
      price: fbProduct.price,
      originalPrice: fbProduct.originalPrice || fbProduct.price,
      image: fbProduct.image,
      size: "S", // Default size
      discount: fbDiscountPercentage,
      slug: fbProduct.slug,
    });

    openCart();
  };

  return (
    <>
      <main className="min-h-screen bg-white pb-24 lg:pb-0">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto scrollbar-hide">
            <Link href="/shop" className="hover:text-black whitespace-nowrap">HOME</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link href="/shop" className="hover:text-black whitespace-nowrap">ALL PRODUCTS</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-black font-semibold uppercase truncate">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Left Side - Product Images */}
            <div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    {i === 1 && product.badge && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                        <span className="bg-black text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                          {product.badge.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <Image
                      src={product.image}
                      alt={`${product.name} - View ${i}`}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black uppercase">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black" />
                  <span className="text-base sm:text-lg font-bold">4.4</span>
                </div>
                <span className="text-sm sm:text-base text-gray-500">766 reviews</span>
              </div>

              {/* Pricing */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                  ₹ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-400 line-through">
                      ₹ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#FFD700] text-black text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500">TAXES INCLUDED.</p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{feature.icon}</span>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm">{feature.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-sm sm:text-base font-bold">SIZE {selectedSize}</span>
                  <button className="text-xs sm:text-sm underline flex items-center gap-1">
                    📏 Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-6 py-2 border-2 rounded text-sm sm:text-base font-semibold transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Options */}
              <div>
                <span className="text-sm sm:text-base font-bold block mb-2 sm:mb-3">VARIANT OPTIONS</span>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                  {[1, 2, 3, 4, 5].map((variant, index) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                        selectedVariant === index ? "border-black" : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={`Variant ${variant}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Hidden on mobile (sticky bottom bar shows instead) */}
              <div className="hidden lg:flex lg:flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  ADD TO CART
                </button>
                <button className="w-full border-2 border-black text-black font-bold py-4 rounded-lg hover:bg-black hover:text-white transition-colors">
                  BUY IT NOW
                </button>
              </div>

              {/* Frequently Bought Together */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <input type="checkbox" id="fbt" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <label htmlFor="fbt" className="font-bold text-xs sm:text-sm">
                    FREQUENTLY BOUGHT TOGETHER
                  </label>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={frequentlyBoughtProduct.image}
                      alt={frequentlyBoughtProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm mb-1">{frequentlyBoughtProduct.name}</p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg font-bold">₹ {frequentlyBoughtProduct.price.toLocaleString()}</span>
                      {frequentlyBoughtProduct.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ₹ {frequentlyBoughtProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleQuickAdd}
                    className="hidden sm:block px-4 lg:px-6 py-2 border-2 border-black rounded text-sm font-semibold hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                  >
                    QUICK ADD
                  </button>
                  <button
                    onClick={handleQuickAdd}
                    className="sm:hidden px-3 py-1.5 border-2 border-black rounded text-xs font-semibold hover:bg-black hover:text-white transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Know Your Product Section */}
          <div className="mt-8 sm:mt-12 lg:mt-16 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Know Your Product</h2>

            {/* Product Features Accordion */}
            <details className="border-t border-gray-200 py-4 sm:py-6" open>
              <summary className="font-bold text-base sm:text-lg cursor-pointer flex items-center justify-between">
                PRODUCT FEATURES
                <span className="text-xl sm:text-2xl">−</span>
              </summary>
              <div className="mt-3 sm:mt-4 space-y-2 text-gray-700">
                <p className="font-semibold text-sm sm:text-base">Wash Care:</p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                  <li>Machine wash with gentle cycle at 30°C</li>
                  <li>Wash inside out</li>
                  <li>Do not soak</li>
                  <li>Wash with mild detergent</li>
                  <li>Do not bleach</li>
                  <li>Do not tumble dry</li>
                  <li>Dry in shade</li>
                  <li>Do not iron</li>
                  <li>Do not dry clean</li>
                  <li>Wash dark colours separately</li>
                </ul>
              </div>
            </details>

            <details className="border-t border-gray-200 py-4 sm:py-6">
              <summary className="font-bold text-base sm:text-lg cursor-pointer flex items-center justify-between">
                FAQ ABOUT THE PRODUCT
                <span className="text-xl sm:text-2xl">+</span>
              </summary>
              <div className="mt-3 sm:mt-4 text-gray-700 text-xs sm:text-sm">
                <p>Frequently asked questions will appear here.</p>
              </div>
            </details>
          </div>

          {/* Customer Reviews */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">CUSTOMER REVIEWS</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Left - Rating Summary */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">4.4</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black" />
                    ))}
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-gray-300 text-gray-300" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">566 reviews</p>

                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[
                      { stars: 5, percentage: 91 },
                      { stars: 4, percentage: 6 },
                      { stars: 3, percentage: 1 },
                      { stars: 2, percentage: 0 },
                      { stars: 1, percentage: 2 }
                    ].map((rating) => (
                      <div key={rating.stars} className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm w-6 sm:w-8">{rating.stars} ⭐</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-black"
                            style={{ width: `${rating.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm w-6 sm:w-8 text-right">{rating.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Reviews List */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="flex justify-end">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 sm:px-4 py-2 text-xs sm:text-sm"
                  >
                    <option value="most-recent">Most Recent</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>

                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm sm:text-base font-bold">{review.name}</span>
                          {review.verified && (
                            <span className="text-green-600 text-xs">✓</span>
                          )}
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-black text-black" />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-bold text-base sm:text-lg mb-2">{review.title}</h4>
                      </div>
                      <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500">
                        <p className="italic">{review.location}</p>
                        <p>{review.timeAgo}</p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar - Mobile Only */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 lg:hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold line-clamp-1">{product.name}</p>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-[10px] sm:text-xs bg-[#FFD700] px-1.5 sm:px-2 py-0.5 rounded font-bold">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg whitespace-nowrap"
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-black text-white text-center py-3 sm:py-4 text-sm sm:text-base font-bold">
          FREE SHIPPING ON ORDERS ABOVE 999
        </div>

        <MovingCommunityStrip />
        <Footer />
      </main>
    </>
  );
}
