"use client";

import { useRecentlyViewed } from "@/components/providers/recently-viewed-provider";
import { getProductById } from "@/lib/catalog";
import { Section } from "@/components/common/section";
import { ScrollRail } from "@/components/shop/scroll-rail";

export function RecentlyViewedRail({
  excludeId,
  title = "Recently viewed",
}: {
  excludeId?: string;
  title?: string;
}) {
  const { hydrated, ids } = useRecentlyViewed();

  if (!hydrated) return null;

  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length < 2) return null;

  return (
    <Section title={title}>
      <ScrollRail products={products} ariaLabel={title} />
    </Section>
  );
}
