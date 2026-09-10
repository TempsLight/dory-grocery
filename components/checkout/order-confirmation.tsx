"use client";

import * as React from "react";
import Link from "next/link";
import {
  ClockIcon,
  MapPinIcon,
  CheckIcon,
  CopyIcon,
  PackageIcon,
  BanknoteIcon,
  CreditCardIcon,
  WalletIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { getOrder } from "@/lib/orders";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "@/components/cart/order-summary";
import { OrderItemsList } from "@/components/cart/order-items-list";
import { SceneArt } from "@/components/art/scene-art";
import { EmptyState } from "@/components/common/empty-state";

const PAYMENT_LABEL: Record<Order["details"]["payment"], { label: string; icon: typeof BanknoteIcon }> = {
  cod: { label: "Cash on delivery", icon: BanknoteIcon },
  card: { label: "Card ending ••••", icon: CreditCardIcon },
  ewallet: { label: "E-wallet (GCash / Maya)", icon: WalletIcon },
};

export function OrderConfirmation({ id }: { id: string }) {
  const [order, setOrder] = React.useState<Order | null>(null);
  const [ready, setReady] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setOrder(getOrder(id));
    setReady(true);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!order) {
    return (
      <EmptyState
        scene="not-found"
        title="We couldn’t find that order"
        description="Order details are saved on the device you ordered from. If you switched devices or cleared your browser, it won’t show here."
        className="mx-auto max-w-lg"
      >
        <Button nativeButton={false} render={<Link href="/" />}>Back to shopping</Button>
      </EmptyState>
    );
  }

  const firstName = order.details.fullName.split(" ")[0];
  const payment = PAYMENT_LABEL[order.details.payment];

  async function copyId() {
    try {
      await navigator.clipboard.writeText(order!.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center text-center">
        <SceneArt name="order-confirmed" className="w-44" />
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Thanks, {firstName} — your order&rsquo;s in
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          We&rsquo;re packing it now. You&rsquo;ll get a text at{" "}
          <span className="font-medium text-foreground">
            {order.details.phone}
          </span>{" "}
          when the rider&rsquo;s on the way.
        </p>

        <button
          type="button"
          onClick={copyId}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50"
        >
          <span className="font-mono tracking-wide">{order.id}</span>
          {copied ? (
            <CheckIcon className="size-4 text-brand" aria-hidden />
          ) : (
            <CopyIcon className="size-4 text-muted-foreground" aria-hidden />
          )}
          <span className="sr-only">Copy order number</span>
        </button>
      </div>

      {/* ETA + address */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <ClockIcon className="size-3.5" aria-hidden />
            Estimated delivery
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold tracking-tight">
            {order.etaLabel}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {order.totals.deliveryLabel === "Free"
              ? "Free standard delivery"
              : order.details.speed === "express"
                ? "Express delivery"
                : "Standard delivery"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <MapPinIcon className="size-3.5" aria-hidden />
            Delivering to
          </p>
          <p className="mt-1.5 text-sm font-medium">{order.details.fullName}</p>
          <p className="text-xs text-muted-foreground">
            {order.details.street}, {order.details.barangay},{" "}
            {order.details.city}
          </p>
          {order.details.instructions ? (
            <p className="mt-1 text-xs text-muted-foreground italic">
              “{order.details.instructions}”
            </p>
          ) : null}
        </div>
      </div>

      {/* Items + totals */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <PackageIcon className="size-4 text-brand" aria-hidden />
          {order.totals.itemCount}{" "}
          {order.totals.itemCount === 1 ? "item" : "items"}
        </h2>
        <OrderItemsList
          className="mt-2"
          items={order.lines.map((l) => ({
            productId: l.productId,
            name: l.name,
            brand: l.brand,
            size: l.size,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
            photoId: l.photoId,
            illustration: l.illustration,
          }))}
        />
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-sm">
          <payment.icon className="size-4 text-muted-foreground" aria-hidden />
          <span className="text-muted-foreground">Paying with</span>
          <span className="font-medium">{payment.label}</span>
        </div>
      </div>

      <OrderSummary
        totals={order.totals}
        title="What you paid"
        className="mt-4"
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          nativeButton={false} render={<Link href="/" />}
        >
          Continue shopping
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          nativeButton={false} render={<Link href="/help" />}
        >
          Track this order
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Need to change something? Contact us within 15 minutes and we can still
        catch it before it leaves the store.
      </p>
    </div>
  );
}
