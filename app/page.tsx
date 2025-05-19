import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">E-commerce Component Library</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of reusable components for building e-commerce applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Card</CardTitle>
            <CardDescription>A responsive product card with image, title, price, and tag</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Features hover effects, responsive layout, fallback image, and quick view functionality.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/component-demo/product-card">View Demo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filter Sidebar</CardTitle>
            <CardDescription>A collapsible sidebar with checkbox and tag filters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Includes collapsible sections, checkbox and tag-style filters, and "Clear All" and "Apply" functionality.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/component-demo/filter-sidebar">View Demo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick View Modal</CardTitle>
            <CardDescription>A modal that shows product details and variants</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Displays product image, variant selector, price, and add to cart button. Handles loading state and
              responsive behavior.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/component-demo/quick-view-modal">View Demo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
