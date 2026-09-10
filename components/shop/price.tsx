import { cn } from "@/lib/utils";
import { discountPercent, formatPrice } from "@/lib/format";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Show the "was" price inline. */
  showCompare?: boolean;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-[0.95rem]",
  lg: "text-xl",
} as const;

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className,
  showCompare = true,
}: PriceProps) {
  const onSale = Boolean(compareAtPrice && compareAtPrice > price);

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span
        data-numeric
        className={cn(
          "font-display font-semibold tracking-tight tabular-nums",
          sizeClasses[size],
          onSale && "text-berry-foreground",
        )}
      >
        {formatPrice(price)}
      </span>
      {onSale && showCompare ? (
        <span
          data-numeric
          className={cn(
            "text-muted-foreground line-through decoration-muted-foreground/50",
            size === "lg" ? "text-sm" : "text-xs",
          )}
        >
          {formatPrice(compareAtPrice as number)}
        </span>
      ) : null}
    </span>
  );
}

export function SavingsNote({
  price,
  compareAtPrice,
  className,
}: {
  price: number;
  compareAtPrice?: number;
  className?: string;
}) {
  const pct = discountPercent(price, compareAtPrice);
  if (!pct) return null;
  return (
    <span
      className={cn(
        "text-xs font-medium text-brand-strong",
        className,
      )}
      data-numeric
    >
      Save {formatPrice((compareAtPrice as number) - price)}
    </span>
  );
}
