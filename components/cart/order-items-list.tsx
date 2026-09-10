import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { IllustrationKey } from "@/lib/types";
import { ProductImage } from "@/components/shop/product-image";

export interface OrderItemView {
  productId?: string;
  name: string;
  brand: string;
  size: string;
  quantity: number;
  unitPrice: number;
  photoId?: string;
  illustration: IllustrationKey;
  category?: string;
}

export function OrderItemsList({
  items,
  className,
}: {
  items: OrderItemView[];
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-border", className)}>
      {items.map((item, i) => (
        <li key={item.productId ?? i} className="flex items-center gap-3 py-3">
          <div className="relative shrink-0">
            <div className="product-frame size-12 overflow-hidden rounded-md border border-border">
              <ProductImage
                product={{
                  name: item.name,
                  category: item.category ?? "",
                  photoId: item.photoId,
                  illustration: item.illustration,
                }}
                width={120}
                sizes="48px"
                artClassName="size-3/5"
              />
            </div>
            <span
              className="absolute -top-1.5 -right-1.5 grid min-w-[1.15rem] place-items-center rounded-full border border-background bg-foreground px-1 text-[0.625rem] leading-[1.05rem] font-bold text-background tabular-nums"
              aria-hidden
            >
              {item.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground" data-numeric>
              {item.size}
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium tabular-nums" data-numeric>
            {formatPrice(item.unitPrice * item.quantity)}
          </p>
        </li>
      ))}
    </ul>
  );
}
