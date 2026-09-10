import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheckIcon, LockIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { DoryWordmark } from "@/components/art/dory-mark";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-background">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <DoryWordmark />
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheckIcon className="size-4 text-brand" aria-hidden />
            Secure checkout
          </span>
        </Container>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-6">
        <Container className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <span className="inline-flex items-center gap-1.5">
            <LockIcon className="size-3.5" aria-hidden />
            Your details stay on this device — this is a design concept.
          </span>
          <Link href="/help" className="font-medium text-brand-strong hover:underline">
            Delivery &amp; returns
          </Link>
        </Container>
      </footer>
    </div>
  );
}
