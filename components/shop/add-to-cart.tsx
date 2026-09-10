"use client";

import * as React from "react";
import { PlusIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { notify } from "@/lib/notify";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import type { Product } from "@/lib/types";

type CartProduct = Pick<
  Product,
  "id" | "name" | "brand" | "price" | "availability" | "size"
>;

/* ---------------- card variant ---------------- */

export function AddToCartButton({
  product,
  className,
}: {
  product: CartProduct;
  className?: string;
}) {
  const { getQuantity, add, setQuantity, hydrated } = useCart();
  const qty = getQuantity(product.id);
  const soldOut = product.availability === "out_of_stock";

  if (soldOut) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className={cn("w-full", className)}
      >
        Out of stock
      </Button>
    );
  }

  if (!hydrated || qty === 0) {
    return (
      <Button
        size="sm"
        data-icon="inline-start"
        onClick={() => {
          add(product.id);
          notify.success("Added to basket", {
            description: `${product.name} · ${product.size}`,
            action: { label: "View basket", href: "/cart" },
          });
        }}
        className={cn("w-full", className)}
      >
        <PlusIcon aria-hidden />
        Add to basket
      </Button>
    );
  }

  return (
    <QuantityStepper
      value={qty}
      onChange={(next) => setQuantity(product.id, next)}
      removeAtMin
      size="sm"
      label={product.name}
      className={cn("w-full", className)}
    />
  );
}

/* ---------------- detail (PDP) variant ---------------- */

export function AddToCartPanel({
  product,
  className,
}: {
  product: CartProduct;
  className?: string;
}) {
  const { getQuantity, add, setQuantity, hydrated } = useCart();
  const inCartQty = getQuantity(product.id);
  const [draftQty, setDraftQty] = React.useState(1);
  const soldOut = product.availability === "out_of_stock";

  if (soldOut) {
    return (
      <div className={cn("space-y-2", className)}>
        <Button variant="outline" size="lg" disabled className="w-full">
          Out of stock
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          We restock this most weekday mornings — check back tomorrow.
        </p>
      </div>
    );
  }

  if (hydrated && inCartQty > 0) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between rounded-xl border border-brand-soft-foreground/20 bg-brand-soft/60 px-3.5 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-soft-foreground">
            <CheckIcon className="size-4" aria-hidden />
            In your basket
          </span>
          <QuantityStepper
            value={inCartQty}
            onChange={(next) => setQuantity(product.id, next)}
            removeAtMin
            size="md"
            label={product.name}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {formatPrice(product.price * inCartQty)} for {inCartQty} ·{" "}
          <a
            href="/cart"
            className="font-medium text-brand-strong underline-offset-2 hover:underline"
          >
            Review basket
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <QuantityStepper
        value={draftQty}
        onChange={(n) => setDraftQty(Math.max(1, n))}
        min={1}
        size="lg"
        label={product.name}
        className="sm:w-auto"
      />
      <Button
        size="lg"
        data-icon="inline-start"
        className="grow"
        onClick={() => {
          add(product.id, draftQty);
          notify.success(
            draftQty > 1
              ? `${draftQty} added to basket`
              : "Added to basket",
            {
              description: `${product.name} · ${product.size}`,
              action: { label: "View basket", href: "/cart" },
            },
          );
          setDraftQty(1);
        }}
      >
        <PlusIcon aria-hidden />
        Add to basket
        <span aria-hidden className="mx-1 opacity-40">
          ·
        </span>
        <span data-numeric>{formatPrice(product.price * draftQty)}</span>
      </Button>
    </div>
  );
}
