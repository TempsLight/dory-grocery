"use client";

import * as React from "react";
import {
  cartReducer,
  computeTotals,
  initialCartState,
  resolveLines,
  type CartState,
  type ResolvedLine,
} from "@/lib/cart";
import type { DeliverySpeed, OrderTotals } from "@/lib/types";
import type { PromoResult } from "@/lib/cart";

const STORAGE_KEY = "dory.cart.v1";

interface CartContextValue {
  hydrated: boolean;
  state: CartState;
  lines: ResolvedLine[];
  itemCount: number;
  distinctCount: number;
  subtotal: number;
  totals: OrderTotals & { promo: PromoResult };
  getQuantity: (productId: string) => number;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setPromo: (code: string | null) => void;
  setSpeed: (speed: DeliverySpeed) => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

function readStorage(): CartState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CartState>;
    if (!parsed || !Array.isArray(parsed.lines)) return null;
    return {
      lines: parsed.lines
        .filter(
          (l): l is CartState["lines"][number] =>
            !!l && typeof l.productId === "string" && typeof l.quantity === "number",
        )
        .map((l) => ({
          productId: l.productId,
          quantity: l.quantity,
          addedAt: typeof l.addedAt === "number" ? l.addedAt : Date.now(),
        })),
      promoCode: typeof parsed.promoCode === "string" ? parsed.promoCode : null,
      speed: parsed.speed === "express" ? "express" : "standard",
    };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, initialCartState);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = readStorage();
    if (stored) dispatch({ type: "hydrate", state: stored });
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — cart still works for the session */
    }
  }, [state, hydrated]);

  // Keep the cart in sync across tabs.
  React.useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      const stored = readStorage();
      if (stored) dispatch({ type: "hydrate", state: stored });
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const lines = React.useMemo(() => resolveLines(state.lines), [state.lines]);

  const totals = React.useMemo(
    () =>
      computeTotals({
        lines: state.lines,
        speed: state.speed,
        promoCode: state.promoCode,
      }),
    [state.lines, state.speed, state.promoCode],
  );

  const value = React.useMemo<CartContextValue>(() => {
    const quantities = new Map(state.lines.map((l) => [l.productId, l.quantity]));
    return {
      hydrated,
      state,
      lines,
      itemCount: totals.itemCount,
      distinctCount: state.lines.length,
      subtotal: totals.subtotal,
      totals,
      getQuantity: (productId) => quantities.get(productId) ?? 0,
      add: (productId, quantity) => dispatch({ type: "add", productId, quantity }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: "setQuantity", productId, quantity }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
      setPromo: (code) => dispatch({ type: "setPromo", code }),
      setSpeed: (speed) => dispatch({ type: "setSpeed", speed }),
    };
  }, [hydrated, state, lines, totals]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
