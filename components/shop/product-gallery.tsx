"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { photoUrl } from "@/lib/format";
import { getCategory } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { CategoryArt } from "@/components/art/category-art";
import { DealTag } from "@/components/shop/deal-tag";

export function ProductGallery({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const ink = category?.ink ?? "var(--brand-strong)";
  const illustration = category?.illustration ?? "pantry";

  const views: Array<"photo" | "art"> = product.photoId
    ? ["photo", "art"]
    : ["art"];
  const [view, setView] = React.useState<"photo" | "art">(views[0]);
  const [photoFailed, setPhotoFailed] = React.useState(false);

  const showPhoto = view === "photo" && product.photoId && !photoFailed;

  return (
    <div className="flex flex-col gap-3">
      <div className="product-frame relative aspect-square overflow-hidden rounded-2xl border border-border">
        {showPhoto ? (
          <Image
            src={photoUrl(product.photoId as string, { w: 1100, q: 80 })}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div className="grid size-full place-items-center" style={{ color: ink }}>
            <CategoryArt
              name={illustration}
              title={product.name}
              className="size-2/5 max-h-48 max-w-48"
            />
          </div>
        )}

        {product.compareAtPrice ? (
          <DealTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="absolute top-3.5 left-0"
          />
        ) : null}
      </div>

      {views.length > 1 && !photoFailed ? (
        <div className="flex gap-2.5">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              aria-label={v === "photo" ? "Show photo" : "Show illustration"}
              className={cn(
                "product-frame relative size-16 overflow-hidden rounded-lg border transition-colors",
                view === v ? "border-brand" : "border-border hover:border-brand/40",
              )}
            >
              {v === "photo" && product.photoId ? (
                <Image
                  src={photoUrl(product.photoId, { w: 160, q: 60 })}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <span
                  className="grid size-full place-items-center"
                  style={{ color: ink }}
                >
                  <CategoryArt name={illustration} className="size-8" />
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
