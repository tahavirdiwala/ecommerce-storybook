"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  tag?: "new" | "out-of-stock" | null;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({
  id,
  title,
  price,
  image,
  tag = null,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="group relative rounded-lg border bg-background p-3 transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={imageError ? "/placeholder.svg?height=400&width=400" : image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onError={handleImageError}
        />

        {tag && (
          <Badge
            className={cn(
              "absolute left-2 top-2 z-10",
              tag === "out-of-stock" ? "bg-destructive" : "bg-primary"
            )}
          >
            {tag === "new" ? "New" : "Out of Stock"}
          </Badge>
        )}

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onQuickView?.(id)}
            disabled={tag === "out-of-stock"}
          >
            <Eye className="mr-2 h-4 w-4" />
            Quick View
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-medium leading-tight">{title}</h3>
        <p className="text-sm font-semibold">${price.toFixed(2)}</p>
      </div>

      <Button
        className="mt-3 w-full"
        size="sm"
        disabled={tag === "out-of-stock"}
        onClick={() => onAddToCart?.(id)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
