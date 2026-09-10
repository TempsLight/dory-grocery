import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your basket",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <Container className="py-6 lg:py-8">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Basket" }]} />
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Your basket
      </h1>
      <div className="mt-6">
        <CartView />
      </div>
    </Container>
  );
}
