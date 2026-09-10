import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PromoBanner({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-brand/15 bg-brand px-6 py-7 text-primary-foreground sm:px-8 sm:py-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-10 font-display text-[9rem] leading-none font-bold text-honey/15 select-none"
      >
        ₱50
      </span>
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-wide text-primary-foreground/70 uppercase">
            New to Dory
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Take ₱50 off your first basket
          </h2>
          <p className="mt-1.5 text-sm text-primary-foreground/85">
            Use code{" "}
            <span className="rounded-md bg-white/15 px-1.5 py-0.5 font-semibold tabular-nums">
              FRESH50
            </span>{" "}
            at checkout on orders of ₱750 or more.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-honey px-4 py-2.5 text-sm font-semibold text-honey-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
        >
          Start your basket
          <ArrowRightIcon className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
