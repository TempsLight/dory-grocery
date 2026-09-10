import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function OrderPage({
  params,
}: PageProps<"/order/[id]">) {
  const { id } = await params;
  return (
    <Container className="py-10 lg:py-14">
      <OrderConfirmation id={id} />
    </Container>
  );
}
