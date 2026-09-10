import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/shop/product-image";
import { Price } from "@/components/shop/price";
import { DealTag } from "@/components/shop/deal-tag";
import { RatingStars } from "@/components/shop/rating-stars";
import { ProductTags, AvailabilityNote } from "@/components/shop/product-meta";
import { AddToCartButton } from "@/components/shop/add-to-cart";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  className,
  priority,
  sizes,
}: ProductCardProps) {
  const soldOut = product.availability === "out_of_stock";
  const href = `/product/${product.slug}`;

  return (
    <article
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-200 focus-within:border-brand/40 hover:border-brand/40 hover:shadow-plate",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={product.name}
        className="product-frame relative aspect-square overflow-hidden focus-visible:outline-none"
        tabIndex={-1}
      >
        <ProductImage
          product={product}
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-transform duration-300 group-hover/card:scale-[1.03]",
            soldOut && "opacity-45 saturate-50",
          )}
        />
        {product.compareAtPrice ? (
          <DealTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="absolute top-2.5 left-0 z-10"
          />
        ) : null}
        {soldOut ? (
          <span className="absolute inset-x-0 bottom-0 z-10 bg-card/85 py-1.5 text-center text-xs font-semibold text-muted-foreground backdrop-blur-sm">
            Out of stock
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
          {product.brand}
        </p>
        <h3 className="text-sm leading-snug font-medium">
          <Link
            href={href}
            className="line-clamp-2 rounded-sm after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground" data-numeric>
          {product.size}
        </p>

        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
          className="mt-0.5"
        />

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <div className="flex items-end justify-between gap-2">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="md"
            />
            {!soldOut && product.availability === "low_stock" ? (
              <AvailabilityNote availability={product.availability} />
            ) : (
              <ProductTags tags={product.tags} limit={1} />
            )}
          </div>

          {/* Add button sits above the title's ::after link overlay */}
          <div className="relative z-10">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
