import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon, TruckIcon } from "lucide-react";

import { photoUrl } from "@/lib/format";
import {
  categories,
  getDeals,
  getNewArrivals,
  getPopular,
  products,
} from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { ScrollRail } from "@/components/shop/scroll-rail";
import { ProductGrid } from "@/components/shop/product-grid";
import { CategoryCard, CategoryTile } from "@/components/shop/category-card";
import { PromoBanner } from "@/components/shop/promo-banner";
import { RecentlyViewedRail } from "@/components/shop/recently-viewed-rail";

export default function HomePage() {
  const popular = getPopular(10);
  const deals = getDeals().slice(0, 10);
  const fresh = getNewArrivals(8);
  const inStockCount = products.filter(
    (p) => p.availability !== "out_of_stock",
  ).length;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-brand-soft/55 to-background">
        <Container className="grid items-center gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-card px-3 py-1 text-xs font-medium text-brand-strong">
              <span className="size-1.5 rounded-full bg-honey" aria-hidden />
              Now delivering across San Isidro &amp; nearby towns
            </span>
            <h1 className="mt-4 max-w-xl font-display text-[1.75rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-[2.25rem] lg:text-[2.75rem]">
              Your neighbourhood grocery, delivered fresh today
            </h1>
            <p className="mt-4 max-w-md text-[0.95rem] text-muted-foreground">
              Produce picked this morning, pantry staples, and the little things
              you forgot — packed into one basket and brought to your door in as
              little as two hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" data-icon="inline-end" nativeButton={false} render={<Link href="/categories" />}>
                Start shopping
                <ArrowRightIcon aria-hidden />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/deals" />}>
                See this week&rsquo;s deals
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {[
                "Free delivery over ₱1,500",
                "2-hour windows you choose",
                `${inStockCount} everyday essentials in stock`,
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckIcon className="size-4 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0">
            <div className="product-frame relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lifted">
              <Image
                src={photoUrl("photo-1588964895597-cfccd6e2dbf9", { w: 1000, q: 78 })}
                alt="A paper bag of fresh groceries — leafy greens, bread and produce"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl border border-border bg-card/95 px-3.5 py-2.5 shadow-lifted backdrop-blur-sm sm:bottom-4 sm:left-4">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand-strong">
                <TruckIcon className="size-4.5" aria-hidden />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold">Arriving today</span>
                <span className="block text-xs text-muted-foreground">
                  Pick a 2-hour window at checkout
                </span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="space-y-14 py-12 lg:space-y-16 lg:py-16">
        {/* Categories */}
        <Section
          title="Shop by category"
          description="Ten aisles, one basket."
          action={{ label: "See all", href: "/categories" }}
        >
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:hidden">
            {categories.map((category) => (
              <CategoryTile key={category.slug} category={category} />
            ))}
          </div>
          <div className="hidden grid-cols-3 gap-3 sm:grid lg:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </Section>

        <PromoBanner />

        {/* Popular */}
        <Section
          title="Popular right now"
          description="What your neighbours are adding to their baskets."
        >
          <ScrollRail products={popular} ariaLabel="Popular products" />
        </Section>

        {/* Deals */}
        <Section
          title="Fresh deals this week"
          description="Real markdowns on things you actually buy."
          action={{ label: "All deals", href: "/deals" }}
        >
          <ScrollRail products={deals} ariaLabel="Discounted products" />
        </Section>

        <RecentlyViewedRail />

        {/* New */}
        {fresh.length ? (
          <Section
            title="New in store"
            description="Just landed on the shelves."
          >
            <ProductGrid products={fresh} layout="browse" />
          </Section>
        ) : null}
      </Container>
    </>
  );
}
