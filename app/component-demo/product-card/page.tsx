"use client"

import { useState } from "react"

import { ProductCard } from "@/components/product-card"
import { QuickViewModal, type QuickViewProduct } from "@/components/quick-view-modal"

// Sample product data
const products = [
  {
    id: "1",
    title: "Classic White T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    tag: "new" as const,
  },
  {
    id: "2",
    title: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    tag: null,
  },
  {
    id: "3",
    title: "Leather Jacket",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    tag: "out-of-stock" as const,
  },
  {
    id: "4",
    title: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    tag: null,
  },
]

// Sample product details for quick view
const productDetails: Record<string, QuickViewProduct> = {
  "1": {
    id: "1",
    title: "Classic White T-Shirt",
    price: 29.99,
    description: "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    image: "/placeholder.svg?height=600&width=600",
    variants: [
      { id: "white", name: "White", available: true },
      { id: "black", name: "Black", available: true },
      { id: "gray", name: "Gray", available: false },
    ],
    sizes: [
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: false },
    ],
  },
  "2": {
    id: "2",
    title: "Slim Fit Jeans",
    price: 59.99,
    description:
      "Modern slim fit jeans with a comfortable stretch. These jeans offer both style and comfort for all-day wear.",
    image: "/placeholder.svg?height=600&width=600",
    variants: [
      { id: "blue", name: "Blue", available: true },
      { id: "black", name: "Black", available: true },
      { id: "gray", name: "Gray", available: true },
    ],
    sizes: [
      { id: "30", name: "30", available: true },
      { id: "32", name: "32", available: true },
      { id: "34", name: "34", available: true },
      { id: "36", name: "36", available: false },
    ],
  },
  "3": {
    id: "3",
    title: "Leather Jacket",
    price: 199.99,
    description: "Premium leather jacket with a classic design. Features a soft lining and multiple pockets.",
    image: "/placeholder.svg?height=600&width=600",
    variants: [
      { id: "brown", name: "Brown", available: true },
      { id: "black", name: "Black", available: false },
    ],
    sizes: [
      { id: "s", name: "S", available: false },
      { id: "m", name: "M", available: false },
      { id: "l", name: "L", available: false },
      { id: "xl", name: "XL", available: false },
    ],
  },
  "4": {
    id: "4",
    title: "Running Shoes",
    price: 89.99,
    description:
      "Lightweight running shoes with responsive cushioning. Designed for comfort and performance on any terrain.",
    image: "/placeholder.svg?height=600&width=600",
    variants: [
      { id: "blue", name: "Blue", available: true },
      { id: "black", name: "Black", available: true },
      { id: "red", name: "Red", available: true },
    ],
    sizes: [
      { id: "8", name: "8", available: true },
      { id: "9", name: "9", available: true },
      { id: "10", name: "10", available: true },
      { id: "11", name: "11", available: true },
    ],
  },
}

export default function ProductCardDemo() {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null)
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<string[]>([])

  const handleQuickView = (id: string) => {
    setLoading(true)
    setQuickViewOpen(true)

    // Simulate API call to fetch product details
    setTimeout(() => {
      setSelectedProduct(productDetails[id])
      setLoading(false)
    }, 1000)
  }

  const handleAddToCart = (id: string) => {
    setCartItems((prev) => [...prev, id])
    alert(`Added product ${id} to cart!`)
  }

  const handleAddToCartFromQuickView = (product: QuickViewProduct, variant: string, size: string) => {
    setCartItems((prev) => [...prev, product.id])
    alert(`Added ${product.title} (${variant}, ${size}) to cart!`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Product Card Component</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            tag={product.tag}
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
  )
}
