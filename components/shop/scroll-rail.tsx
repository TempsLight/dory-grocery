"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";

export function ScrollRail({
  products,
  className,
  ariaLabel,
}: {
  products: Product[];
  className?: string;
  ariaLabel?: string;
}) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ start: true, end: false });

  const update = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setEdges({ start, end });
  }, []);

  React.useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 640), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={trackRef}
        aria-label={ariaLabel}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:snap-none sm:px-0"
      >
        {products.map((product, i) => (
          <li
            key={product.id}
            className="w-[45vw] max-w-[15rem] shrink-0 snap-start sm:w-56"
          >
            <ProductCard
              product={product}
              className="h-full w-full"
              sizes="(min-width: 640px) 224px, 45vw"
              priority={i < 2}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className={cn(
          "absolute top-[34%] -left-4 z-20 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lifted transition-opacity lg:grid",
          edges.start && "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeftIcon className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className={cn(
          "absolute top-[34%] -right-4 z-20 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lifted transition-opacity lg:grid",
          edges.end && "pointer-events-none opacity-0",
        )}
      >
        <ChevronRightIcon className="size-4" aria-hidden />
      </button>
    </div>
  );
}
