"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseIcon,
  LayoutGridIcon,
  TicketPercentIcon,
  ShoppingBasketIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";

const TABS = [
  { href: "/", label: "Home", icon: HouseIcon, match: (p: string) => p === "/" },
  {
    href: "/categories",
    label: "Browse",
    icon: LayoutGridIcon,
    match: (p: string) => p === "/categories" || p.startsWith("/category"),
  },
  {
    href: "/deals",
    label: "Deals",
    icon: TicketPercentIcon,
    match: (p: string) => p === "/deals",
  },
  {
    href: "/cart",
    label: "Basket",
    icon: ShoppingBasketIcon,
    match: (p: string) => p === "/cart",
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { hydrated, itemCount } = useCart();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {TABS.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          const isBasket = href === "/cart";
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium transition-colors",
                  active ? "text-brand-strong" : "text-muted-foreground",
                )}
              >
                <span className="relative">
                  <Icon
                    className="size-5.5"
                    strokeWidth={active ? 2.4 : 2}
                    aria-hidden
                  />
                  {isBasket && hydrated && itemCount > 0 ? (
                    <span
                      className="absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.625rem] leading-4 font-bold text-primary-foreground tabular-nums"
                      aria-hidden
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
