import Link from "next/link";
import { LeafIcon, ShieldCheckIcon, TruckIcon, ClockIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { DoryMark } from "@/components/art/dory-mark";
import { categories } from "@/lib/catalog";

const COMPANY = [
  { label: "About Dory", href: "/about" },
  { label: "How delivery works", href: "/help" },
  { label: "Careers", href: "/about" },
  { label: "Partner with us", href: "/about" },
];

const SUPPORT = [
  { label: "Help centre", href: "/help" },
  { label: "Track an order", href: "/help" },
  { label: "Returns & refunds", href: "/help" },
  { label: "Contact us", href: "/help" },
];

const ASSURANCES = [
  { icon: TruckIcon, text: "Same-day delivery across San Isidro & nearby towns" },
  { icon: ClockIcon, text: "2-hour delivery windows you choose" },
  { icon: ShieldCheckIcon, text: "Refunds if it's not fresh — no fuss" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-paper">
      <Container className="py-10 lg:py-14">
        <div className="grid gap-3 sm:grid-cols-3">
          {ASSURANCES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              <Icon className="size-5 shrink-0 text-brand" aria-hidden />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <span className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <DoryMark className="size-6 text-brand" />
              Dory Grocery
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              The neighbourhood grocery, delivered. We pick fresh from the San
              Isidro public market each morning and bring it to your door in
              Isabela, often the same day.
            </p>
          </div>

          <FooterCol title="Shop">
            {categories.slice(0, 6).map((c) => (
              <FooterLink key={c.slug} href={`/category/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/deals">Deals</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            {COMPANY.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Support">
            {SUPPORT.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5">
            <LeafIcon className="size-3.5 text-brand" aria-hidden />
            © {new Date().getFullYear()} Dory Grocery. A product-design concept —
            prices and stock are illustrative.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/help" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/help" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/help" className="hover:text-foreground">
              Accessibility
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
