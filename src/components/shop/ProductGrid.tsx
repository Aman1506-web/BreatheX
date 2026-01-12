"use client";

import ProductCard, { Product } from "./ProductCard";
import { Element } from "react-scroll";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <Element name="products-section">
      <section className="w-full bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 lg:mb-8">{title}</h2>
          )}

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {/* {products.length >= 10 && (
          <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-black text-black text-sm sm:text-base font-semibold rounded-full hover:bg-black hover:text-white transition-colors">
              LOAD MORE
            </button>
          </div>
        )} */}
        </div>
      </section>
    </Element>
  );
}
