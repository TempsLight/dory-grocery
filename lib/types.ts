export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export type ProductTag =
  | "organic"
  | "new"
  | "popular"
  | "local"
  | "value"
  | "bestseller"
  | "vegan"
  | "chilled"
  | "frozen";

export type IllustrationKey =
  | "produce"
  | "meat-seafood"
  | "dairy-eggs"
  | "bakery"
  | "beverages"
  | "snacks"
  | "pantry"
  | "frozen"
  | "household"
  | "personal-care";

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  illustration: IllustrationKey;
  /** Soft background wash, an oklch() string. */
  tint: string;
  /** Deeper keyline used for the illustration linework. */
  ink: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // Category slug
  /** Human sub-grouping shown on the PDP + used loosely for "related". */
  aisle: string;
  /** Net size / weight / count, e.g. "1 L", "500 g", "12 pcs". */
  size: string;
  price: number;
  /** Was-price when the item is on promotion. */
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  availability: Availability;
  tags: ProductTag[];
  /** Curated Unsplash photo id (photo-XXXXX). Optional — falls back to art. */
  photoId?: string;
  short: string;
  description: string;
  /** 3–5 quick facts for the PDP. */
  highlights: string[];
  /** Loose keyword bag for the mock search index. */
  keywords: string[];
}

export interface CartLine {
  productId: string;
  quantity: number;
  /** ISO timestamp of when it was last touched — drives "recently added". */
  addedAt: number;
}

export type DeliverySpeed = "standard" | "express";

export type PaymentMethod = "cod" | "card" | "ewallet";

export type AddressType = "home" | "work" | "other";

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  addressType: AddressType;
  instructions?: string;
  speed: DeliverySpeed;
  payment: PaymentMethod;
}

export interface OrderLine {
  productId: string;
  name: string;
  brand: string;
  size: string;
  unitPrice: number;
  quantity: number;
  photoId?: string;
  illustration: IllustrationKey;
  tint: string;
}

export interface Order {
  id: string;
  placedAt: number;
  lines: OrderLine[];
  details: CheckoutDetails;
  totals: OrderTotals;
  /** Human ETA string computed at placement, e.g. "Today, 4–6 PM". */
  etaLabel: string;
}

export interface OrderTotals {
  itemCount: number;
  subtotal: number;
  savings: number;
  deliveryFee: number;
  deliveryLabel: string;
  freeDeliveryThreshold: number;
  amountToFreeDelivery: number;
  promoDiscount: number;
  total: number;
}
