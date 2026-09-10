"use client";

import * as React from "react";
import { TagIcon, XIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { evaluatePromo, PROMOS } from "@/lib/cart";
import { notify } from "@/lib/notify";

export function PromoInput({ className }: { className?: string }) {
  const { state, subtotal, setPromo, totals } = useCart();
  const applied = totals.promo.applied;
  const [open, setOpen] = React.useState(Boolean(state.promoCode));
  const [value, setValue] = React.useState(state.promoCode ?? "");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Surface "spend ₱X more" style messages once a code is stored.
    if (state.promoCode && !applied) {
      setError(totals.promo.message ?? null);
    } else {
      setError(null);
    }
  }, [state.promoCode, applied, totals.promo.message]);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const code = value.trim().toUpperCase();
    if (!code) return;
    const result = evaluatePromo(code, subtotal);
    if (!result.applied) {
      setError(result.message ?? "That code isn’t valid.");
      return;
    }
    setError(null);
    setPromo(code);
    notify.success(`Promo ${code} applied`, {
      description: PROMOS[code]?.label,
    });
  }

  function clear() {
    setPromo(null);
    setValue("");
    setError(null);
    setOpen(false);
  }

  if (applied) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-2 rounded-lg border border-brand-soft-foreground/25 bg-brand-soft/60 px-3 py-2 text-sm",
          className,
        )}
      >
        <span className="inline-flex items-center gap-2 font-medium text-brand-soft-foreground">
          <CheckIcon className="size-4" aria-hidden />
          {applied.code} applied
        </span>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1 rounded-md px-1 text-xs font-medium text-brand-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Remove
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <TagIcon className="size-3.5" aria-hidden />
        Add a promo code
      </button>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={apply} className="flex gap-2">
        <div className="relative flex-1">
          <TagIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            placeholder="Promo code"
            aria-label="Promo code"
            aria-invalid={Boolean(error)}
            className={cn(
              "h-9 w-full rounded-lg border bg-card pr-8 pl-9 text-sm uppercase outline-none transition-colors placeholder:normal-case placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
              error ? "border-destructive" : "border-input focus-visible:border-ring",
            )}
          />
          {value ? (
            <button
              type="button"
              aria-label="Clear code"
              onClick={() => setValue("")}
              className="absolute top-1/2 right-2 grid size-5 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
        <Button type="submit" size="sm" variant="outline" className="h-9">
          Apply
        </Button>
      </form>
      {error ? (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Try <span className="font-semibold">FRESH50</span> or{" "}
          <span className="font-semibold">DORY10</span>
        </p>
      )}
    </div>
  );
}
