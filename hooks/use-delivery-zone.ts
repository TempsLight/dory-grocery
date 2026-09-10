"use client";

import * as React from "react";
import {
  DEFAULT_ADDRESS_ID,
  getAddress,
  type SavedAddress,
} from "@/lib/delivery";

const KEY = "dory.zone";

export function useDeliveryZone() {
  const [id, setId] = React.useState<string>(DEFAULT_ADDRESS_ID);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored && getAddress(stored)) setId(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const select = React.useCallback((next: string) => {
    setId(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const address: SavedAddress | undefined = getAddress(id);

  return { id, address, select, hydrated };
}
