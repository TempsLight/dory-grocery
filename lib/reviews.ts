import type { Product } from "@/lib/types";

export interface ReviewHighlight {
  author: string;
  initial: string;
  rating: number;
  when: string;
  text: string;
}

const AUTHORS = [
  "Andrea R.", "Miguel S.", "Joy T.", "Paolo V.", "Carla M.",
  "Nikko D.", "Bea L.", "Rafael C.", "Trina G.", "Kevin A.",
  "Marielle P.", "Josh B.",
];

const WHENS = ["2 days ago", "last week", "2 weeks ago", "last month", "a month ago"];

const GENERIC = [
  "Arrived on time and well-packed. No complaints.",
  "Exactly what I ordered — quality was as described.",
  "Good value for the price. Will reorder.",
  "Delivery was quick and the rider was friendly.",
  "Fresh and properly sealed. Became a regular buy for us.",
];

const BY_CATEGORY: Record<string, string[]> = {
  "fruits-vegetables": [
    "Ripened perfectly on the counter after two days.",
    "Not a single bruised piece in the bag.",
    "Tasted like it actually came from a market, not a warehouse.",
  ],
  "meat-seafood": [
    "Cut cleanly and the cold chain clearly held — still icy on arrival.",
    "No off smell at all, cooked up beautifully.",
    "Portioned evenly so everything finished cooking at the same time.",
  ],
  "dairy-eggs": [
    "Tastes noticeably fresher than the long-life stuff.",
    "Every egg intact, and the lay date was only two days old.",
    "Kept well past the date printed on it.",
  ],
  bakery: [
    "Still warm when it arrived. Gone by lunch.",
    "Proper crust, proper crumb. Worth it.",
    "Froze half of it sliced and it toasted up fine a week later.",
  ],
  beverages: [
    "Delivered cold, which I didn't expect. Nice touch.",
    "Exactly the taste I wanted, no weird aftertaste.",
    "Good to have this on the weekly order instead of a separate trip.",
  ],
  snacks: [
    "Arrived whole, not crushed into crumbs like other deliveries.",
    "Dangerously easy to finish in one sitting.",
    "The resealable pack actually keeps them crunchy.",
  ],
  pantry: [
    "Cooks up soft and fragrant — clearly fresh crop.",
    "A staple in our kitchen now. Reorder every few weeks.",
    "Sealed well and no pantry-moth surprises.",
  ],
  frozen: [
    "Still rock solid on arrival thanks to the insulated liner.",
    "Straight from freezer to pan, no fuss on a weeknight.",
    "Free-flowing in the bag so I only use what I need.",
  ],
  household: [
    "A little goes a long way — the bottle lasts ages.",
    "Does the job without a heavy perfume smell.",
    "Cheaper here than at my usual supermarket.",
  ],
  "personal-care": [
    "Gentle enough for daily use, no tightness after.",
    "No fragrance, which is exactly why I bought it.",
    "Repurchased twice now. Does what it says.",
  ],
};

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getReviewHighlights(product: Product, count = 3): ReviewHighlight[] {
  const seed = hash(product.id);
  const catPool = BY_CATEGORY[product.category] ?? [];
  const pool = [catPool[seed % catPool.length], ...GENERIC];

  return Array.from({ length: count }).map((_, i) => {
    const s = seed + i * 97;
    const author = AUTHORS[s % AUTHORS.length];
    // Skew individual review ratings around the product's average.
    const delta = [0, 0, -1, 0, 1][(s >> 3) % 5];
    const rating = Math.max(3, Math.min(5, Math.round(product.rating) + delta));
    return {
      author,
      initial: author[0],
      rating,
      when: WHENS[(s >> 2) % WHENS.length],
      text: i === 0 ? pool[0] : GENERIC[(s >> 4) % GENERIC.length],
    };
  });
}
