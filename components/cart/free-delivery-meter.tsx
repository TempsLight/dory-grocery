import { TruckIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/cart";

export function FreeDeliveryMeter({
  subtotal,
  className,
  compact = false,
}: {
  subtotal: number;
  className?: string;
  compact?: boolean;
}) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const unlocked = remaining === 0;

  return (
    <div className={cn("space-y-1.5", className)}>
      <p
        className={cn(
          "flex items-center gap-1.5 text-xs",
          unlocked ? "font-medium text-brand-strong" : "text-muted-foreground",
        )}
      >
        {unlocked ? (
          <CheckIcon className="size-3.5 shrink-0" aria-hidden />
        ) : (
          <TruckIcon className="size-3.5 shrink-0" aria-hidden />
        )}
        {unlocked ? (
          <span>You&rsquo;ve unlocked free standard delivery</span>
        ) : (
          <span>
            <span className="font-semibold text-foreground" data-numeric>
              {formatPrice(remaining)}
            </span>{" "}
            away from free standard delivery
          </span>
        )}
      </p>
      {!compact ? (
        <div
          className="h-1.5 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={FREE_DELIVERY_THRESHOLD}
          aria-valuenow={Math.round(subtotal)}
          aria-label="Progress toward free delivery"
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500 ease-out",
              unlocked ? "bg-brand" : "bg-honey",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
