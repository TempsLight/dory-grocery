"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import {
  SORT_OPTIONS,
  TAG_LABELS,
  filterAndSortProducts,
  getBrandsForProducts,
  getPriceBounds,
  type ProductFilters,
  type SortValue,
} from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shop/product-grid";
import { SortSelect } from "@/components/shop/sort-select";
import { FilterControls, type Facets } from "@/components/shop/filter-controls";
import { FilterSheet } from "@/components/shop/filter-sheet";
import { EmptyState } from "@/components/common/empty-state";

const SORT_VALUES = new Set(SORT_OPTIONS.map((o) => o.value));

function parseFilters(sp: URLSearchParams): ProductFilters {
  const sortRaw = sp.get("sort");
  const sort: SortValue = (sortRaw && SORT_VALUES.has(sortRaw as SortValue)
    ? sortRaw
    : "recommended") as SortValue;
  const price = Number(sp.get("price"));
  const rating = Number(sp.get("rating"));
  return {
    sort,
    maxPrice: Number.isFinite(price) && price > 0 ? price : undefined,
    minRating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
    brands: sp.get("brands")?.split(",").filter(Boolean) ?? [],
    tags: sp.get("tags")?.split(",").filter(Boolean) ?? [],
    inStockOnly: sp.get("stock") === "1",
    onSaleOnly: sp.get("sale") === "1",
  };
}

const OWNED_KEYS = ["sort", "price", "rating", "brands", "tags", "stock", "sale"];

/** Rewrite our filter keys onto the current params, leaving others (e.g. `q`) intact. */
function serialize(f: ProductFilters, current: URLSearchParams): string {
  const p = new URLSearchParams(current.toString());
  for (const key of OWNED_KEYS) p.delete(key);
  if (f.sort !== "recommended") p.set("sort", f.sort);
  if (f.maxPrice != null) p.set("price", String(Math.round(f.maxPrice)));
  if (f.minRating != null) p.set("rating", String(f.minRating));
  if (f.brands.length) p.set("brands", f.brands.join(","));
  if (f.tags.length) p.set("tags", f.tags.join(","));
  if (f.inStockOnly) p.set("stock", "1");
  if (f.onSaleOnly) p.set("sale", "1");
  return p.toString();
}

function countActive(f: ProductFilters): number {
  return (
    f.brands.length +
    f.tags.length +
    (f.maxPrice != null ? 1 : 0) +
    (f.minRating != null ? 1 : 0) +
    (f.inStockOnly ? 1 : 0) +
    (f.onSaleOnly ? 1 : 0)
  );
}

interface Chip {
  label: string;
  clear: Partial<ProductFilters>;
}

export function ProductBrowser({
  products,
  emptyCtaHref = "/categories",
  emptyCtaLabel = "Browse all categories",
}: {
  products: Product[];
  emptyCtaHref?: string;
  emptyCtaLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = React.useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const facets: Facets = React.useMemo(() => {
    const bounds = getPriceBounds(products);
    return {
      brands: getBrandsForProducts(products),
      priceMin: Math.floor(bounds.min / 5) * 5,
      priceMax: Math.ceil(bounds.max / 5) * 5,
    };
  }, [products]);

  const results = React.useMemo(
    () => filterAndSortProducts(products, filters),
    [products, filters],
  );

  const PAGE = 24;
  const [visible, setVisible] = React.useState(PAGE);
  const filterKey = searchParams.toString();
  React.useEffect(() => {
    setVisible(PAGE);
  }, [filterKey, products]);
  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;

  const activeCount = countActive(filters);

  const apply = React.useCallback(
    (patch: Partial<ProductFilters>) => {
      const next = { ...filters, ...patch };
      const qs = serialize(next, new URLSearchParams(searchParams.toString()));
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, pathname, router, searchParams],
  );

  const clearAll = React.useCallback(() => {
    const p = new URLSearchParams(searchParams.toString());
    for (const key of OWNED_KEYS) p.delete(key);
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const chips: Chip[] = [];
  if (filters.inStockOnly)
    chips.push({ label: "In stock", clear: { inStockOnly: false } });
  if (filters.onSaleOnly) chips.push({ label: "On sale", clear: { onSaleOnly: false } });
  if (filters.maxPrice != null)
    chips.push({
      label: `Under ${formatPrice(filters.maxPrice)}`,
      clear: { maxPrice: undefined },
    });
  if (filters.minRating != null)
    chips.push({
      label: `${filters.minRating.toFixed(1)}★ & up`,
      clear: { minRating: undefined },
    });
  for (const brand of filters.brands)
    chips.push({
      label: brand,
      clear: { brands: filters.brands.filter((b) => b !== brand) },
    });
  for (const tag of filters.tags)
    chips.push({
      label: TAG_LABELS[tag] ?? tag,
      clear: { tags: filters.tags.filter((t) => t !== tag) },
    });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums" data-numeric>
            {results.length}
          </span>{" "}
          {results.length === 1 ? "item" : "items"}
          {activeCount > 0 && results.length !== products.length ? (
            <span className="tabular-nums"> of {products.length}</span>
          ) : null}
        </p>
        <div className="flex items-center gap-2">
          <FilterSheet
            className="lg:hidden"
            value={filters}
            facets={facets}
            onChange={apply}
            onClear={clearAll}
            activeCount={activeCount}
            resultCount={results.length}
          />
          <SortSelect
            value={filters.sort}
            onChange={(sort) => apply({ sort })}
          />
        </div>
      </div>

      {chips.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => apply(chip.clear)}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card py-1 pr-1.5 pl-2.5 text-xs font-medium transition-colors hover:border-brand/40 hover:bg-accent/50"
            >
              {chip.label}
              <XIcon className="size-3.5 text-muted-foreground" aria-hidden />
              <span className="sr-only">Remove filter</span>
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="rounded-md px-1 text-xs font-medium text-brand-strong hover:underline"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="mt-6 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold tracking-tight">
                Filters
              </h2>
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-medium text-brand-strong hover:underline"
                >
                  Clear all
                </button>
              ) : null}
            </div>
            <div className="mt-4">
              <FilterControls value={filters} facets={facets} onChange={apply} />
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {results.length ? (
            <>
              <ProductGrid products={shown} layout="browse" priorityCount={4} />
              {remaining > 0 ? (
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className="text-xs text-muted-foreground tabular-nums" data-numeric>
                    Showing {shown.length} of {results.length}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setVisible((v) => v + PAGE)}
                  >
                    Show {Math.min(PAGE, remaining)} more
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <EmptyState
              scene="no-results"
              title="Nothing matches those filters"
              description="Try loosening a filter or two — the price cap and brand picks are the usual culprits."
              className="mx-auto max-w-lg"
            >
              <Button variant="outline" onClick={clearAll}>
                Clear all filters
              </Button>
              <Button variant="ghost" nativeButton={false} render={<Link href={emptyCtaHref} />}>
                {emptyCtaLabel}
              </Button>
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
