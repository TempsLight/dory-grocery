import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SearchIcon } from "lucide-react";

import { searchProducts, categories } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/shop/category-card";
import { ProductBrowser } from "@/components/shop/product-browser";
import { ProductBrowserSkeleton } from "@/components/shop/product-skeletons";
import { EmptyState } from "@/components/common/empty-state";

const POPULAR = ["Milk", "Eggs", "Bananas", "Rice", "Chicken", "Coffee", "Sourdough", "Ice cream"];

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  return {
    title: q ? `“${q}”` : "Search",
    robots: { index: false },
  };
}

function PopularSearches() {
  return (
    <div className="flex flex-wrap gap-2">
      {POPULAR.map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className="rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-brand/40 hover:bg-accent/50"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const raw = typeof sp.q === "string" ? sp.q : Array.isArray(sp.q) ? sp.q[0] : "";
  const query = (raw ?? "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <Container className="py-6 lg:py-8">
      <Crumbs
        items={[
          { label: "Home", href: "/" },
          { label: query ? `“${query}”` : "Search" },
        ]}
      />

      {!query ? (
        <div className="mt-6 space-y-10">
          <div className="max-w-lg">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Search Dory
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Look up a product, brand or aisle from the bar above — or start
              with one of these.
            </p>
            <div className="mt-4">
              <PopularSearches />
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Or browse a category
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="mt-4">
            <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Results for{" "}
              <span className="text-brand-strong">&ldquo;{query}&rdquo;</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground tabular-nums" data-numeric>
                {results.length}
              </span>{" "}
              {results.length === 1 ? "item" : "items"} found
            </p>
          </header>

          <div className="mt-6">
            {results.length ? (
              <Suspense fallback={<ProductBrowserSkeleton />}>
                <ProductBrowser products={results} />
              </Suspense>
            ) : (
              <EmptyState
                scene="no-results"
                title={`No matches for “${query}”`}
                description="Check the spelling, or try a broader word like “milk”, “rice” or “soap”."
                className="mx-auto max-w-lg"
              >
                <Button nativeButton={false} render={<Link href="/categories" />}>
                  <SearchIcon aria-hidden />
                  Browse all categories
                </Button>
              </EmptyState>
            )}
            {!results.length ? (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Popular searches
                </p>
                <PopularSearches />
              </div>
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
}
