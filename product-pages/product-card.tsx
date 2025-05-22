"use client";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  QuickViewModal,
  type QuickViewProduct,
} from "@/components/quick-view-modal";
import { productDetails, products } from "@/lib/utils";

export default function ProductCardDemo() {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<QuickViewProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handleQuickView = (id: string) => {
    setLoading(true);
    setQuickViewOpen(true);

    // Simulate API call to fetch product details
    setTimeout(() => {
      setSelectedProduct(productDetails[id]);
      setLoading(false);
    }, 1000);
  };

  const handleAddToCart = (id: string) => {
    setCartItems((prev) => [...prev, id]);
    alert(`Added product ${id} to cart!`);
  };

  const handleAddToCartFromQuickView = (
    product: QuickViewProduct,
    variant: string,
    size: string
  ) => {
    setCartItems((prev) => [...prev, product.id]);
    alert(`Added ${product.title} (${variant}, ${size}) to cart!`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Product Card Component</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <QuickViewModal
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        product={selectedProduct}
        loading={loading}
        onAddToCart={handleAddToCartFromQuickView}
      />
    </div>
  );
}
