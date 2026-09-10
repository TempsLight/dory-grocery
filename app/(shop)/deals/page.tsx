import { Suspense } from "react";
import type { Metadata } from "next";
import { TicketPercentIcon } from "lucide-react";

import { discountPercent } from "@/lib/format";
import { getDeals } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { ProductBrowser } from "@/components/shop/product-browser";
import { ProductBrowserSkeleton } from "@/components/shop/product-skeletons";

export const metadata: Metadata = {
  title: "Deals this week",
  description:
    "This week's markdowns at Dory Grocery — genuine price drops on produce, pantry staples and household essentials.",
};

export default function DealsPage() {
  const deals = getDeals();
  const topPercent = Math.max(
    ...deals.map((p) => discountPercent(p.price, p.compareAtPrice)),
  );

  return (
    <Container className="py-6 lg:py-8">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Deals" }]} />

      <header className="mt-4 flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-berry-soft text-berry-foreground sm:size-[4.5rem]">
          <TicketPercentIcon className="size-8" aria-hidden />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Deals this week
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {deals.length} items on offer, up to{" "}
            <span className="font-semibold text-berry-foreground" data-numeric>
              {topPercent}% off
            </span>
            . Prices update every Monday.
          </p>
        </div>
      </header>

      <div className="mt-7">
        <Suspense fallback={<ProductBrowserSkeleton />}>
          <ProductBrowser
            products={deals}
            emptyCtaHref="/categories"
            emptyCtaLabel="Browse full catalogue"
          />
        </Suspense>
      </div>
    </Container>
  );
}
