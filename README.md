# E-commerce Component Library

A collection of reusable components for building e-commerce applications. This library includes product cards, filter sidebars, and quick view modals.

## Components

### Product Card

A responsive product card component that displays product information and provides interaction options.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| id | string | Unique identifier for the product |
| title | string | Product title |
| price | number | Product price |
| image | string | URL to the product image |
| tag | "new" \| "out-of-stock" \| null | Optional tag to display on the product |
| onQuickView | (id: string) => void | Callback when quick view button is clicked |
| onAddToCart | (id: string) => void | Callback when add to cart button is clicked |

#### Usage

\`\`\`tsx
import { ProductCard } from "@/components/product-card";

export default function ProductGrid() {
  return (
    <ProductCard
      id="1"
      title="Product Title"
      price={29.99}
      image="/path/to/image.jpg"
      tag="new"
      onQuickView={(id) => console.log(`Quick view: ${id}`)}
      onAddToCart={(id) => console.log(`Add to cart: ${id}`)}
    />
  );
}
\`\`\`

### Filter Sidebar

A collapsible sidebar with checkbox and tag filters for product filtering.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| sections | FilterSection[] | Array of filter sections |
| className | string | Optional additional CSS classes |
| onApplyFilters | (selectedFilters: Record<string, string[]>) => void | Callback when filters are applied |

#### Types

\`\`\`tsx
interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  type: "checkbox" | "tag";
  options: FilterOption[];
}
\`\`\`

#### Usage

\`\`\`tsx
import { FilterSidebar } from "@/components/filter-sidebar";

const filterSections = [
  {
    id: "category",
    title: "Category",
    type: "checkbox",
    options: [
      { id: "shirts", label: "Shirts", count: 120 },
      { id: "pants", label: "Pants", count: 85 },
    ],
  },
  {
    id: "size",
    title: "Size",
    type: "tag",
    options: [
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
    ],
  },
];

export default function ProductPage() {
  const handleApplyFilters = (selectedFilters) => {
    console.log(selectedFilters);
  };

  return (
    <FilterSidebar
      sections={filterSections}
      onApplyFilters={handleApplyFilters}
    />
  );
}
\`\`\`

### Quick View Modal

A modal that displays product details and allows selecting variants and adding to cart.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| open | boolean | Whether the modal is open |
| onOpenChange | (open: boolean) => void | Callback when modal open state changes |
| product | QuickViewProduct \| null | Product data to display |
| loading | boolean | Whether the product data is loading |
| onAddToCart | (product: QuickViewProduct, variant: string, size: string) => void | Callback when add to cart button is clicked |

#### Types

\`\`\`tsx
interface ProductVariant {
  id: string;
  name: string;
  available: boolean;
}

interface ProductSize {
  id: string;
  name: string;
  available: boolean;
}

interface QuickViewProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  variants: ProductVariant[];
  sizes: ProductSize[];
}
\`\`\`

#### Usage

\`\`\`tsx
import { useState } from "react";
import { QuickViewModal } from "@/components/quick-view-modal";

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const handleQuickView = async (id) => {
    // Fetch product data
    const data = await fetchProduct(id);
    setProduct(data);
    setOpen(true);
  };

  const handleAddToCart = (product, variant, size) => {
    console.log(`Added ${product.title} (${variant}, ${size}) to cart`);
  };

  return (
    <>
      <button onClick={() => handleQuickView("1")}>Quick View</button>
      
      <QuickViewModal
        open={open}
        onOpenChange={setOpen}
        product={product}
        loading={!product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
\`\`\`

## Demo Pages

The library includes demo pages for each component:

- `/component-demo/product-card` - Demo of the ProductCard component
- `/component-demo/filter-sidebar` - Demo of the FilterSidebar component
- `/component-demo/quick-view-modal` - Demo of the QuickViewModal component

## Features

- Responsive design using Tailwind CSS
- Accessible components with proper ARIA attributes
- Loading states and error handling
- Hover effects and animations
- Fallback images for broken image URLs

## Best Practices

- Use the `onQuickView` and `onAddToCart` callbacks to implement your business logic
- Implement proper data fetching in the callbacks
- Use skeleton loaders during data loading for better UX
- Ensure all images have proper alt text for accessibility
- Test the components on different screen sizes to ensure responsiveness
