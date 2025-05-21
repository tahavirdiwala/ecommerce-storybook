"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductVariant {
  id: string;
  name: string;
  available: boolean;
}

export interface ProductSize {
  id: string;
  name: string;
  available: boolean;
}

export interface QuickViewProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  variants: ProductVariant[];
  sizes: ProductSize[];
}

export interface QuickViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: QuickViewProduct | null;
  loading?: boolean;
  onAddToCart?: (
    product: QuickViewProduct,
    variant: string,
    size: string
  ) => void;
}

export function QuickViewModal({
  open,
  onOpenChange,
  product,
  loading = false,
  onAddToCart,
}: QuickViewModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (product && selectedVariant && selectedSize) {
      onAddToCart?.(product, selectedVariant, selectedSize);
      onOpenChange(false);
    }
  };

  // Reset selections when modal opens with a new product
  if (product && open && (!selectedVariant || !selectedSize)) {
    const firstAvailableVariant = product.variants.find((v) => v.available);
    const firstAvailableSize = product.sizes.find((s) => s.available);

    if (firstAvailableVariant && !selectedVariant) {
      setSelectedVariant(firstAvailableVariant.id);
    }

    if (firstAvailableSize && !selectedSize) {
      setSelectedSize(firstAvailableSize.id);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {loading || !product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-8 w-16" />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-10" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square bg-muted">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              )}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className={cn("object-cover", !imageLoaded && "opacity-0")}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            </div>

            <div className="p-6 space-y-4">
              <DialogTitle className="text-xl font-semibold">
                {product.title}
              </DialogTitle>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="space-y-3">
                <Label htmlFor="variant">Color</Label>
                <RadioGroup
                  id="variant"
                  value={selectedVariant}
                  onValueChange={setSelectedVariant}
                  className="flex flex-wrap gap-2"
                >
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={variant.id}
                        id={`variant-${variant.id}`}
                        disabled={!variant.available}
                      />
                      <Label
                        htmlFor={`variant-${variant.id}`}
                        className={cn(
                          !variant.available && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {variant.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="size">Size</Label>
                <RadioGroup
                  id="size"
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={size.id}
                        id={`size-${size.id}`}
                        disabled={!size.available}
                      />
                      <Label
                        htmlFor={`size-${size.id}`}
                        className={cn(
                          !size.available && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {size.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedVariant || !selectedSize}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
