import { getProductById } from "@/lib/catalog";
import type {
  CartLine,
  DeliverySpeed,
  OrderTotals,
  Product,
} from "@/lib/types";

export const FREE_DELIVERY_THRESHOLD = 1500;
export const MAX_QTY_PER_LINE = 24;

export const DELIVERY_OPTIONS: Record<
  DeliverySpeed,
  { fee: number; title: string; window: string; note: string }
> = {
  standard: {
    fee: 59,
    title: "Standard delivery",
    window: "Same day · 2–4 hour window",
    note: `Free on orders over ₱${FREE_DELIVERY_THRESHOLD.toLocaleString("en-PH")}`,
  },
  express: {
    fee: 129,
    title: "Express delivery",
    window: "Priority · within 90 minutes",
    note: "Fastest available couriers",
  },
};

export interface Promo {
  code: string;
  kind: "flat" | "percent";
  amount: number;
  minSubtotal: number;
  maxDiscount?: number;
  label: string;
}

export const PROMOS: Record<string, Promo> = {
  FRESH50: {
    code: "FRESH50",
    kind: "flat",
    amount: 50,
    minSubtotal: 750,
    label: "₱50 off a basket of ₱750 or more",
  },
  DORY10: {
    code: "DORY10",
    kind: "percent",
    amount: 10,
    minSubtotal: 500,
    maxDiscount: 200,
    label: "10% off (up to ₱200) a basket of ₱500 or more",
  },
};

export interface ResolvedLine extends CartLine {
  product: Product;
  lineTotal: number;
  lineSavings: number;
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      const lineTotal = product.price * line.quantity;
      const lineSavings = product.compareAtPrice
        ? Math.max(0, product.compareAtPrice - product.price) * line.quantity
        : 0;
      return { ...line, product, lineTotal, lineSavings };
    })
    .filter((l): l is ResolvedLine => l !== null);
}

export interface PromoResult {
  applied: Promo | null;
  discount: number;
  /** Set when a code was entered but can't be applied yet. */
  message?: string;
}

export function evaluatePromo(
  code: string | null,
  subtotal: number,
): PromoResult {
  if (!code) return { applied: null, discount: 0 };
  const promo = PROMOS[code.toUpperCase()];
  if (!promo) {
    return { applied: null, discount: 0, message: "That code isn’t valid." };
  }
  if (subtotal < promo.minSubtotal) {
    return {
      applied: null,
      discount: 0,
      message: `Spend ₱${(promo.minSubtotal - subtotal).toLocaleString("en-PH")} more to use ${promo.code}.`,
    };
  }
  let discount =
    promo.kind === "flat"
      ? promo.amount
      : Math.round((subtotal * promo.amount) / 100);
  if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
  discount = Math.min(discount, subtotal);
  return { applied: promo, discount };
}

export interface TotalsInput {
  lines: CartLine[];
  speed: DeliverySpeed;
  promoCode: string | null;
}

export function computeTotals({
  lines,
  speed,
  promoCode,
}: TotalsInput): OrderTotals & { promo: PromoResult } {
  const resolved = resolveLines(lines);
  const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
  const savings = resolved.reduce((sum, l) => sum + l.lineSavings, 0);
  const itemCount = resolved.reduce((sum, l) => sum + l.quantity, 0);

  const promo = evaluatePromo(promoCode, subtotal);

  const delivery = DELIVERY_OPTIONS[speed];
  const qualifiesFree = speed === "standard" && subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = itemCount === 0 || qualifiesFree ? 0 : delivery.fee;

  const amountToFreeDelivery =
    speed === "standard" && subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD
      ? FREE_DELIVERY_THRESHOLD - subtotal
      : 0;

  const total = Math.max(0, subtotal - promo.discount + deliveryFee);

  return {
    itemCount,
    subtotal,
    savings,
    deliveryFee,
    deliveryLabel: qualifiesFree ? "Free" : delivery.title,
    freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
    amountToFreeDelivery,
    promoDiscount: promo.discount,
    total,
    promo,
  };
}

/* ---- reducer ---- */

export interface CartState {
  lines: CartLine[];
  promoCode: string | null;
  speed: DeliverySpeed;
}

export const initialCartState: CartState = {
  lines: [],
  promoCode: null,
  speed: "standard",
};

export type CartAction =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; productId: string; quantity?: number }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "setPromo"; code: string | null }
  | { type: "setSpeed"; speed: DeliverySpeed };

function clampQty(n: number): number {
  return Math.max(0, Math.min(MAX_QTY_PER_LINE, Math.round(n)));
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "add": {
      const qty = action.quantity ?? 1;
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        const next = clampQty(existing.quantity + qty);
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.productId === action.productId
              ? { ...l, quantity: next, addedAt: Date.now() }
              : l,
          ),
        };
      }
      return {
        ...state,
        lines: [
          ...state.lines,
          { productId: action.productId, quantity: clampQty(qty), addedAt: Date.now() },
        ],
      };
    }

    case "setQuantity": {
      const qty = clampQty(action.quantity);
      if (qty <= 0) {
        return {
          ...state,
          lines: state.lines.filter((l) => l.productId !== action.productId),
        };
      }
      const exists = state.lines.some((l) => l.productId === action.productId);
      if (!exists) {
        return {
          ...state,
          lines: [
            ...state.lines,
            { productId: action.productId, quantity: qty, addedAt: Date.now() },
          ],
        };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, quantity: qty } : l,
        ),
      };
    }

    case "remove":
      return {
        ...state,
        lines: state.lines.filter((l) => l.productId !== action.productId),
      };

    case "clear":
      return { ...state, lines: [], promoCode: null };

    case "setPromo":
      return { ...state, promoCode: action.code };

    case "setSpeed":
      return { ...state, speed: action.speed };

    default:
      return state;
  }
}
