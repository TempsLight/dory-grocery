"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBasketIcon, ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/components/providers/cart-provider";
import { CartLine } from "@/components/cart/cart-line";
import { FreeDeliveryMeter } from "@/components/cart/free-delivery-meter";
import { EmptyState } from "@/components/common/empty-state";

export function CartIndicator({ className }: { className?: string }) {
  const { hydrated, lines, itemCount, subtotal, totals } = useCart();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label={`Basket, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          />
        }
        className={cn(
          "group relative inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card pr-2 pl-2.5 text-sm font-medium transition-colors hover:border-brand/40 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:pr-3",
          className,
        )}
      >
        <span className="relative">
          <ShoppingBasketIcon className="size-5 text-foreground" aria-hidden />
          {hydrated && itemCount > 0 ? (
            <span
              className="absolute -top-2 -right-2 grid min-w-[1.15rem] place-items-center rounded-full bg-brand px-1 text-[0.6875rem] leading-[1.15rem] font-bold text-primary-foreground tabular-nums"
              aria-hidden
            >
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
        </span>
        <span className="hidden tabular-nums sm:inline" data-numeric>
          {hydrated && subtotal > 0 ? formatPrice(subtotal) : "Basket"}
        </span>
      </SheetTrigger>

      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display text-lg tracking-tight">
            Your basket
            {hydrated && itemCount > 0 ? (
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                · {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            ) : null}
          </SheetTitle>
        </SheetHeader>

        {!hydrated ? (
          <div className="flex-1" />
        ) : lines.length === 0 ? (
          <div className="flex flex-1 items-center p-4">
            <EmptyState
              scene="empty-cart"
              size="sm"
              title="Your basket is empty"
              description="Add a few staples and they’ll show up here."
              className="w-full border-0 bg-transparent py-6"
            >
              <Button
                nativeButton={false} render={<Link href="/categories" />}
                onClick={() => setOpen(false)}
              >
                Start shopping
              </Button>
            </EmptyState>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-4">
              {lines.map((line) => (
                <CartLine
                  key={line.productId}
                  line={line}
                  variant="sheet"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>

            <div className="space-y-3 border-t border-border p-4">
              <FreeDeliveryMeter subtotal={subtotal} />
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span
                  className="font-display text-lg font-semibold tracking-tight tabular-nums"
                  data-numeric
                >
                  {formatPrice(subtotal)}
                </span>
              </div>
              {totals.savings > 0 ? (
                <p className="text-xs font-medium text-brand-strong" data-numeric>
                  You&rsquo;re saving {formatPrice(totals.savings)} on this basket
                </p>
              ) : null}
              <div className="grid gap-2">
                <Button
                  nativeButton={false} render={<Link href="/checkout" />}
                  onClick={() => setOpen(false)}
                  size="lg"
                  data-icon="inline-end"
                >
                  Go to checkout
                  <ArrowRightIcon aria-hidden />
                </Button>
                <Button
                  nativeButton={false} render={<Link href="/cart" />}
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="sm"
                >
                  View full basket
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
