"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
  HouseIcon,
  LayoutGridIcon,
  TicketPercentIcon,
  LifeBuoyIcon,
  LeafIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/lib/catalog";
import { CategoryArt } from "@/components/art/category-art";

const PRIMARY = [
  { href: "/", label: "Home", icon: HouseIcon },
  { href: "/categories", label: "All groceries", icon: LayoutGridIcon },
  { href: "/deals", label: "Deals", icon: TicketPercentIcon },
];

export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<button type="button" aria-label="Open menu" />}
        className={cn(
          "grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <MenuIcon className="size-5" aria-hidden />
      </SheetTrigger>

      <SheetContent side="left" className="w-[19rem] gap-0 p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="inline-flex items-center gap-2 font-display text-lg tracking-tight">
            <LeafIcon className="size-5 text-brand" aria-hidden />
            Dory Grocery
          </SheetTitle>
        </SheetHeader>

        <nav className="min-h-0 flex-1 overflow-y-auto p-3">
          <ul className="space-y-0.5">
            {PRIMARY.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-soft text-brand-soft-foreground"
                        : "hover:bg-accent/60",
                    )}
                  >
                    <Icon className="size-4.5" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 mb-1.5 px-3 text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
            Categories
          </p>
          <ul>
            {categories.map((c) => {
              const active = pathname === `/category/${c.slug}`;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-brand-soft text-brand-soft-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-md"
                      style={{ color: c.ink, background: "var(--secondary)" }}
                    >
                      <CategoryArt name={c.illustration} className="size-5" />
                    </span>
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/help"
            onClick={close}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            <LifeBuoyIcon className="size-4.5" aria-hidden />
            Help &amp; delivery info
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
