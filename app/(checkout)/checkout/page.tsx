import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-8 lg:py-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A few details and you&rsquo;re done — nothing is charged until you place
        the order.
      </p>
      <div className="mt-8">
        <CheckoutView />
      </div>
    </Container>
  );
}
