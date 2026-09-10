"use client";

import * as React from "react";

const STORAGE_KEY = "dory.recently-viewed.v1";
const MAX = 8;

interface RecentlyViewedValue {
  hydrated: boolean;
  ids: string[];
  record: (productId: string) => void;
  clear: () => void;
}

const Context = React.createContext<RecentlyViewedValue | null>(null);

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ids, setIds] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setIds(parsed.filter((x): x is string => typeof x === "string").slice(0, MAX));
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = React.useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const record = React.useCallback(
    (productId: string) => {
      setIds((prev) => {
        const next = [productId, ...prev.filter((id) => id !== productId)].slice(
          0,
          MAX,
        );
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const clear = React.useCallback(() => persist([]), [persist]);

  const value = React.useMemo(
    () => ({ hydrated, ids, record, clear }),
    [hydrated, ids, record, clear],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useRecentlyViewed(): RecentlyViewedValue {
  const ctx = React.useContext(Context);
  if (!ctx)
    throw new Error(
      "useRecentlyViewed must be used within <RecentlyViewedProvider>",
    );
  return ctx;
}
