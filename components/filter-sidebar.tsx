"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  type: "checkbox" | "tag";
  options: FilterOption[];
}

export interface FilterSidebarProps {
  sections: FilterSection[];
  className?: string;
  onApplyFilters?: (selectedFilters: Record<string, string[]>) => void;
}

export function FilterSidebar({
  sections,
  className,
  onApplyFilters,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {}));

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >(sections.reduce((acc, section) => ({ ...acc, [section.id]: [] }), {}));

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleFilter = (sectionId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const sectionFilters = [...prev[sectionId]];
      const optionIndex = sectionFilters.indexOf(optionId);

      if (optionIndex === -1) {
        sectionFilters.push(optionId);
      } else {
        sectionFilters.splice(optionIndex, 1);
      }

      return {
        ...prev,
        [sectionId]: sectionFilters,
      };
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = sections.reduce(
      (acc: Record<string, string[]>, section) => {
        acc[section.id] = [];
        return acc;
      },
      {}
    );
    setSelectedFilters(clearedFilters);
    onApplyFilters?.(clearedFilters);
  };

  const applyFilters = () => {
    onApplyFilters?.(selectedFilters);
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (filters) => filters.length > 0
  );

  return (
    <div className={cn("w-full max-w-xs flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <button
              className="flex w-full items-center justify-between font-medium"
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              {expandedSections[section.id] ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {expandedSections[section.id] && (
              <div className="space-y-2 pt-2">
                {section.type === "checkbox" ? (
                  <div className="space-y-2">
                    {section.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`${section.id}-${option.id}`}
                          checked={selectedFilters[section.id].includes(
                            option.id
                          )}
                          onCheckedChange={() =>
                            toggleFilter(section.id, option.id)
                          }
                        />
                        <label
                          htmlFor={`${section.id}-${option.id}`}
                          className="text-sm flex-1 cursor-pointer"
                        >
                          {option.label}
                        </label>
                        {option.count !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            ({option.count})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {section.options.map((option) => {
                      const isSelected = selectedFilters[section.id].includes(
                        option.id
                      );
                      return (
                        <Badge
                          key={option.id}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter(section.id, option.id)}
                        >
                          {option.label}
                          {isSelected && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <Separator />
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
