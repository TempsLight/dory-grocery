"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon, CornerDownLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { searchSuggestions, type SearchSuggestion } from "@/lib/catalog";

interface SearchFieldProps {
  className?: string;
  initialValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
  size?: "sm" | "md";
  onNavigate?: () => void;
}

export function SearchField({
  className,
  initialValue = "",
  autoFocus,
  placeholder = "Search milk, bananas, pandesal…",
  size = "md",
  onNavigate,
}: SearchFieldProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxId = React.useId();

  const suggestions: SearchSuggestion[] = React.useMemo(
    () => (value.trim().length >= 1 ? searchSuggestions(value, 6) : []),
    [value],
  );

  const rows: Array<
    { kind: "query"; label: string } | { kind: "suggestion"; item: SearchSuggestion }
  > = React.useMemo(() => {
    if (value.trim().length < 1) return [];
    return [
      { kind: "query", label: value.trim() },
      ...suggestions.map((item) => ({ kind: "suggestion" as const, item })),
    ];
  }, [value, suggestions]);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function go(href: string) {
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
    onNavigate?.();
    router.push(href);
  }

  function submitQuery(q: string) {
    if (!q.trim()) return;
    go(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!open || rows.length === 0) {
      if (e.key === "Enter") submitQuery(value);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % rows.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + rows.length) % rows.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[active] ?? rows[0];
      if (row.kind === "query") submitQuery(row.label);
      else go(row.item.href);
    }
  }

  const showList = open && rows.length > 0;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submitQuery(value);
        }}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-input bg-card pr-1.5 pl-3 transition-colors",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
          size === "md" ? "h-11" : "h-9",
        )}
      >
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={value}
          autoFocus={autoFocus}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            showList && active >= 0 ? `${listboxId}-opt-${active}` : undefined
          }
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
        {value ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              setActive(-1);
              inputRef.current?.focus();
            }}
            className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        ) : null}
      </form>

      {showList ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-border bg-popover py-1.5 shadow-lifted"
        >
          {rows.map((row, i) => {
            const isActive = i === active;
            const id = `${listboxId}-opt-${i}`;
            if (row.kind === "query") {
              return (
                <li key="q" role="option" id={id} aria-selected={isActive}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => submitQuery(row.label)}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm",
                      isActive ? "bg-accent" : "hover:bg-accent/60",
                    )}
                  >
                    <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="flex-1 truncate">
                      Search for{" "}
                      <span className="font-semibold">“{row.label}”</span>
                    </span>
                    <CornerDownLeftIcon
                      className="size-3.5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  </button>
                </li>
              );
            }
            const { item } = row;
            return (
              <li key={item.href} role="option" id={id} aria-selected={isActive}>
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item.href)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm",
                    isActive ? "bg-accent" : "hover:bg-accent/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-md text-[0.625rem] font-bold",
                      item.type === "category"
                        ? "bg-brand-soft text-brand-soft-foreground"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {item.type === "category" ? "C" : "·"}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint ? (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.hint}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
