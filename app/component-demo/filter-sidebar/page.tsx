"use client"

import { useState } from "react"

import { FilterSidebar, type FilterSection } from "@/components/filter-sidebar"

// Sample filter sections
const filterSections: FilterSection[] = [
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
]

export default function FilterSidebarDemo() {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({})

  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    setAppliedFilters(selectedFilters)
    console.log("Applied filters:", selectedFilters)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Filter Sidebar Component</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 border rounded-lg">
          <FilterSidebar sections={filterSections} onApplyFilters={handleApplyFilters} />
        </div>

        <div className="flex-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Filters</h2>

            {Object.keys(appliedFilters).length === 0 ||
            Object.values(appliedFilters).every((filters) => filters.length === 0) ? (
              <p className="text-muted-foreground">No filters applied</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(appliedFilters).map(([sectionId, selectedOptions]) => {
                  if (selectedOptions.length === 0) return null

                  const section = filterSections.find((s) => s.id === sectionId)
                  if (!section) return null

                  return (
                    <div key={sectionId}>
                      <h3 className="font-medium">{section.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedOptions.map((optionId) => {
                          const option = section.options.find((o) => o.id === optionId)
                          return option ? (
                            <span key={optionId} className="bg-muted text-sm px-2 py-1 rounded">
                              {option.label}
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
