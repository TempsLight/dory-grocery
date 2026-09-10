"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ShieldCheckIcon } from "lucide-react";

import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/components/providers/cart-provider";
import { notify } from "@/lib/notify";
import { getPopular } from "@/lib/catalog";

import { CartLine } from "@/components/cart/cart-line";
import { OrderSummary } from "@/components/cart/order-summary";
import { PromoInput } from "@/components/cart/promo-input";
import { FreeDeliveryMeter } from "@/components/cart/free-delivery-meter";
import { DeliverySpeedPicker } from "@/components/cart/delivery-speed";
import { EmptyState } from "@/components/common/empty-state";
import { Section } from "@/components/common/section";
import { ScrollRail } from "@/components/shop/scroll-rail";
import { ProductGridSkeleton } from "@/components/shop/product-skeletons";

export function CartView() {
  const { hydrated, lines, totals, subtotal, clear } = useCart();
  const [confirmClear, setConfirmClear] = React.useState(false);

  if (!hydrated) {
    return (
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
        <div className="space-y-4">
          <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
          <ProductGridSkeleton count={3} className="!grid-cols-1" />
        </div>
        <div className="mt-6 h-64 animate-pulse rounded-2xl bg-muted lg:mt-0" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="space-y-14">
        <EmptyState
          scene="empty-cart"
          title="Your basket is empty"
          description="Nothing in here yet. Add a few staples — milk, eggs, rice — and they’ll show up ready for checkout."
          size="lg"
          className="mx-auto max-w-xl"
        >
          <Button size="lg" nativeButton={false} render={<Link href="/categories" />}>
            Start shopping
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/deals" />}>
            Browse this week&rsquo;s deals
          </Button>
        </EmptyState>

        <Section title="Popular right now">
          <ScrollRail products={getPopular(10)} ariaLabel="Popular products" />
        </Section>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums" data-numeric>
            {totals.itemCount}
          </span>{" "}
          {totals.itemCount === 1 ? "item" : "items"} in your basket
        </p>
        <button
          type="button"
          onClick={() => setConfirmClear(true)}
          className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-berry-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear basket
        </button>
      </div>

      <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10 xl:gap-14">
        <div className="lg:max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-4">
            <FreeDeliveryMeter subtotal={subtotal} />
          </div>

          <div className="mt-5">
            <h2 className="mb-3 font-display text-sm font-semibold tracking-tight">
              Delivery speed
            </h2>
            <DeliverySpeedPicker />
          </div>

          <ul className="mt-5 divide-y divide-border border-y border-border">
            {lines.map((line) => (
              <li key={line.productId}>
                <CartLine line={line} variant="page" />
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/categories" />}>
              <ArrowLeftIcon aria-hidden />
              Continue shopping
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-32">
            <OrderSummary
              totals={totals}
              promoSlot={<PromoInput />}
              footer={
                <div className="space-y-2.5">
                  <Button
                    size="lg"
                    className="w-full"
                    data-icon="inline-end"
                    nativeButton={false} render={<Link href="/checkout" />}
                  >
                    Proceed to checkout
                    <ArrowRightIcon aria-hidden />
                  </Button>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheckIcon className="size-3.5" aria-hidden />
                    Review your order before anything is charged
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Sticky mobile checkout bar */}
      <div
        className="fixed inset-x-0 bottom-14 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Total</p>
            <p
              className="font-display text-lg leading-none font-semibold tracking-tight tabular-nums"
              data-numeric
            >
              {formatPrice(totals.total)}
            </p>
          </div>
          <Button
            size="lg"
            className="flex-1"
            data-icon="inline-end"
            nativeButton={false} render={<Link href="/checkout" />}
          >
            Checkout
            <ArrowRightIcon aria-hidden />
          </Button>
        </div>
      </div>
      <div className="h-16 lg:hidden" aria-hidden />

      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear your basket?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes all {totals.itemCount} items. You can&rsquo;t undo it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep basket</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                clear();
                setConfirmClear(false);
                notify.info("Basket cleared");
              }}
            >
              Clear basket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
