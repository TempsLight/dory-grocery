"use client";

import * as React from "react";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import type { ProductFilters } from "@/lib/catalog";

export interface Facets {
  brands: string[];
  priceMin: number;
  priceMax: number;
}

const DIETARY: Array<{ value: string; label: string }> = [
  { value: "organic", label: "Organic" },
  { value: "local", label: "Locally sourced" },
  { value: "vegan", label: "Plant-based" },
  { value: "new", label: "New arrivals" },
  { value: "value", label: "Great value" },
];

const RATINGS = [4.5, 4, 3.5];

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border py-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-[0.8125rem] font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm">
        {label}
        {hint ? (
          <span className="block text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function FilterControls({
  value,
  facets,
  onChange,
  className,
}: {
  value: ProductFilters;
  facets: Facets;
  onChange: (patch: Partial<ProductFilters>) => void;
  className?: string;
}) {
  const currentMax = value.maxPrice ?? facets.priceMax;
  const [sliderMax, setSliderMax] = React.useState(currentMax);

  React.useEffect(() => {
    setSliderMax(value.maxPrice ?? facets.priceMax);
  }, [value.maxPrice, facets.priceMax]);

  function toggleInList(key: "brands" | "tags", item: string) {
    const list = value[key];
    const next = list.includes(item)
      ? list.filter((x) => x !== item)
      : [...list, item];
    onChange({ [key]: next } as Partial<ProductFilters>);
  }

  return (
    <div className={cn("text-sm", className)}>
      <Group title="Availability & offers">
        <div className="space-y-3">
          <ToggleRow
            label="In stock only"
            checked={value.inStockOnly}
            onChange={(v) => onChange({ inStockOnly: v })}
          />
          <ToggleRow
            label="On sale"
            checked={value.onSaleOnly}
            onChange={(v) => onChange({ onSaleOnly: v })}
          />
        </div>
      </Group>

      <Group title="Price">
        <Slider
          min={facets.priceMin}
          max={facets.priceMax}
          step={5}
          value={[sliderMax]}
          onValueChange={(v) => {
            const next = Array.isArray(v) ? v[0] : v;
            setSliderMax(next);
          }}
          onValueCommitted={(v) => {
            const next = Array.isArray(v) ? v[0] : v;
            onChange({
              maxPrice: next >= facets.priceMax ? undefined : next,
            });
          }}
          aria-label="Maximum price"
        />
        <p className="mt-2.5 text-xs text-muted-foreground">
          Up to{" "}
          <span className="font-semibold text-foreground" data-numeric>
            {formatPrice(sliderMax)}
          </span>
        </p>
      </Group>

      <Group title="Rating">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ minRating: undefined })}
            className={cn(
              "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              value.minRating == null
                ? "border-brand bg-brand-soft text-brand-soft-foreground"
                : "border-border hover:bg-accent/60",
            )}
          >
            Any
          </button>
          {RATINGS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ minRating: r })}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                value.minRating === r
                  ? "border-brand bg-brand-soft text-brand-soft-foreground"
                  : "border-border hover:bg-accent/60",
              )}
            >
              <StarIcon
                className="size-3 text-honey"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />
              {r.toFixed(1)}
              <span aria-hidden>+</span>
            </button>
          ))}
        </div>
      </Group>

      {facets.brands.length > 1 ? (
        <Group title="Brand">
          <ul className="max-h-52 space-y-2 overflow-y-auto pr-1">
            {facets.brands.map((brand) => {
              const id = `brand-${brand.replace(/\s+/g, "-")}`;
              return (
                <li key={brand} className="flex items-center gap-2.5">
                  <Checkbox
                    id={id}
                    checked={value.brands.includes(brand)}
                    onCheckedChange={() => toggleInList("brands", brand)}
                  />
                  <label htmlFor={id} className="flex-1 cursor-pointer text-sm">
                    {brand}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>
      ) : null}

      <Group title="Labels">
        <ul className="space-y-2">
          {DIETARY.map((d) => {
            const id = `tag-${d.value}`;
            return (
              <li key={d.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={value.tags.includes(d.value)}
                  onCheckedChange={() => toggleInList("tags", d.value)}
                />
                <label htmlFor={id} className="flex-1 cursor-pointer text-sm">
                  {d.label}
                </label>
              </li>
            );
          })}
        </ul>
      </Group>
    </div>
  );
}
