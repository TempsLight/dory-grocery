"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { photoUrl } from "@/lib/format";
import { getCategory } from "@/lib/catalog";
import type { IllustrationKey, Product } from "@/lib/types";
import { CategoryArt } from "@/components/art/category-art";

type ImageInput = Pick<Product, "name" | "category" | "photoId"> & {
  illustration?: IllustrationKey;
};

interface ProductImageProps {
  product: ImageInput;
  /** Requested width from the CDN; height follows the aspect ratio. */
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  artClassName?: string;
}

/**
 * Hybrid product image. The category illustration is always drawn as the base
 * layer, so there is never an empty box; a photo (when we have one) fades in
 * over it and falls back to the illustration on any load error.
 */
export function ProductImage({
  product,
  width = 480,
  sizes = "(min-width: 1024px) 280px, (min-width: 640px) 40vw, 50vw",
  priority,
  className,
  artClassName,
}: ProductImageProps) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const category = getCategory(product.category);
  const illustration: IllustrationKey =
    product.illustration ?? category?.illustration ?? "pantry";
  const ink = category?.ink ?? "var(--brand-strong)";

  const showPhoto = Boolean(product.photoId) && !failed;

  return (
    <div className={cn("relative isolate size-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ color: ink }}
        aria-hidden={showPhoto && loaded ? true : undefined}
      >
        <CategoryArt
          name={illustration}
          title={showPhoto && loaded ? undefined : product.name}
          className={cn("size-[42%] max-h-24 max-w-24", artClassName)}
        />
      </div>

      {showPhoto ? (
        <Image
          src={photoUrl(product.photoId as string, { w: width })}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
