const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const pesoWhole = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** ₱1,250.00 */
export function formatPrice(value: number): string {
  return peso.format(value);
}

/** ₱1,250 — for large round figures like a free-delivery threshold. */
export function formatPriceWhole(value: number): string {
  return pesoWhole.format(value);
}

export function discountPercent(price: number, compareAt?: number): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

const unsplash = "https://images.unsplash.com";

/**
 * Build a sized Unsplash URL from a stored photo id.
 * `unoptimized` is on in next.config, so we ask the CDN for the right size here.
 */
export function photoUrl(
  photoId: string,
  opts: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 640, h, q = 72 } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `${unsplash}/${photoId}?${params.toString()}`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function pluralize(count: number, one: string, many = `${one}s`): string {
  return count === 1 ? one : many;
}

export function formatCount(count: number): string {
  return new Intl.NumberFormat("en-PH").format(count);
}
