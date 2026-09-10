"use client";

import { TruckIcon, ZapIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DELIVERY_OPTIONS, FREE_DELIVERY_THRESHOLD } from "@/lib/cart";
import type { DeliverySpeed } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";

const ICON = { standard: TruckIcon, express: ZapIcon };

export function DeliverySpeedPicker({ className }: { className?: string }) {
  const { state, setSpeed, subtotal } = useCart();

  return (
    <RadioGroup
      value={state.speed}
      onValueChange={(v) => setSpeed(v as DeliverySpeed)}
      className={cn("gap-2.5", className)}
      aria-label="Delivery speed"
    >
      {(Object.keys(DELIVERY_OPTIONS) as DeliverySpeed[]).map((key) => {
        const opt = DELIVERY_OPTIONS[key];
        const Icon = ICON[key];
        const free =
          key === "standard" && subtotal >= FREE_DELIVERY_THRESHOLD;
        const selected = state.speed === key;
        return (
          <label
            key={key}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
              selected
                ? "border-brand bg-brand-soft/50"
                : "border-border hover:bg-accent/40",
            )}
          >
            <RadioGroupItem value={key} />
            <Icon
              className={cn(
                "size-5 shrink-0",
                selected ? "text-brand-strong" : "text-muted-foreground",
              )}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{opt.title}</span>
              <span className="block text-xs text-muted-foreground">
                {opt.window}
              </span>
            </span>
            <span
              className={cn(
                "shrink-0 text-sm font-semibold tabular-nums",
                free && "text-brand-strong",
              )}
              data-numeric
            >
              {free ? "Free" : formatPrice(opt.fee)}
            </span>
          </label>
        );
      })}
    </RadioGroup>
  );
}
