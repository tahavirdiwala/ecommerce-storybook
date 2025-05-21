"use client";
import { useState } from "react";
import { FilterSidebar } from "@/components/filter-sidebar";
import { filterSections } from "@/lib/utils";

export default function FilterSidebarDemo() {
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});

  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    setAppliedFilters(selectedFilters);
    console.log("Applied filters:", selectedFilters);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Filter Sidebar Component</h1>

      <div className="flex gap-2">
        <div className="border rounded-lg">
          <FilterSidebar
            sections={filterSections}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        <div className="flex-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Filters</h2>

            {Object.keys(appliedFilters).length === 0 ||
            Object.values(appliedFilters).every(
              (filters) => filters.length === 0
            ) ? (
              <p className="text-muted-foreground">No filters applied</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(appliedFilters).map(
                  ([sectionId, selectedOptions]) => {
                    if (selectedOptions.length === 0) return null;

                    const section = filterSections.find(
                      (s) => s.id === sectionId
                    );
                    if (!section) return null;

                    return (
                      <div key={sectionId}>
                        <h3 className="font-medium">{section.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedOptions.map((optionId) => {
                            const option = section.options.find(
                              (o) => o.id === optionId
                            );
                            return option ? (
                              <span
                                key={optionId}
                                className="bg-muted text-sm px-2 py-1 rounded"
                              >
                                {option.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
