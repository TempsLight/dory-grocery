import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { categoryProductCount } from "@/lib/catalog";
import type { Category } from "@/lib/types";
import { CategoryArt } from "@/components/art/category-art";

export function CategoryCard({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const count = categoryProductCount(category.slug);

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border p-3.5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-plate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4",
        className,
      )}
      style={{ backgroundColor: category.tint }}
    >
      <span
        className="grid size-12 shrink-0 place-items-center rounded-xl bg-card/70 sm:size-16"
        style={{ color: category.ink }}
        aria-hidden
      >
        <CategoryArt name={category.illustration} className="size-9 sm:size-11" />
      </span>
      <span className="mt-3 min-w-0 sm:mt-3.5">
        <span
          className="block font-display text-sm leading-tight font-semibold tracking-tight sm:text-[0.95rem]"
          style={{ color: category.ink }}
        >
          {category.name}
        </span>
        <span
          className="mt-0.5 block text-xs"
          style={{ color: category.ink, opacity: 0.72 }}
          data-numeric
        >
          {count} items
        </span>
      </span>
      <ArrowRightIcon
        className="absolute top-4 right-4 size-4 opacity-0 transition-opacity group-hover:opacity-60"
        style={{ color: category.ink }}
        aria-hidden
      />
    </Link>
  );
}

export function CategoryTile({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group flex w-[4.75rem] shrink-0 flex-col items-center gap-2 text-center focus-visible:outline-none",
        className,
      )}
    >
      <span
        className="grid size-[4.5rem] place-items-center rounded-2xl border border-border transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-plate group-focus-visible:ring-2 group-focus-visible:ring-ring"
        style={{ backgroundColor: category.tint, color: category.ink }}
      >
        <CategoryArt name={category.illustration} className="size-11" />
      </span>
      <span className="text-[0.6875rem] leading-tight font-medium text-foreground">
        {category.name}
      </span>
    </Link>
  );
}
