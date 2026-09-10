import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCount, formatRating } from "@/lib/format";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const star = size === "sm" ? "size-3.5" : "size-4";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Rated ${formatRating(rating)} out of 5`}
      >
        <span className="inline-flex text-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={star} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span
          className="absolute inset-0 inline-flex overflow-hidden text-honey"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(star, "shrink-0")}
              fill="currentColor"
              strokeWidth={0}
            />
          ))}
        </span>
      </span>
      <span
        className={cn(
          "text-xs text-muted-foreground tabular-nums",
          size === "md" && "text-sm",
        )}
        data-numeric
      >
        {formatRating(rating)}
        {showCount && reviewCount != null ? (
          <span className="text-muted-foreground/70">
            {" "}
            ({formatCount(reviewCount)})
          </span>
        ) : null}
      </span>
    </span>
  );
}
