"use client";

import * as React from "react";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_QTY_PER_LINE } from "@/lib/cart";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Show a trash icon on the minus button when value === 1. */
  removeAtMin?: boolean;
  size?: "sm" | "md" | "lg";
  /** Accessible label context, e.g. the product name. */
  label: string;
  className?: string;
  disabled?: boolean;
}

const sizeMap = {
  sm: { root: "h-8 text-sm", btn: "w-8", value: "min-w-8", icon: "size-3.5" },
  md: { root: "h-9 text-sm", btn: "w-9", value: "min-w-9", icon: "size-4" },
  lg: { root: "h-11 text-base", btn: "w-11", value: "min-w-12", icon: "size-4" },
} as const;

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = MAX_QTY_PER_LINE,
  removeAtMin = false,
  size = "sm",
  label,
  className,
  disabled,
}: QuantityStepperProps) {
  const s = sizeMap[size];
  const atMin = value <= min;
  const atMax = value >= max;
  const showTrash = removeAtMin && value === 1;

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-card",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
        disabled && "pointer-events-none opacity-50",
        s.root,
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={atMin && !showTrash}
        aria-label={
          showTrash ? `Remove ${label}` : `Decrease quantity of ${label}`
        }
        className={cn(
          "inline-grid shrink-0 place-items-center text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-40",
          showTrash && "text-berry-foreground hover:bg-berry-soft",
          s.btn,
        )}
      >
        {showTrash ? (
          <Trash2Icon className={s.icon} aria-hidden />
        ) : (
          <MinusIcon className={s.icon} aria-hidden />
        )}
      </button>

      <span
        className={cn(
          "inline-grid grow place-items-center px-1 text-center font-semibold tabular-nums",
          s.value,
        )}
        aria-live="polite"
        aria-atomic
        data-numeric
      >
        <span className="sr-only">{label} quantity: </span>
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={atMax}
        aria-label={`Increase quantity of ${label}`}
        className={cn(
          "inline-grid place-items-center text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-40",
          s.btn,
        )}
      >
        <PlusIcon className={s.icon} aria-hidden />
      </button>
    </div>
  );
}
