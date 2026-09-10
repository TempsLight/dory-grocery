import * as React from "react";
import { cn } from "@/lib/utils";

export type SceneName =
  | "empty-cart"
  | "no-results"
  | "order-confirmed"
  | "not-found"
  | "basket";

const line = {
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  stroke: "currentColor",
};

const wash = "color-mix(in oklch, currentColor 13%, transparent)";

function EmptyCart() {
  return (
    <>
      <path
        d="M56 66h88l-8 62a14 14 0 0 1-13.9 12.2H77.9A14 14 0 0 1 64 128L56 66Z"
        fill={wash}
        {...line}
      />
      <path d="M78 66V54a22 22 0 0 1 44 0v12" fill="none" {...line} />
      <path d="M72 92h56M78 116h44" fill="none" {...line} />
      <path
        d="M150 44c8-2 15-6 19-14-9-2-17 2-21 8"
        fill="var(--honey)"
        {...line}
      />
      <circle cx="150" cy="40" r="3" fill="currentColor" />
    </>
  );
}

function NoResults() {
  return (
    <>
      <rect x="40" y="52" width="86" height="70" rx="12" fill={wash} {...line} />
      <path d="M40 78h86M70 52v70" fill="none" {...line} opacity={0.5} />
      <circle cx="128" cy="92" r="26" fill="var(--card)" {...line} />
      <path d="M147 111l17 17" fill="none" {...line} />
      <path
        d="M120 92h16M128 84v16"
        fill="none"
        stroke="var(--honey)"
        strokeWidth={5}
        strokeLinecap="round"
      />
    </>
  );
}

function OrderConfirmed() {
  return (
    <>
      <path d="M36 132h136" fill="none" {...line} />
      <path
        d="M64 70h58l-5 50a12 12 0 0 1-12 10.8H81A12 12 0 0 1 69 120L64 70Z"
        fill={wash}
        {...line}
      />
      <path d="M78 70V60a15 15 0 0 1 30 0v10" fill="none" {...line} />
      <circle cx="140" cy="58" r="24" fill="var(--brand-soft)" {...line} />
      <path
        d="M130 58l7 7 13-14"
        fill="none"
        stroke="var(--brand-strong)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function NotFound() {
  return (
    <>
      <path d="M34 128h140" fill="none" {...line} />
      <path
        d="M60 74l92-6-6 44a14 14 0 0 1-14 12.6H82A14 14 0 0 1 68 118L60 74Z"
        fill={wash}
        {...line}
      />
      <path d="M74 88l64-4M78 108l56-3" fill="none" {...line} opacity={0.5} />
      <circle cx="120" cy="44" r="4" fill="currentColor" />
      <path
        d="M112 30c1-7 7-12 14-11s11 7 9 13c-2 5-9 6-10 12"
        fill="none"
        stroke="var(--honey)"
        strokeWidth={5}
        strokeLinecap="round"
      />
    </>
  );
}

function Basket() {
  return (
    <>
      <path
        d="M44 70h112l-10 54a14 14 0 0 1-13.8 11.4H67.8A14 14 0 0 1 54 124L44 70Z"
        fill={wash}
        {...line}
      />
      <path d="M64 52l16 18M136 52l-16 18" fill="none" {...line} />
      <path d="M40 70h120" fill="none" {...line} />
      <path
        d="M74 88l4 30M100 88v30M126 88l-4 30"
        fill="none"
        {...line}
        opacity={0.5}
      />
    </>
  );
}

const SCENES: Record<SceneName, React.FC> = {
  "empty-cart": EmptyCart,
  "no-results": NoResults,
  "order-confirmed": OrderConfirmed,
  "not-found": NotFound,
  basket: Basket,
};

export function SceneArt({
  name,
  className,
  title,
}: {
  name: SceneName;
  className?: string;
  title?: string;
}) {
  const Shape = SCENES[name];
  return (
    <svg
      viewBox="0 0 200 150"
      className={cn("h-auto w-40 text-brand-strong", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <Shape />
    </svg>
  );
}
