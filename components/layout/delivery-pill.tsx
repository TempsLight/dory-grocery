"use client";

import * as React from "react";
import Link from "next/link";
import { MapPinIcon, ChevronDownIcon, CheckIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SAVED_ADDRESSES, shortZone } from "@/lib/delivery";
import { useDeliveryZone } from "@/hooks/use-delivery-zone";

export function DeliveryPill({
  className,
  tone = "bar",
}: {
  className?: string;
  tone?: "bar" | "plain";
}) {
  const { id, address, select, hydrated } = useDeliveryZone();
  const [open, setOpen] = React.useState(false);

  const label = hydrated && address ? shortZone(address) : "San Isidro, Isabela";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<button type="button" />}
        className={cn(
          "group inline-flex max-w-[15rem] items-center gap-1.5 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:max-w-[19rem]",
          tone === "bar"
            ? "px-1.5 py-1 text-brand-soft-foreground hover:bg-brand-soft-foreground/10"
            : "px-2 py-1.5 hover:bg-accent/60",
          className,
        )}
      >
        <MapPinIcon className="size-4 shrink-0" aria-hidden />
        <span className="truncate">
          <span className="text-muted-foreground">Deliver to </span>
          <span className="font-semibold">{label}</span>
        </span>
        <ChevronDownIcon
          className="size-3.5 shrink-0 opacity-60 transition-transform group-aria-expanded:rotate-180"
          aria-hidden
        />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 gap-0 p-0">
        <div className="border-b border-border p-3">
          <p className="font-display text-sm font-semibold tracking-tight">
            Where should we deliver?
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5" aria-hidden />
            San Isidro &amp; nearby towns · slots from 9 AM
          </p>
        </div>

        <ul className="p-1.5">
          {SAVED_ADDRESSES.map((addr) => {
            const active = addr.id === id;
            return (
              <li key={addr.id}>
                <button
                  type="button"
                  onClick={() => {
                    select(addr.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                    active ? "bg-brand-soft/60" : "hover:bg-accent/60",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border",
                      active
                        ? "border-brand bg-brand text-primary-foreground"
                        : "border-border",
                    )}
                    aria-hidden
                  >
                    {active ? <CheckIcon className="size-3" /> : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {addr.label}
                      <span className="ml-1.5 font-normal text-muted-foreground">
                        · {addr.city}
                      </span>
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {addr.street}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-border p-1.5">
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-2.5 py-2 text-sm font-medium text-brand-strong hover:bg-accent/60"
          >
            Use a different address at checkout
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
