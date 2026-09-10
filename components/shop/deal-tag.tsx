import { cn } from "@/lib/utils";
import { discountPercent } from "@/lib/format";

/** Die-cut produce tag — reserved for genuine price drops. */
export function DealTag({
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
        "dory-tag inline-flex items-center bg-berry py-1 pr-2.5 text-[0.6875rem] font-bold tracking-wide text-white uppercase tabular-nums",
        className,
      )}
      data-numeric
    >
      {pct}% off
    </span>
  );
}
