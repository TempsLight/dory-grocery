import * as React from "react";
import { cn } from "@/lib/utils";
import { formatPrice, pluralize } from "@/lib/format";
import type { OrderTotals } from "@/lib/types";

function Row({
  label,
  value,
  accent,
  strong,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  accent?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 text-sm",
        strong && "text-base",
      )}
    >
      <dt className={cn("text-muted-foreground", strong && "text-foreground")}>
        {label}
      </dt>
      <dd
        className={cn(
          "tabular-nums",
          accent && "font-medium text-brand-strong",
          strong && "font-display text-lg font-semibold tracking-tight",
        )}
        data-numeric
      >
        {value}
      </dd>
    </div>
  );
}

export function OrderSummary({
  totals,
  promoSlot,
  footer,
  className,
  title = "Order summary",
}: {
  totals: OrderTotals;
  promoSlot?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4 sm:p-5", className)}>
      <h2 className="font-display text-base font-semibold tracking-tight">
        {title}
      </h2>

      <dl className="mt-4 space-y-2.5">
        <Row
          label={`Subtotal · ${totals.itemCount} ${pluralize(totals.itemCount, "item")}`}
          value={formatPrice(totals.subtotal)}
        />
        {totals.savings > 0 ? (
          <Row
            label="Basket savings"
            value={`−${formatPrice(totals.savings)}`}
            accent
          />
        ) : null}
        {totals.promoDiscount > 0 ? (
          <Row
            label="Promo discount"
            value={`−${formatPrice(totals.promoDiscount)}`}
            accent
          />
        ) : null}
        <Row
          label={
            totals.deliveryFee === 0 && totals.itemCount > 0
              ? "Delivery"
              : "Delivery"
          }
          value={
            totals.itemCount === 0
              ? "—"
              : totals.deliveryFee === 0
                ? "Free"
                : formatPrice(totals.deliveryFee)
          }
          accent={totals.deliveryFee === 0 && totals.itemCount > 0}
        />
      </dl>

      {promoSlot ? <div className="mt-4">{promoSlot}</div> : null}

      <div className="mt-4 border-t border-border pt-4">
        <Row label="Total" value={formatPrice(totals.total)} strong />
        <p className="mt-1 text-xs text-muted-foreground">
          VAT included where applicable.
        </p>
      </div>

      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}
