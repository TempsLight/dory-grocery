"use client";

import Link from "next/link";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { ResolvedLine } from "@/lib/cart";
import { useCart } from "@/components/providers/cart-provider";
import { notify } from "@/lib/notify";
import { ProductImage } from "@/components/shop/product-image";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { AvailabilityNote } from "@/components/shop/product-meta";

export function CartLine({
  line,
  variant = "page",
  onNavigate,
}: {
  line: ResolvedLine;
  variant?: "page" | "sheet";
  onNavigate?: () => void;
}) {
  const { setQuantity, remove } = useCart();
  const { product, quantity, lineTotal } = line;

  function handleRemove() {
    remove(product.id);
    notify.info(`Removed ${product.name}`, {
      description: "It’s no longer in your basket.",
    });
  }

  return (
    <div
      className={cn(
        "flex gap-3",
        variant === "page" ? "py-4 sm:gap-4" : "py-3",
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        onClick={onNavigate}
        className={cn(
          "product-frame relative shrink-0 overflow-hidden rounded-lg border border-border",
          variant === "page" ? "size-20 sm:size-24" : "size-16",
        )}
      >
        <ProductImage
          product={product}
          width={200}
          sizes="96px"
          artClassName="size-3/5"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
              {product.brand}
            </p>
            <h3 className="truncate text-sm font-medium">
              <Link
                href={`/product/${product.slug}`}
                onClick={onNavigate}
                className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground" data-numeric>
              {product.size}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${product.name} from basket`}
            className="-m-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-berry-soft hover:text-berry-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>

        {product.availability !== "in_stock" ? (
          <AvailabilityNote availability={product.availability} className="mt-1" />
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <QuantityStepper
            value={quantity}
            onChange={(next) => setQuantity(product.id, next)}
            removeAtMin
            size="sm"
            label={product.name}
          />
          <div className="text-right">
            <p
              className="font-display text-sm font-semibold tabular-nums"
              data-numeric
            >
              {formatPrice(lineTotal)}
            </p>
            {quantity > 1 ? (
              <p className="text-[0.6875rem] text-muted-foreground" data-numeric>
                {formatPrice(product.price)} each
              </p>
            ) : product.compareAtPrice ? (
              <p
                className="text-[0.6875rem] text-muted-foreground line-through"
                data-numeric
              >
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
