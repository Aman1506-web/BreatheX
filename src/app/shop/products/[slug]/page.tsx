import { use } from "react";
import { mockProducts } from "@/components/shop/mockProducts";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  // Find product by slug
  const product = mockProducts.find(p => p.slug === resolvedParams.slug) || mockProducts[0];

  return <ProductDetailClient product={product} />;
}
