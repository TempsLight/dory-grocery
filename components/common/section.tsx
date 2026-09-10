import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  /** "See all" style link. */
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  id?: string;
}

export function Section({
  title,
  description,
  action,
  children,
  className,
  headingClassName,
  id,
}: SectionProps) {
  return (
    <section className={cn("scroll-mt-24", className)} id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2
            id={id ? `${id}-h` : undefined}
            className={cn(
              "font-display text-xl font-semibold tracking-tight sm:text-2xl",
              headingClassName,
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-brand-strong underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {action.label}
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
