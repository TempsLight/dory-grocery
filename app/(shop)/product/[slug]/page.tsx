import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckIcon,
  TruckIcon,
  RotateCcwIcon,
  SnowflakeIcon,
} from "lucide-react";

import { photoUrl, formatCount } from "@/lib/format";
import {
  getCategory,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/catalog";
import { getReviewHighlights } from "@/lib/reviews";
import { StarIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { Section } from "@/components/common/section";
import { ScrollRail } from "@/components/shop/scroll-rail";
import { ProductGallery } from "@/components/shop/product-gallery";
import { Price, SavingsNote } from "@/components/shop/price";
import { RatingStars } from "@/components/shop/rating-stars";
import { ProductTags, AvailabilityNote } from "@/components/shop/product-meta";
import { AddToCartPanel } from "@/components/shop/add-to-cart";
import { RecordView } from "@/components/shop/record-view";
import { RecentlyViewedRail } from "@/components/shop/recently-viewed-rail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} · ${product.size}`,
    description: product.short,
    openGraph: product.photoId
      ? { images: [photoUrl(product.photoId, { w: 1200, q: 80 })] }
      : undefined,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 10);
  const reviews = getReviewHighlights(product, 3);
  const soldOut = product.availability === "out_of_stock";

  return (
    <Container className="py-6 lg:py-8">
      <RecordView productId={product.id} />

      <Crumbs
        items={[
          { label: "Home", href: "/" },
          category
            ? { label: category.name, href: `/category/${category.slug}` }
            : { label: "Groceries", href: "/categories" },
          { label: product.name },
        ]}
      />

      <div className="mt-5 flex max-w-5xl flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="lg:w-[22rem] lg:shrink-0">
          <ProductGallery product={product} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {product.brand}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground" data-numeric>
            {product.size}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
            <a
              href="#reviews"
              className="text-sm text-brand-strong underline-offset-2 hover:underline"
            >
              Read reviews
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            <SavingsNote
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />
          </div>

          {product.availability !== "in_stock" ? (
            <AvailabilityNote
              availability={product.availability}
              className="mt-3"
            />
          ) : null}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.short}
          </p>

          <div className="mt-6">
            <AddToCartPanel product={product} />
          </div>

          {!soldOut ? (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-paper/70 p-3.5">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-strong">
                <TruckIcon className="size-4.5" aria-hidden />
              </span>
              <div className="text-sm">
                <p className="font-medium">Get it today</p>
                <p className="text-muted-foreground">
                  Order within the next few hours and choose a 2-hour delivery
                  window at checkout. Free over ₱1,500.
                </p>
              </div>
            </div>
          ) : null}

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <RotateCcwIcon className="size-4 shrink-0 text-brand" aria-hidden />
              Not fresh on arrival? We refund it, no photos needed.
            </li>
            {product.tags.includes("chilled") || product.tags.includes("frozen") ? (
              <li className="flex items-center gap-2">
                <SnowflakeIcon className="size-4 shrink-0 text-brand" aria-hidden />
                Packed with ice liners and delivered cold.
              </li>
            ) : null}
          </ul>

          {product.tags.length ? (
            <ProductTags tags={product.tags} limit={5} className="mt-5" />
          ) : null}
        </div>
      </div>

      {/* About */}
      <div className="mt-14 grid max-w-5xl gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            About this item
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <ul className="mt-5 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm">
                <CheckIcon
                  className="mt-0.5 size-4 shrink-0 text-brand"
                  aria-hidden
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="h-fit rounded-xl border border-border bg-card p-4 text-sm">
          <h3 className="font-display text-sm font-semibold tracking-tight">
            At a glance
          </h3>
          <div className="mt-3 space-y-2.5">
            {[
              ["Brand", product.brand],
              ["Size", product.size],
              ["Category", category?.name ?? "—"],
              ["Aisle", product.aisle],
              [
                "Availability",
                product.availability === "in_stock"
                  ? "In stock"
                  : product.availability === "low_stock"
                    ? "Low stock"
                    : "Out of stock",
              ],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </div>
        </dl>
      </div>

      {/* Reviews */}
      <section
        id="reviews"
        className="mt-12 max-w-3xl scroll-mt-28"
        aria-labelledby="reviews-h"
      >
        <h2 id="reviews-h" className="font-display text-xl font-semibold tracking-tight">
          Customer reviews
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
          <span className="font-display text-3xl font-semibold tracking-tight tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          <div>
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
              showCount={false}
            />
            <p className="mt-0.5 text-sm text-muted-foreground">
              {formatCount(product.reviewCount)} verified purchases
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-4">
          {reviews.map((r, i) => (
            <li key={i} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground"
                  aria-hidden
                >
                  {r.initial}
                </span>
                <span className="text-sm font-medium">{r.author}</span>
                <span
                  className="inline-flex items-center gap-0.5"
                  aria-label={`${r.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon
                      key={s}
                      className={
                        s < r.rating ? "size-3 text-honey" : "size-3 text-border"
                      }
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden
                    />
                  ))}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {r.when}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {related.length ? (
        <Section
          title="You might also need"
          className="mt-14"
          headingClassName="text-xl sm:text-2xl"
        >
          <ScrollRail products={related} ariaLabel="Related products" />
        </Section>
      ) : null}

      <div className="mt-14">
        <Suspense fallback={null}>
          <RecentlyViewedRail excludeId={product.id} title="Recently viewed" />
        </Suspense>
      </div>
    </Container>
  );
}
