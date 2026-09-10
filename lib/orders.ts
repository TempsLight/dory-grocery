import { DELIVERY_OPTIONS } from "@/lib/cart";
import type { DeliverySpeed, Order } from "@/lib/types";

const STORAGE_KEY = "dory.orders.v1";
const LAST_KEY = "dory.orders.last";

interface OrderStore {
  [id: string]: Order;
}

function readStore(): OrderStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderStore) : {};
  } catch {
    return {};
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const store = readStore();
    store[order.id] = order;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.localStorage.setItem(LAST_KEY, order.id);
  } catch {
    /* ignore */
  }
}

export function getOrder(id: string): Order | null {
  return readStore()[id] ?? null;
}

export function getLastOrderId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

/** DG-7F3K91 — recognisable, easy to read aloud to support. */
export function createOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let body = "";
  for (let i = 0; i < 7; i += 1) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DG-${body}`;
}

export function deliveryEtaLabel(speed: DeliverySpeed, from = new Date()): string {
  const eta = new Date(from);
  if (speed === "express") {
    eta.setMinutes(eta.getMinutes() + 90);
    const time = eta.toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Today, by ${time}`;
  }
  // Standard: next 2–4 hour window, rounded to the hour.
  const start = new Date(from);
  start.setHours(start.getHours() + 2, 0, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 2);
  const dayLabel =
    start.getDate() === from.getDate() ? "Today" : "Tomorrow";
  const fmt = (d: Date) => d.toLocaleTimeString("en-PH", { hour: "numeric" });
  return `${dayLabel}, ${fmt(start)} – ${fmt(end)}`;
}

export function deliveryWindowNote(speed: DeliverySpeed): string {
  return DELIVERY_OPTIONS[speed].window;
}
