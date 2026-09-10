import { cn } from "@/lib/utils";

/**
 * Dory's mark — a market tote with a sprig tucked in the top.
 * Uses `currentColor` for the bag so it adapts to context; the leaf keeps
 * the brand green.
 */
export function DoryMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <path
        d="M7.5 12.25h17l-1.28 13.02a3 3 0 0 1-2.99 2.73H11.77a3 3 0 0 1-2.99-2.73L7.5 12.25Z"
        fill="currentColor"
      />
      <path
        d="M11.75 12.25v-1.5a4.25 4.25 0 0 1 8.5 0v1.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M16 20.4c-2.6 0-4.7-1.9-4.7-5 2.6 0 4.7 1.9 4.7 5Zm0 0c0-3.7 2.4-6 5.3-6 0 3.4-2.4 6-5.3 6Z"
        fill="var(--brand-soft)"
      />
      <path
        d="M16 24.6v-8.2"
        stroke="var(--brand-soft)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoryWordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[1.35rem] leading-none font-semibold tracking-tight",
        className,
      )}
    >
      <DoryMark className={cn("size-7 text-primary", markClassName)} />
      <span>
        Dory<span className="text-muted-foreground">.</span>
      </span>
    </span>
  );
}
