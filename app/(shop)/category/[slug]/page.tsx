import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { CategoryArt } from "@/components/art/category-art";
import { ProductBrowser } from "@/components/shop/product-browser";
import { ProductBrowserSkeleton } from "@/components/shop/product-skeletons";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const count = getProductsByCategory(slug).length;
  return {
    title: category.name,
    description: `${category.name} at Dory Grocery — ${category.tagline}. ${count} items, delivered fresh across San Isidro and nearby Isabela towns.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

  return (
    <Container className="py-6 lg:py-8">
      <Crumbs
        items={[
          { label: "Home", href: "/" },
          { label: "All groceries", href: "/categories" },
          { label: category.name },
        ]}
      />

      <header className="mt-4 flex items-center gap-4">
        <span
          className="grid size-16 shrink-0 place-items-center rounded-2xl border border-border sm:size-[4.5rem]"
          style={{ backgroundColor: category.tint, color: category.ink }}
          aria-hidden
        >
          <CategoryArt name={category.illustration} className="size-11" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {category.tagline}
          </p>
        </div>
      </header>

      <div className="mt-7">
        <Suspense fallback={<ProductBrowserSkeleton />}>
          <ProductBrowser products={items} />
        </Suspense>
      </div>
    </Container>
  );
}
