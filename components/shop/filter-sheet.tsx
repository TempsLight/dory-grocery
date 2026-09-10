"use client";

import * as React from "react";
import { SlidersHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FilterControls,
  type Facets,
} from "@/components/shop/filter-controls";
import type { ProductFilters } from "@/lib/catalog";

export function FilterSheet({
  value,
  facets,
  onChange,
  onClear,
  activeCount,
  resultCount,
  className,
}: {
  value: ProductFilters;
  facets: Facets;
  onChange: (patch: Partial<ProductFilters>) => void;
  onClear: () => void;
  activeCount: number;
  resultCount: number;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<button type="button" />}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm font-medium transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <SlidersHorizontalIcon className="size-4" aria-hidden />
        Filters
        {activeCount > 0 ? (
          <span
            className="grid size-4.5 place-items-center rounded-full bg-brand text-[0.6875rem] font-bold text-primary-foreground tabular-nums"
            aria-hidden
          >
            {activeCount}
          </span>
        ) : null}
      </SheetTrigger>

      <SheetContent side="left" className="w-[20rem] gap-0 p-0">
        <SheetHeader className="flex-row items-center justify-between border-b border-border">
          <SheetTitle className="font-display text-lg tracking-tight">
            Filters
          </SheetTitle>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-brand-strong hover:underline"
            >
              Clear all
            </button>
          ) : null}
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <FilterControls value={value} facets={facets} onChange={onChange} />
        </div>

        <div className="border-t border-border p-4">
          <Button className="w-full" size="lg" onClick={() => setOpen(false)}>
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
