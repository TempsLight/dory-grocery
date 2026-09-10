import Link from "next/link";
import { LifeBuoyIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { DoryWordmark, DoryMark } from "@/components/art/dory-mark";
import { SearchField } from "@/components/layout/search-field";
import { CartIndicator } from "@/components/layout/cart-indicator";
import { DeliveryPill } from "@/components/layout/delivery-pill";
import { CategoryNav } from "@/components/layout/category-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function SiteHeader() {
  return (
    <header className="z-40 border-b border-border">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <Container className="flex h-14 items-center gap-2 lg:h-16 lg:gap-4">
          <MobileMenu className="lg:hidden" />

          <Link
            href="/"
            className="hidden shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex"
          >
            <DoryWordmark />
          </Link>
          <Link
            href="/"
            aria-label="Dory Grocery — home"
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <DoryMark className="size-7 text-brand" />
          </Link>

          <DeliveryPill tone="plain" className="hidden shrink-0 xl:flex" />

          <SearchField
            size="sm"
            className="flex-1 lg:mx-1 lg:max-w-xl"
          />

          <Link
            href="/help"
            className="hidden shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:inline-flex"
          >
            <LifeBuoyIcon className="size-4" aria-hidden />
            Help
          </Link>

          <CartIndicator className="shrink-0" />
        </Container>

        <div className="border-t border-border/50 bg-brand-soft/35 lg:hidden">
          <Container className="py-1">
            <DeliveryPill tone="bar" />
          </Container>
        </div>
      </div>

      <div className="border-b border-border bg-background lg:sticky lg:top-16 lg:z-30">
        <Container>
          <CategoryNav />
        </Container>
      </div>
    </header>
  );
}
