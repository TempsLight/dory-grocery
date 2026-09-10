import { LeafIcon, MapPinIcon, SnowflakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Availability, ProductTag } from "@/lib/types";

const TAG_META: Partial<
  Record<ProductTag, { label: string; icon?: typeof LeafIcon }>
> = {
  organic: { label: "Organic", icon: LeafIcon },
  local: { label: "Local", icon: MapPinIcon },
  new: { label: "New", icon: SparklesIcon },
  vegan: { label: "Plant-based", icon: LeafIcon },
  frozen: { label: "Frozen", icon: SnowflakeIcon },
};

/** Small trust chips shown on the card + PDP (organic / local / new …). */
export function ProductTags({
  tags,
  limit = 2,
  className,
}: {
  tags: ProductTag[];
  limit?: number;
  className?: string;
}) {
  const shown = tags
    .map((t) => [t, TAG_META[t]] as const)
    .filter(([, meta]) => Boolean(meta))
    .slice(0, limit);

  if (!shown.length) return null;

  return (
    <span className={cn("inline-flex flex-wrap gap-1", className)}>
      {shown.map(([tag, meta]) => {
        const Icon = meta!.icon;
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-1.5 py-0.5 text-[0.6875rem] font-semibold text-brand-soft-foreground"
          >
            {Icon ? <Icon className="size-3" aria-hidden /> : null}
            {meta!.label}
          </span>
        );
      })}
    </span>
  );
}

interface AvailabilityNoteProps {
  availability: Availability;
  className?: string;
}

export function AvailabilityNote({
  availability,
  className,
}: AvailabilityNoteProps) {
  if (availability === "in_stock") return null;

  const isOut = availability === "out_of_stock";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        isOut ? "text-muted-foreground" : "text-honey-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          isOut ? "bg-muted-foreground/60" : "bg-honey",
        )}
      />
      {isOut ? "Out of stock" : "Only a few left"}
    </span>
  );
}
