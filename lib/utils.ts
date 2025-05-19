import { FilterSection } from "@/components/filter-sidebar";
import { QuickViewProduct } from "@/components/quick-view-modal";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sample filter sections
export const filterSections: FilterSection[] = [
  {
    id: "category",
    title: "Category",
    type: "checkbox",
    options: [
      { id: "shirts", label: "Shirts", count: 120 },
      { id: "pants", label: "Pants", count: 85 },
      { id: "shoes", label: "Shoes", count: 65 },
      { id: "accessories", label: "Accessories", count: 40 },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    type: "checkbox",
    options: [
      { id: "nike", label: "Nike", count: 45 },
      { id: "adidas", label: "Adidas", count: 38 },
      { id: "puma", label: "Puma", count: 29 },
      { id: "reebok", label: "Reebok", count: 18 },
      { id: "newBalance", label: "New Balance", count: 12 },
    ],
  },
  {
    id: "size",
    title: "Size",
    type: "tag",
    options: [
      { id: "xs", label: "XS" },
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
      { id: "xxl", label: "XXL" },
    ],
  },
  {
    id: "color",
    title: "Color",
    type: "tag",
    options: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "red", label: "Red" },
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "yellow", label: "Yellow" },
    ],
  },
  {
    id: "price",
    title: "Price Range",
    type: "checkbox",
    options: [
      { id: "0-25", label: "Under $25", count: 18 },
      { id: "25-50", label: "$25 to $50", count: 42 },
      { id: "50-100", label: "$50 to $100", count: 85 },
      { id: "100-200", label: "$100 to $200", count: 75 },
      { id: "200+", label: "$200 & Above", count: 35 },
    ],
  },
];

// Sample product data
export const products = [
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
];

// Sample product details for quick view
export const productDetails: Record<string, QuickViewProduct> = {
  "1": {
    id: "1",
    title: "Classic White T-Shirt",
    price: 29.99,
    description:
      "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
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
    description:
      "Premium leather jacket with a classic design. Features a soft lining and multiple pockets.",
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
};

// Sample product for quick view
export const sampleProduct: QuickViewProduct = {
  id: "1",
  title: "Premium Cotton Hoodie",
  price: 79.99,
  description:
    "A premium cotton hoodie with a comfortable fit. Features a kangaroo pocket and adjustable drawstring hood. Made from 100% organic cotton for maximum comfort and durability.",
  image: "/placeholder.svg?height=600&width=600",
  variants: [
    { id: "black", name: "Black", available: true },
    { id: "gray", name: "Gray", available: true },
    { id: "navy", name: "Navy", available: true },
    { id: "green", name: "Green", available: false },
  ],
  sizes: [
    { id: "xs", name: "XS", available: true },
    { id: "s", name: "S", available: true },
    { id: "m", name: "M", available: true },
    { id: "l", name: "L", available: true },
    { id: "xl", name: "XL", available: false },
    { id: "xxl", name: "XXL", available: false },
  ],
};
