"use client";

import { useState } from "react";
import ShopHero from "@/components/shop/ShopHero";
import CategoryCircles from "@/components/shop/CategoryCircles";
import ProductGrid from "@/components/shop/ProductGrid";
import { mockProducts } from "@/components/shop/mockProducts";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import Footer from "@/components/Footer";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("bestseller");

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "bestseller"
    ? mockProducts.filter(p => p.badge === "Bestseller" || p.badge === "Trending" || p.badge === "Top pick")
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ShopHero />

      {/* Category Navigation */}
      <CategoryCircles onCategorySelect={setSelectedCategory} />

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        title={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace("-", " ")}
      />

      <MovingCommunityStrip />
      <Footer />
    </main>
  );
}
