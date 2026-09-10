import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";

const columnClasses = {
  browse: "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
  compact: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5",
  rail: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
} as const;

export function ProductGrid({
  products,
  layout = "browse",
  className,
  priorityCount = 0,
}: {
  products: Product[];
  layout?: keyof typeof columnClasses;
  className?: string;
  priorityCount?: number;
}) {
  return (
    <ul className={cn("grid gap-3 sm:gap-4", columnClasses[layout], className)}>
      {products.map((product, i) => (
        <li key={product.id} className="flex min-w-0">
          <ProductCard
            product={product}
            className="w-full"
            priority={i < priorityCount}
          />
        </li>
      ))}
    </ul>
  );
}
