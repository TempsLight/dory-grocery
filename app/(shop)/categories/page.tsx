import { Suspense } from "react";
import type { Metadata } from "next";

import { categories, products } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { Section } from "@/components/common/section";
import { CategoryCard } from "@/components/shop/category-card";
import { ProductBrowser } from "@/components/shop/product-browser";
import { ProductBrowserSkeleton } from "@/components/shop/product-skeletons";

export const metadata: Metadata = {
  title: "All groceries",
  description:
    "Browse every aisle at Dory Grocery — fresh produce, meat and seafood, dairy, bakery, pantry and household essentials delivered across San Isidro, Isabela.",
};

export default function CategoriesPage() {
  return (
    <Container className="py-6 lg:py-8">
      <Crumbs
        items={[{ label: "Home", href: "/" }, { label: "All groceries" }]}
      />

      <header className="mt-4 max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          All groceries
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Ten aisles, {products.length} everyday items. Start with a category or
          search the full store below.
        </p>
      </header>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <Section
        title="Everything in the store"
        className="mt-14"
        headingClassName="text-xl sm:text-2xl"
      >
        <Suspense fallback={<ProductBrowserSkeleton />}>
          <ProductBrowser products={products} />
        </Suspense>
      </Section>
    </Container>
  );
}
