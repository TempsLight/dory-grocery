"use client";

import { ArrowUpDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortValue } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SortSelect({
  value,
  onChange,
  className,
}: {
  value: SortValue;
  onChange: (value: SortValue) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortValue)}>
      <SelectTrigger
        aria-label="Sort products"
        className={cn("h-9 gap-2 rounded-lg bg-card px-3", className)}
      >
        <ArrowUpDownIcon className="size-4 text-muted-foreground" aria-hidden />
        <span className="text-muted-foreground">Sort:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="end">
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
