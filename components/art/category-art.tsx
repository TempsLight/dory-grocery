import * as React from "react";
import { cn } from "@/lib/utils";
import type { IllustrationKey } from "@/lib/types";

/**
 * A small family of flat illustrations, one per category. They draw in
 * `currentColor` (set to the category's ink) over a translucent wash of the
 * same colour, with a single honey accent for warmth. Kept deliberately
 * simple so a grid of them reads as one hand.
 */

const line = {
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  stroke: "currentColor",
};

const wash = "color-mix(in oklch, currentColor 15%, transparent)";
const washStrong = "color-mix(in oklch, currentColor 26%, transparent)";

function Produce() {
  return (
    <>
      <path
        d="M32 20c-6 0-11 5-11 14 0 10 6 16 11 16s11-6 11-16c0-9-5-14-11-14Z"
        fill={wash}
        {...line}
      />
      <path d="M32 20v-5" fill="none" {...line} />
      <path
        d="M32 15c4-1 8-3 10-7-5-1-9 1-11 4"
        fill="var(--honey)"
        {...line}
      />
      <circle cx="27" cy="36" r="1.6" fill="currentColor" />
      <circle cx="35" cy="32" r="1.6" fill="currentColor" />
      <circle cx="33" cy="41" r="1.6" fill="currentColor" />
    </>
  );
}

function MeatSeafood() {
  return (
    <>
      <path
        d="M14 32c6-11 20-15 30-12 4 1.2 6 5 6 12s-2 10.8-6 12c-10 3-24-1-30-12Z"
        fill={wash}
        {...line}
      />
      <path
        d="M50 20c4 2 6.5 6.5 6.5 12S54 42 50 44c-1.5-3-2.5-7.4-2.5-12S48.5 23 50 20Z"
        fill="var(--honey)"
        {...line}
      />
      <circle cx="22" cy="30" r="2" fill="currentColor" />
      <path d="M28 34c3 3 7 3 10 0" fill="none" {...line} />
      <path d="M40 24l-4 8 4 8" fill="none" {...line} />
    </>
  );
}

function DairyEggs() {
  return (
    <>
      <path
        d="M25 22h8l-1 4c3 1.6 4.5 4.4 4.5 9V44a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4V35c0-4.6 1.5-7.4 4.5-9l-1-4Z"
        fill={wash}
        {...line}
      />
      <path d="M24 18h10" fill="none" {...line} />
      <path d="M22 36h15" fill="none" {...line} />
      <ellipse cx="45" cy="38" rx="7" ry="9" fill="var(--honey)" {...line} />
    </>
  );
}

function Bakery() {
  return (
    <>
      <path
        d="M14 34c0-7 6-12 18-12s18 5 18 12c0 2-1.5 3-4 3H18c-2.5 0-4-1-4-3Z"
        fill="var(--honey)"
        {...line}
      />
      <path
        d="M16 37c1.5 4 3 8 3 11h26c0-3 1.5-7 3-11"
        fill={wash}
        {...line}
      />
      <path d="M25 26l-2 8M32 25v9M39 26l2 8" fill="none" {...line} />
    </>
  );
}

function Beverages() {
  return (
    <>
      <path
        d="M27 18h6v6l2 3v19a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V27l2-3v-6Z"
        fill={wash}
        {...line}
      />
      <path d="M25 34h10" fill="none" {...line} />
      <path
        d="M39 30h12l-1.6 18a3 3 0 0 1-3 2.8h-2.8a3 3 0 0 1-3-2.8L39 30Z"
        fill="var(--honey)"
        {...line}
      />
      <path d="M43 24l-1 6h6l-1-6Z" fill="none" {...line} />
    </>
  );
}

function Snacks() {
  return (
    <>
      <path
        d="M20 20l3 3h18l3-3-2 6 2 6-2 6 2 6-3 3H23l-3-3 2-6-2-6 2-6-2-6Z"
        fill={wash}
        {...line}
      />
      <path d="M28 30l8 8M36 30l-8 8" fill="none" {...line} />
      <circle cx="48" cy="44" r="2" fill="var(--honey)" />
      <circle cx="17" cy="26" r="1.6" fill="currentColor" />
    </>
  );
}

function Pantry() {
  return (
    <>
      <path
        d="M23 27h18v17a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4V27Z"
        fill={wash}
        {...line}
      />
      <path d="M25 21h14v6H25z" fill="var(--honey)" {...line} />
      <path d="M23 37h18" fill="none" {...line} />
      <path d="M28 42h8" fill="none" strokeWidth="3" strokeLinecap="round" stroke="currentColor" />
    </>
  );
}

function Frozen() {
  return (
    <>
      <rect x="24" y="16" width="16" height="24" rx="8" fill="var(--honey)" {...line} />
      <path d="M32 40v8" fill="none" {...line} />
      <path d="M46 30v14M39 33l14 8M53 33l-14 8" fill="none" {...line} />
    </>
  );
}

function Household() {
  return (
    <>
      <path
        d="M27 27h9a3 3 0 0 1 3 3v15a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4V31a4 4 0 0 1 4-4Z"
        fill={wash}
        {...line}
      />
      <path d="M30 27v-5h5v5" fill="none" {...line} />
      <path d="M35 24h10l-4 5h-6" fill="var(--honey)" {...line} />
      <path d="M25 37h12" fill="none" {...line} />
    </>
  );
}

function PersonalCare() {
  return (
    <>
      <path
        d="M26 28h12v16a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V28Z"
        fill={wash}
        {...line}
      />
      <path d="M29 28v-4h6v4" fill="none" {...line} />
      <path d="M35 20h5v4l-5 2" fill="none" {...line} />
      <circle cx="44" cy="24" r="4" fill="var(--honey)" {...line} />
      <path d="M26 36h12" fill="none" {...line} />
    </>
  );
}

const ART: Record<IllustrationKey, React.FC> = {
  produce: Produce,
  "meat-seafood": MeatSeafood,
  "dairy-eggs": DairyEggs,
  bakery: Bakery,
  beverages: Beverages,
  snacks: Snacks,
  pantry: Pantry,
  frozen: Frozen,
  household: Household,
  "personal-care": PersonalCare,
};

export function CategoryArt({
  name,
  className,
  title,
}: {
  name: IllustrationKey;
  className?: string;
  title?: string;
}) {
  const Shape = ART[name] ?? Produce;
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-16", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <Shape />
    </svg>
  );
}

export { wash as artWash, washStrong as artWashStrong };
