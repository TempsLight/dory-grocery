"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TicketPercentIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/lib/catalog";

export function CategoryNav({ className }: { className?: string }) {
  const pathname = usePathname();

  const items = [
    { href: "/categories", label: "All groceries", match: pathname === "/categories" },
    ...categories.map((c) => ({
      href: `/category/${c.slug}`,
      label: c.name,
      match: pathname === `/category/${c.slug}`,
    })),
  ];

  return (
    <nav aria-label="Shop by category" className={cn("relative", className)}>
      <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={item.match ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center rounded-lg px-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.match
                  ? "bg-brand-soft text-brand-soft-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="shrink-0">
          <Link
            href="/deals"
            aria-current={pathname === "/deals" ? "page" : undefined}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              pathname === "/deals"
                ? "bg-berry text-white"
                : "text-berry-foreground hover:bg-berry-soft",
            )}
          >
            <TicketPercentIcon className="size-4" aria-hidden />
            Deals
          </Link>
        </li>
      </ul>
    </nav>
  );
}
