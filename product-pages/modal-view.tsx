"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  QuickViewModal,
  type QuickViewProduct,
} from "@/components/quick-view-modal";
import { sampleProduct } from "@/lib/utils";

export default function QuickViewModalDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenWithLoading = () => {
    setLoading(true);
    setOpen(true);

    // Simulate API call to fetch product details
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleAddToCart = (
    product: QuickViewProduct,
    variant: string,
    size: string
  ) => {
    alert(`Added ${product.title} (${variant}, ${size}) to cart!`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Quick View Modal Component</h1>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setOpen(true)}>Open Quick View</Button>

          <Button variant="outline" onClick={handleOpenWithLoading}>
            Open With Loading State
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              Click "Open Quick View" to see the modal with product details
            </li>
            <li>
              Click "Open With Loading State" to see the loading skeleton state
            </li>
            <li>Try selecting different variants and sizes</li>
            <li>Click "Add to Cart" to see the action in effect</li>
            <li>The modal is fully responsive and works on all screen sizes</li>
          </ul>
        </div>
      </div>

      <QuickViewModal
        open={open}
        onOpenChange={setOpen}
        product={loading ? null : sampleProduct}
        loading={loading}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
