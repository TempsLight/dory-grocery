import type { Category, Product } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Categories                                                          */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    tagline: "Picked at the market this morning",
    illustration: "produce",
    tint: "oklch(0.955 0.043 148)",
    ink: "oklch(0.43 0.088 150)",
  },
  {
    slug: "meat-seafood",
    name: "Meat & Seafood",
    tagline: "Cut to order, chilled to the door",
    illustration: "meat-seafood",
    tint: "oklch(0.949 0.033 24)",
    ink: "oklch(0.5 0.13 22)",
  },
  {
    slug: "dairy-eggs",
    name: "Dairy & Eggs",
    tagline: "Creamery-fresh, kept cold the whole way",
    illustration: "dairy-eggs",
    tint: "oklch(0.957 0.05 92)",
    ink: "oklch(0.5 0.086 74)",
  },
  {
    slug: "bakery",
    name: "Bakery",
    tagline: "Baked before sunrise, never frozen",
    illustration: "bakery",
    tint: "oklch(0.953 0.045 70)",
    ink: "oklch(0.47 0.09 55)",
  },
  {
    slug: "beverages",
    name: "Beverages",
    tagline: "From cold brew to fizzy water",
    illustration: "beverages",
    tint: "oklch(0.947 0.032 210)",
    ink: "oklch(0.45 0.082 220)",
  },
  {
    slug: "snacks",
    name: "Snacks",
    tagline: "For the pantry and the road trip",
    illustration: "snacks",
    tint: "oklch(0.949 0.043 40)",
    ink: "oklch(0.5 0.12 38)",
  },
  {
    slug: "pantry",
    name: "Pantry",
    tagline: "Rice, oil, pasta and everything you build a meal on",
    illustration: "pantry",
    tint: "oklch(0.952 0.038 55)",
    ink: "oklch(0.46 0.076 52)",
  },
  {
    slug: "frozen",
    name: "Frozen",
    tagline: "Weeknight shortcuts, ready when you are",
    illustration: "frozen",
    tint: "oklch(0.944 0.03 232)",
    ink: "oklch(0.46 0.086 238)",
  },
  {
    slug: "household",
    name: "Household",
    tagline: "The unglamorous stuff you always run out of",
    illustration: "household",
    tint: "oklch(0.944 0.028 300)",
    ink: "oklch(0.46 0.078 300)",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    tagline: "Gentle daily basics for everyone at home",
    illustration: "personal-care",
    tint: "oklch(0.95 0.03 350)",
    ink: "oklch(0.5 0.09 350)",
  },
];

/* ------------------------------------------------------------------ */
/*  Products                                                            */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---- Fruits & Vegetables ---- */
  {
    id: "p-bananas",
    slug: "cavendish-bananas-1kg",
    name: "Cavendish Bananas",
    brand: "Dory Daily",
    category: "fruits-vegetables",
    aisle: "Fresh fruit",
    size: "1 kg (approx. 7–8 pcs)",
    price: 79,
    compareAtPrice: 95,
    rating: 4.7,
    reviewCount: 2140,
    availability: "in_stock",
    tags: ["popular", "value", "bestseller"],
    photoId: "photo-1587132137056-bfbf0166836e",
    short: "Sweet, everyday bananas at just the right ripeness for the week ahead.",
    description:
      "Grown in Davao and shipped straight to our chillers, these Cavendish bananas arrive a shade green so they ripen on your counter — not in a warehouse. Great for lunchboxes, smoothies and banana bread.",
    highlights: ["Ripens in 2–3 days at room temperature", "Sourced from Davao growers", "Sold by the kilo, hand-selected"],
    keywords: ["banana", "saging", "fruit", "smoothie", "potassium"],
  },
  {
    id: "p-apples",
    slug: "fuji-apples-1kg",
    name: "Fuji Apples",
    brand: "Golden Fields",
    category: "fruits-vegetables",
    aisle: "Fresh fruit",
    size: "1 kg (approx. 5–6 pcs)",
    price: 185,
    rating: 4.6,
    reviewCount: 884,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1560806887-1e4cd0b6cbd6",
    short: "Crisp, honey-sweet Fuji apples that hold up in slices and salads.",
    description:
      "Firm, juicy and low on tartness, Fuji is the crowd-pleaser apple. We store them cold from arrival so the crunch survives the trip to your kitchen.",
    highlights: ["Extra-crisp bite", "Stays fresh 2–3 weeks refrigerated", "No wax coating"],
    keywords: ["apple", "mansanas", "fruit", "snack", "fuji"],
  },
  {
    id: "p-tomatoes",
    slug: "vine-ripened-tomatoes-500g",
    name: "Vine-Ripened Tomatoes",
    brand: "Buenas Farms",
    category: "fruits-vegetables",
    aisle: "Fresh vegetables",
    size: "500 g",
    price: 72,
    rating: 4.4,
    reviewCount: 512,
    availability: "in_stock",
    tags: ["local"],
    photoId: "photo-1582284540020-8acbe03f4924",
    short: "Left on the vine longer for a deeper, less watery flavour.",
    description:
      "Picked ripe from farms in Benguet, these tomatoes are meant to be used within the week — sweet-tart and full of aroma for salads, salsa and sauce.",
    highlights: ["Vine-ripened, not gas-ripened", "From Benguet farms", "Best used within 5 days"],
    keywords: ["tomato", "kamatis", "vegetable", "salad", "sauce"],
  },
  {
    id: "p-spinach",
    slug: "baby-spinach-200g",
    name: "Baby Spinach",
    brand: "Buenas Farms",
    category: "fruits-vegetables",
    aisle: "Salad & leaves",
    size: "200 g",
    price: 120,
    rating: 4.5,
    reviewCount: 401,
    availability: "in_stock",
    tags: ["organic", "chilled", "vegan"],
    photoId: "photo-1576045057995-568f588f82fb",
    short: "Triple-washed tender leaves — no stems, no grit, ready to eat.",
    description:
      "Certified-organic baby spinach grown under net houses to keep pests out and pesticides unnecessary. Wilt it, blend it, or eat it straight from the bag.",
    highlights: ["Certified organic", "Triple-washed & ready to eat", "Keep at 1–4°C"],
    keywords: ["spinach", "kangkong", "salad", "greens", "organic"],
  },
  {
    id: "p-avocados",
    slug: "hass-avocados-3pcs",
    name: "Hass Avocados",
    brand: "Golden Fields",
    category: "fruits-vegetables",
    aisle: "Fresh fruit",
    size: "3 pcs",
    price: 195,
    compareAtPrice: 240,
    rating: 4.3,
    reviewCount: 296,
    availability: "in_stock",
    tags: ["popular", "vegan"],
    photoId: "photo-1519162808019-7de1683fa2ad",
    short: "Nutty, buttery Hass avocados sold firm so you choose the day.",
    description:
      "Small-seeded Hass with the richest flesh-to-pit ratio. They arrive firm; leave them out for 2–4 days and squeeze gently to check.",
    highlights: ["Ripens on the counter in 2–4 days", "Rich, low-fibre flesh", "Great for toast and dips"],
    keywords: ["avocado", "guacamole", "toast", "fruit", "healthy fats"],
  },
  {
    id: "p-carrots",
    slug: "sweet-carrots-1kg",
    name: "Sweet Carrots",
    brand: "Dory Daily",
    category: "fruits-vegetables",
    aisle: "Fresh vegetables",
    size: "1 kg",
    price: 68,
    rating: 4.5,
    reviewCount: 631,
    availability: "in_stock",
    tags: ["value", "local"],
    photoId: "photo-1598170845058-32b9d6a5da37",
    short: "Firm, mild and sweet — the workhorse of soups and stir-fries.",
    description:
      "Highland carrots from Nueva Vizcaya, topped and washed. Snappy raw, tender when braised, and they keep for weeks in the crisper.",
    highlights: ["Keeps 3–4 weeks refrigerated", "Tops removed to slow wilting", "From Nueva Vizcaya"],
    keywords: ["carrot", "karot", "vegetable", "soup", "stew"],
  },
  {
    id: "p-onions",
    slug: "red-onions-1kg",
    name: "Red Onions",
    brand: "Dory Daily",
    category: "fruits-vegetables",
    aisle: "Fresh vegetables",
    size: "1 kg",
    price: 95,
    rating: 4.2,
    reviewCount: 738,
    availability: "in_stock",
    tags: ["local"],
    photoId: "photo-1618512496248-a07fe83aa8cb",
    short: "The base of almost every Filipino dish, cured for a long shelf life.",
    description:
      "Red onions from the fields of Nueva Ecija, cured and dry-skinned so they store well. Sharp raw, sweet when caramelised.",
    highlights: ["Cured for storage", "Store somewhere cool and dark", "From Bongabon, Nueva Ecija"],
    keywords: ["onion", "sibuyas", "vegetable", "cooking", "adobo"],
  },
  {
    id: "p-bell-peppers",
    slug: "bell-pepper-trio-500g",
    name: "Bell Pepper Trio",
    brand: "Buenas Farms",
    category: "fruits-vegetables",
    aisle: "Fresh vegetables",
    size: "500 g (red, yellow, green)",
    price: 140,
    rating: 4.4,
    reviewCount: 187,
    availability: "low_stock",
    tags: ["new", "vegan"],
    photoId: "photo-1563565375-f3fdfdbefa83",
    short: "One of each colour — for fajitas, roasts and a brighter plate.",
    description:
      "A mixed pack of red, yellow and green capsicums. The red and yellow are sweeter and fully ripe; the green is crisper and a little grassy.",
    highlights: ["Three colours in one pack", "Greenhouse-grown", "Roast, grill or eat raw"],
    keywords: ["bell pepper", "capsicum", "atsal", "vegetable", "fajita"],
  },
  {
    id: "p-strawberries",
    slug: "la-trinidad-strawberries-250g",
    name: "La Trinidad Strawberries",
    brand: "Buenas Farms",
    category: "fruits-vegetables",
    aisle: "Berries",
    size: "250 g",
    price: 240,
    rating: 4.6,
    reviewCount: 143,
    availability: "low_stock",
    tags: ["local", "new"],
    photoId: "photo-1601004890684-d8cbf643f5f2",
    short: "Fragrant highland strawberries — limited pick, in season now.",
    description:
      "Grown in La Trinidad, Benguet and packed the same day they're picked. Delicate, so we pad the box and move it cold — eat within two days.",
    highlights: ["In season, limited daily stock", "Packed the day it's picked", "Eat within 48 hours"],
    keywords: ["strawberry", "berries", "dessert", "fruit", "baguio"],
  },

  /* ---- Meat & Seafood ---- */
  {
    id: "p-chicken-breast",
    slug: "skinless-chicken-breast-500g",
    name: "Skinless Chicken Breast",
    brand: "Harbor & Vine",
    category: "meat-seafood",
    aisle: "Poultry",
    size: "500 g (2 fillets)",
    price: 175,
    rating: 4.5,
    reviewCount: 1290,
    availability: "in_stock",
    tags: ["popular", "bestseller"],
    photoId: "photo-1604503468506-a8da13d82791",
    short: "Trimmed, boneless fillets — the blank canvas of weeknight dinners.",
    description:
      "Fresh (never frozen) chicken breast from poultry farms in Roxas, Isabela, trimmed of fat and portioned into two even fillets so they cook at the same rate.",
    highlights: ["Fresh, never frozen", "Antibiotic-free flock", "Vacuum-sealed, use within 3 days"],
    keywords: ["chicken", "manok", "breast", "protein", "poultry"],
  },
  {
    id: "p-salmon",
    slug: "norwegian-salmon-fillet-400g",
    name: "Norwegian Salmon Fillet",
    brand: "Harbor & Vine",
    category: "meat-seafood",
    aisle: "Fish & seafood",
    size: "400 g (2 portions)",
    price: 520,
    compareAtPrice: 610,
    rating: 4.7,
    reviewCount: 542,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1499125562588-29fb8a56b5d5",
    short: "Skin-on, pin-boned Atlantic salmon with a deep colour and clean smell.",
    description:
      "Flown in chilled and cut into two centre-cut portions. Skin left on for pan-searing; pin bones already removed.",
    highlights: ["Centre-cut portions, even thickness", "Pin-boned, skin on", "Best cooked within 2 days"],
    keywords: ["salmon", "fish", "seafood", "omega 3", "grill"],
  },
  {
    id: "p-ground-beef",
    slug: "lean-ground-beef-500g",
    name: "Lean Ground Beef",
    brand: "Harbor & Vine",
    category: "meat-seafood",
    aisle: "Beef & pork",
    size: "500 g",
    price: 285,
    rating: 4.4,
    reviewCount: 476,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1448907503123-67254d59ca4f",
    short: "90/10 grind — enough fat for flavour, not so much it swims.",
    description:
      "Coarsely ground chuck at a 90/10 lean-to-fat ratio. Holds together for burgers and browns cleanly for bolognese, picadillo and tacos.",
    highlights: ["90% lean, 10% fat", "Coarse grind", "Freeze on day of delivery if not using"],
    keywords: ["beef", "giniling", "ground", "burger", "bolognese"],
  },
  {
    id: "p-bangus",
    slug: "boneless-bangus-belly-350g",
    name: "Boneless Bangus Belly",
    brand: "Harbor & Vine",
    category: "meat-seafood",
    aisle: "Fish & seafood",
    size: "350 g (2 pcs)",
    price: 260,
    rating: 4.6,
    reviewCount: 358,
    availability: "in_stock",
    tags: ["local", "bestseller"],
    short: "The fattiest, most forgiving cut of milkfish — and no bones to pick.",
    description:
      "Deboned milkfish belly from the fishponds near the mouth of the Cagayan River, marinated lightly in vinegar and garlic. Fry it skin-side down for a crisp finish or bake it in foil.",
    highlights: ["Fully deboned belly cut", "Light vinegar-garlic marinade", "From Cagayan estuary fishponds"],
    keywords: ["bangus", "milkfish", "fish", "belly", "daing"],
  },

  /* ---- Dairy & Eggs ---- */
  {
    id: "p-milk",
    slug: "fresh-full-cream-milk-1l",
    name: "Fresh Full-Cream Milk",
    brand: "Meadowcrest",
    category: "dairy-eggs",
    aisle: "Milk & cream",
    size: "1 L",
    price: 98,
    rating: 4.6,
    reviewCount: 1732,
    availability: "in_stock",
    tags: ["bestseller", "chilled"],
    photoId: "photo-1634141510639-d691d86f47be",
    short: "Pasteurised, not UHT — the taste is closer to milk straight from the farm.",
    description:
      "Full-cream milk from a small dairy in Alicia, Isabela, gently pasteurised and bottled within a day. Shorter shelf life, better flavour.",
    highlights: ["Gently pasteurised, not UHT", "From a single Isabela dairy", "Keep below 4°C, use within 7 days"],
    keywords: ["milk", "gatas", "dairy", "coffee", "cereal"],
  },
  {
    id: "p-eggs",
    slug: "farm-fresh-eggs-12pcs",
    name: "Farm Fresh Eggs",
    brand: "Dory Daily",
    category: "dairy-eggs",
    aisle: "Eggs",
    size: "12 pcs (large)",
    price: 135,
    rating: 4.7,
    reviewCount: 2980,
    availability: "in_stock",
    tags: ["bestseller", "value"],
    photoId: "photo-1498654077810-12c21d4d6dc3",
    short: "Large brown eggs from cage-free hens, candled and dated.",
    description:
      "Collected daily from cage-free flocks in San Mateo, Isabela. Each carton is candled for cracks and stamped with the lay date.",
    highlights: ["Cage-free hens", "Candled for hairline cracks", "Lay date printed on every carton"],
    keywords: ["eggs", "itlog", "breakfast", "baking", "protein"],
  },
  {
    id: "p-greek-yogurt",
    slug: "greek-yogurt-plain-500g",
    name: "Plain Greek Yogurt",
    brand: "Meadowcrest",
    category: "dairy-eggs",
    aisle: "Yogurt",
    size: "500 g",
    price: 210,
    compareAtPrice: 245,
    rating: 4.5,
    reviewCount: 612,
    availability: "in_stock",
    tags: ["popular", "chilled"],
    photoId: "photo-1571212515416-fef01fc43637",
    short: "Strained thick with no gelatin, no sugar — just milk and cultures.",
    description:
      "Slow-strained for a spoon-standing texture and a clean tang. Unsweetened, so it works for breakfast bowls or in place of sour cream.",
    highlights: ["10 g protein per serving", "No added sugar or thickeners", "Live active cultures"],
    keywords: ["yogurt", "greek", "protein", "breakfast", "probiotic"],
  },
  {
    id: "p-cheddar",
    slug: "aged-cheddar-block-250g",
    name: "Aged Cheddar Block",
    brand: "Meadowcrest",
    category: "dairy-eggs",
    aisle: "Cheese",
    size: "250 g",
    price: 295,
    rating: 4.6,
    reviewCount: 288,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1683314573422-649a3c6ad784",
    short: "Twelve-month cheddar — sharp, crumbly and worth grating yourself.",
    description:
      "A firm block aged a full year for a proper bite and those little crunchy tyrosine crystals. Melts well but shines on a board.",
    highlights: ["Aged 12 months", "Block, not pre-shredded", "Rewrap tightly in wax paper"],
    keywords: ["cheese", "cheddar", "keso", "sandwich", "grate"],
  },
  {
    id: "p-butter",
    slug: "salted-creamery-butter-227g",
    name: "Salted Creamery Butter",
    brand: "Meadowcrest",
    category: "dairy-eggs",
    aisle: "Butter & spreads",
    size: "227 g",
    price: 185,
    rating: 4.7,
    reviewCount: 934,
    availability: "in_stock",
    tags: ["bestseller"],
    photoId: "photo-1589985270826-4b7bb135bc9d",
    short: "82% butterfat, churned in small batches — bakes and browns beautifully.",
    description:
      "A European-style butter with a higher fat content and lower water, so pastry stays flaky and pan sauces don't split. Lightly salted.",
    highlights: ["82% butterfat", "Small-batch churned", "Foil-wrapped to block fridge odours"],
    keywords: ["butter", "mantikilya", "baking", "toast", "dairy"],
  },

  /* ---- Bakery ---- */
  {
    id: "p-sourdough",
    slug: "country-sourdough-boule-600g",
    name: "Country Sourdough Boule",
    brand: "Santa Ana Bakehouse",
    category: "bakery",
    aisle: "Artisan bread",
    size: "600 g",
    price: 165,
    rating: 4.8,
    reviewCount: 421,
    availability: "in_stock",
    tags: ["local", "new", "bestseller"],
    photoId: "photo-1559811814-e2c57b5e69df",
    short: "A 36-hour naturally leavened loaf with a blistered, chewy crust.",
    description:
      "Made with a decades-old starter and a long cold ferment — open crumb, deep flavour and no commercial yeast. Baked at 4 a.m., delivered by noon.",
    highlights: ["36-hour natural ferment", "Just flour, water, salt, starter", "Best within 3 days; freezes well sliced"],
    keywords: ["sourdough", "bread", "tinapay", "bakery", "artisan"],
  },
  {
    id: "p-wheat-loaf",
    slug: "whole-wheat-sandwich-loaf-400g",
    name: "Whole Wheat Sandwich Loaf",
    brand: "Santa Ana Bakehouse",
    category: "bakery",
    aisle: "Sliced bread",
    size: "400 g (14 slices)",
    price: 88,
    rating: 4.3,
    reviewCount: 706,
    availability: "in_stock",
    tags: ["value"],
    short: "Soft-crumbed everyday loaf that actually tastes of wheat.",
    description:
      "Sixty percent whole-wheat flour for structure without the cardboard. Pre-sliced, no added preservatives, so keep it in the freezer if it'll last past day four.",
    highlights: ["60% whole-wheat flour", "No preservatives", "Pre-sliced"],
    keywords: ["bread", "wheat", "sandwich", "toast", "loaf"],
  },
  {
    id: "p-pandesal",
    slug: "hot-pandesal-12pcs",
    name: "Hot Pandesal",
    brand: "Santa Ana Bakehouse",
    category: "bakery",
    aisle: "Rolls & buns",
    size: "12 pcs",
    price: 60,
    rating: 4.7,
    reviewCount: 1512,
    availability: "in_stock",
    tags: ["local", "bestseller", "value"],
    short: "The morning staple — soft, slightly sweet, dusted with breadcrumbs.",
    description:
      "Baked in the first batch of the day and boxed while still warm. Split and toast with butter, or stuff with cheese and coffee-dunk the rest.",
    highlights: ["Baked at dawn", "Boxed warm", "Reheat 4 minutes at 160°C"],
    keywords: ["pandesal", "bread", "breakfast", "roll", "merienda"],
  },
  {
    id: "p-croissants",
    slug: "butter-croissants-4pcs",
    name: "Butter Croissants",
    brand: "Santa Ana Bakehouse",
    category: "bakery",
    aisle: "Pastry",
    size: "4 pcs",
    price: 180,
    rating: 4.6,
    reviewCount: 383,
    availability: "low_stock",
    tags: ["new"],
    short: "Laminated with real butter over three days — shatteringly crisp.",
    description:
      "A proper croissant: 27 layers, no margarine, no shortcuts. They travel best un-reheated; crisp them 5 minutes at 180°C before serving.",
    highlights: ["3-day lamination", "All-butter, no margarine", "Refresh 5 min at 180°C"],
    keywords: ["croissant", "pastry", "breakfast", "butter", "bakery"],
  },

  /* ---- Beverages ---- */
  {
    id: "p-cola-zero",
    slug: "cola-zero-sugar-1-5l",
    name: "Cola Zero Sugar",
    brand: "Sunburst",
    category: "beverages",
    aisle: "Soft drinks",
    size: "1.5 L",
    price: 85,
    rating: 4.2,
    reviewCount: 1904,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1622483767028-3f66f32aef97",
    short: "The full-sugar taste, none of the sugar — chilled and ready.",
    description:
      "A zero-sugar cola for the table and the merienda run. Delivered cold from our chillers so it's ready to pour on arrival.",
    highlights: ["Zero sugar, zero calories", "Delivered chilled", "Recyclable PET bottle"],
    keywords: ["cola", "soda", "softdrink", "coke", "zero"],
  },
  {
    id: "p-orange-juice",
    slug: "not-from-concentrate-orange-juice-1l",
    name: "Orange Juice, Not From Concentrate",
    brand: "Sunburst",
    category: "beverages",
    aisle: "Juice",
    size: "1 L",
    price: 145,
    compareAtPrice: 170,
    rating: 4.5,
    reviewCount: 651,
    availability: "in_stock",
    tags: ["chilled"],
    photoId: "photo-1621506289937-a8e4df240d0b",
    short: "Squeezed and chilled, never reconstituted — no added sugar or water.",
    description:
      "Pressed from Valencia oranges and pasteurised once. You'll see pulp settle at the bottom; that's the point. Shake and serve cold.",
    highlights: ["Not from concentrate", "No added sugar", "Some pulp — shake before pouring"],
    keywords: ["orange juice", "juice", "breakfast", "vitamin c", "drink"],
  },
  {
    id: "p-sparkling-water",
    slug: "sparkling-water-lime-330ml-6pack",
    name: "Sparkling Water, Lime",
    brand: "Sunburst",
    category: "beverages",
    aisle: "Water",
    size: "6 x 330 ml",
    price: 240,
    rating: 4.4,
    reviewCount: 274,
    availability: "in_stock",
    tags: ["new", "value"],
    photoId: "photo-1603569239784-0a4b159fa3dc",
    short: "Lightly carbonated, a whisper of lime, no sweeteners at all.",
    description:
      "A six-pack of cans for people who want the fizz without the syrup. Just carbonated water and natural lime essence.",
    highlights: ["Zero sugar, zero sweetener", "Natural lime essence", "Recyclable aluminium cans"],
    keywords: ["sparkling water", "seltzer", "soda water", "lime", "fizzy"],
  },
  {
    id: "p-coffee",
    slug: "barako-ground-coffee-250g",
    name: "Barako Ground Coffee",
    brand: "Cordillera Roastery",
    category: "beverages",
    aisle: "Coffee & tea",
    size: "250 g (medium grind)",
    price: 320,
    rating: 4.7,
    reviewCount: 489,
    availability: "in_stock",
    tags: ["local", "popular"],
    photoId: "photo-1524350876685-274059332603",
    short: "Bold Liberica beans, roasted this week at a small roastery in Santiago City.",
    description:
      "Single-origin barako with the woody, almost smoky character the variety is known for. Green beans trucked up from Cavite and roasted in small batches in Santiago City, stamped with the roast date.",
    highlights: ["Roasted weekly in Santiago City", "Medium grind for drip or press", "Roast date on every bag"],
    keywords: ["coffee", "kape", "barako", "ground", "brew"],
  },

  /* ---- Snacks ---- */
  {
    id: "p-potato-chips",
    slug: "sea-salt-potato-chips-150g",
    name: "Sea Salt Potato Chips",
    brand: "Crisp Republic",
    category: "snacks",
    aisle: "Chips & crisps",
    size: "150 g",
    price: 95,
    rating: 4.3,
    reviewCount: 1123,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1566478989037-eec170784d0b",
    short: "Kettle-cooked in small batches for that hard, uneven crunch.",
    description:
      "Thick-cut potatoes fried in sunflower oil and seasoned with nothing but flaky sea salt. Bag is nitrogen-flushed so they don't arrive as dust.",
    highlights: ["Kettle-cooked, extra crunchy", "Just potato, oil and salt", "Cooked in sunflower oil"],
    keywords: ["chips", "crisps", "potato", "snack", "salty"],
  },
  {
    id: "p-dark-chocolate",
    slug: "70-percent-dark-chocolate-bar-100g",
    name: "70% Dark Chocolate Bar",
    brand: "Crisp Republic",
    category: "snacks",
    aisle: "Chocolate & sweets",
    size: "100 g",
    price: 135,
    rating: 4.6,
    reviewCount: 402,
    availability: "in_stock",
    tags: ["vegan"],
    photoId: "photo-1623660053975-cf75a8be0908",
    short: "Single-origin Davao cacao, 70% — bitter enough to feel grown-up.",
    description:
      "Bean-to-bar chocolate made with Philippine cacao and cane sugar, nothing else. Snappy at room temperature, fruity on the finish.",
    highlights: ["Single-origin Davao cacao", "Two ingredients: cacao, sugar", "Dairy-free"],
    keywords: ["chocolate", "dark", "cacao", "tsokolate", "dessert"],
  },
  {
    id: "p-cashews",
    slug: "roasted-salted-cashews-200g",
    name: "Roasted & Salted Cashews",
    brand: "Crisp Republic",
    category: "snacks",
    aisle: "Nuts & trail mix",
    size: "200 g",
    price: 260,
    rating: 4.5,
    reviewCount: 337,
    availability: "in_stock",
    tags: ["value"],
    short: "Whole cashews, dry-roasted and salted — no broken bits at the bottom.",
    description:
      "Sorted for whole kernels, roasted without oil and lightly salted. Resealable pouch so the second half doesn't go soft.",
    highlights: ["Whole kernels, sorted", "Dry-roasted, no added oil", "Resealable pouch"],
    keywords: ["cashew", "nuts", "kasoy", "snack", "protein"],
  },
  {
    id: "p-crackers",
    slug: "multigrain-crackers-200g",
    name: "Multigrain Crackers",
    brand: "Crisp Republic",
    category: "snacks",
    aisle: "Crackers",
    size: "200 g",
    price: 110,
    rating: 4.2,
    reviewCount: 254,
    availability: "in_stock",
    tags: ["value"],
    short: "Seeded, savoury and sturdy enough for a proper cheese load.",
    description:
      "Baked with oats, sesame, flax and a little sunflower seed. Crisp, not crumbly, so they survive a scoop of dip.",
    highlights: ["Four grains and seeds", "Sturdy enough to dip", "Individually sleeved in threes"],
    keywords: ["crackers", "biscuit", "multigrain", "cheese", "snack"],
  },

  /* ---- Pantry ---- */
  {
    id: "p-jasmine-rice",
    slug: "premium-jasmine-rice-5kg",
    name: "Premium Jasmine Rice",
    brand: "Golden Fields",
    category: "pantry",
    aisle: "Rice & grains",
    size: "5 kg",
    price: 485,
    compareAtPrice: 540,
    rating: 4.8,
    reviewCount: 3410,
    availability: "in_stock",
    tags: ["bestseller", "value"],
    photoId: "photo-1586201375761-83865001e31c",
    short: "New-crop fragrant rice, milled here in the valley — cooks up soft with a jasmine aroma.",
    description:
      "Long-grain jasmine from Cagayan Valley paddies, milled from this season's harvest just down the road — the aroma fades with age, so fresh crop matters. Resealable woven sack.",
    highlights: ["Current-season Isabela crop", "Fragrant long grain", "Resealable 5 kg sack"],
    keywords: ["rice", "bigas", "jasmine", "grain", "staple"],
  },
  {
    id: "p-spaghetti",
    slug: "spaghetti-no5-1kg",
    name: "Spaghetti No. 5",
    brand: "Nonna Lucia",
    category: "pantry",
    aisle: "Pasta & noodles",
    size: "1 kg",
    price: 125,
    rating: 4.5,
    reviewCount: 812,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1551462147-ff29053bfc14",
    short: "Bronze-die durum pasta with a rough surface that grips sauce.",
    description:
      "Extruded through bronze dies and slow-dried, so the strands are pale-gold and slightly rough — exactly what a good ragù wants to cling to.",
    highlights: ["Bronze-die cut", "100% durum wheat semolina", "Slow-dried at low temperature"],
    keywords: ["spaghetti", "pasta", "noodles", "italian", "sauce"],
  },
  {
    id: "p-olive-oil",
    slug: "extra-virgin-olive-oil-500ml",
    name: "Extra Virgin Olive Oil",
    brand: "Casa Verde",
    category: "pantry",
    aisle: "Oil & vinegar",
    size: "500 ml",
    price: 395,
    rating: 4.6,
    reviewCount: 528,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1474979266404-7eaacbcd87c5",
    short: "Cold-pressed, peppery and grassy — a finishing oil, not just for the pan.",
    description:
      "First cold pressing from a single estate, bottled in dark glass to keep it from going stale. Harvest date on the back label.",
    highlights: ["First cold pressing", "Single-estate", "Dark glass bottle, harvest-dated"],
    keywords: ["olive oil", "cooking oil", "extra virgin", "salad", "pantry"],
  },
  {
    id: "p-peanut-butter",
    slug: "creamy-peanut-butter-340g",
    name: "Creamy Peanut Butter",
    brand: "Nonna Lucia",
    category: "pantry",
    aisle: "Spreads",
    size: "340 g",
    price: 175,
    rating: 4.4,
    reviewCount: 466,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1691480208637-6ed63aac6694",
    short: "Just peanuts and a pinch of salt — stir the oil back in and go.",
    description:
      "Roasted and ground in-country with no palm oil or added sugar. It separates because it's real; give it a stir before the first use.",
    highlights: ["No added sugar or palm oil", "Two ingredients", "Natural separation — stir before use"],
    keywords: ["peanut butter", "spread", "mani", "sandwich", "breakfast"],
  },
  {
    id: "p-honey",
    slug: "wildflower-honey-340g",
    name: "Wildflower Honey",
    brand: "Bee & Bloom",
    category: "pantry",
    aisle: "Sweeteners",
    size: "340 g",
    price: 280,
    rating: 4.7,
    reviewCount: 372,
    availability: "in_stock",
    tags: ["local"],
    photoId: "photo-1587049352851-8d4e89133924",
    short: "Raw, unfiltered wild honey from the Sierra Madre foothills — it will crystallise, and that's fine.",
    description:
      "Gathered by forest communities along the Sierra Madre range east of the valley, then strained only through mesh so the pollen stays in. Flavour shifts with the season's flowers. Warm the jar in water to de-crystallise.",
    highlights: ["Raw and unfiltered", "From the Sierra Madre foothills", "Crystallises naturally over time"],
    keywords: ["honey", "pulot", "sweetener", "raw", "tea"],
  },
  {
    id: "p-ramen",
    slug: "instant-ramen-cups-3pack",
    name: "Instant Ramen Cups",
    brand: "Kusina Ready",
    category: "pantry",
    aisle: "Instant meals",
    size: "3 x 75 g (tonkotsu)",
    price: 120,
    rating: 4.1,
    reviewCount: 903,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1612929633738-8fe44f7ec841",
    short: "The 3 a.m. classic, upgraded with a thicker noodle and a real pork broth base.",
    description:
      "A three-pack of cup ramen with non-fried noodles and a concentrated tonkotsu sachet. Add an egg and you've almost cooked.",
    highlights: ["Air-dried, non-fried noodles", "Concentrated broth sachet", "Ready in 4 minutes"],
    keywords: ["ramen", "instant noodles", "mami", "cup noodles", "quick meal"],
  },

  /* ---- Frozen ---- */
  {
    id: "p-frozen-peas",
    slug: "garden-peas-1kg",
    name: "Garden Peas",
    brand: "Frostline",
    category: "frozen",
    aisle: "Frozen vegetables",
    size: "1 kg",
    price: 145,
    rating: 4.4,
    reviewCount: 388,
    availability: "in_stock",
    tags: ["value", "frozen", "vegan"],
    photoId: "photo-1632640110804-58827a6b37fd",
    short: "Blanched and flash-frozen within hours of picking — sweeter than most 'fresh' peas.",
    description:
      "Frozen at peak sweetness so they don't turn starchy. Free-flowing in the bag, so you pour out exactly what you need and reseal.",
    highlights: ["Frozen within hours of harvest", "Free-flowing, reseal after use", "No blanching needed — straight into the pan"],
    keywords: ["peas", "gisantes", "frozen", "vegetable", "side"],
  },
  {
    id: "p-ice-cream",
    slug: "vanilla-bean-ice-cream-1-5l",
    name: "Vanilla Bean Ice Cream",
    brand: "Frostline",
    category: "frozen",
    aisle: "Ice cream & desserts",
    size: "1.5 L",
    price: 330,
    compareAtPrice: 385,
    rating: 4.6,
    reviewCount: 741,
    availability: "in_stock",
    tags: ["popular", "frozen"],
    photoId: "photo-1629385701021-fcd568a743e8",
    short: "Real vanilla seeds, a slow churn and a lower overrun — it eats dense.",
    description:
      "Made with fresh cream and whole vanilla pods (you'll see the specks). Less air whipped in means a heavier scoop and a cleaner finish.",
    highlights: ["Made with real vanilla pods", "Low overrun — dense scoop", "Delivered in an insulated liner"],
    keywords: ["ice cream", "sorbetes", "dessert", "vanilla", "frozen"],
  },
  {
    id: "p-siomai",
    slug: "chicken-pork-siomai-500g",
    name: "Chicken & Pork Siomai",
    brand: "Kusina Ready",
    category: "frozen",
    aisle: "Frozen ready meals",
    size: "500 g (approx. 20 pcs)",
    price: 260,
    rating: 4.5,
    reviewCount: 656,
    availability: "in_stock",
    tags: ["bestseller", "frozen", "local"],
    short: "Hand-wrapped dumplings with a chili-garlic sachet in the box.",
    description:
      "A 70/30 chicken-and-pork filling with water chestnut for crunch, wrapped in thin dumpling skin. Steam straight from frozen for 12 minutes.",
    highlights: ["Hand-wrapped", "Chili-garlic oil sachet included", "Steam from frozen, 12 minutes"],
    keywords: ["siomai", "dumpling", "dimsum", "frozen", "merienda"],
  },
  {
    id: "p-frozen-berries",
    slug: "frozen-mixed-berries-500g",
    name: "Frozen Mixed Berries",
    brand: "Frostline",
    category: "frozen",
    aisle: "Frozen fruit",
    size: "500 g",
    price: 295,
    rating: 4.4,
    reviewCount: 219,
    availability: "out_of_stock",
    tags: ["frozen", "vegan"],
    short: "Strawberry, blueberry, raspberry and blackcurrant — for smoothies and crumbles.",
    description:
      "A four-berry mix, individually quick-frozen so they don't clump into a brick. Blend from frozen or thaw for compote.",
    highlights: ["Four berries, IQF", "No added sugar", "Blend from frozen"],
    keywords: ["berries", "frozen fruit", "smoothie", "blueberry", "raspberry"],
  },

  /* ---- Household ---- */
  {
    id: "p-dish-soap",
    slug: "lemon-dish-soap-500ml",
    name: "Lemon Dish Soap",
    brand: "Northgate",
    category: "household",
    aisle: "Dishwashing",
    size: "500 ml",
    price: 89,
    rating: 4.4,
    reviewCount: 1288,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1590610994353-7b0e7546e681",
    short: "Cuts grease fast, rinses clean, and doesn't leave your hands squeaky-raw.",
    description:
      "A concentrated formula — a small squeeze makes a sink of suds. Plant-derived surfactants and a real lemon oil scent, not a synthetic candy one.",
    highlights: ["Concentrated — use less", "Plant-derived surfactants", "Bottle is 30% recycled plastic"],
    keywords: ["dish soap", "dishwashing liquid", "sabon", "kitchen", "cleaning"],
  },
  {
    id: "p-paper-towels",
    slug: "2-ply-paper-towels-6-rolls",
    name: "2-Ply Paper Towels",
    brand: "Northgate",
    category: "household",
    aisle: "Paper & disposables",
    size: "6 rolls (90 sheets each)",
    price: 240,
    rating: 4.3,
    reviewCount: 642,
    availability: "in_stock",
    tags: ["value"],
    photoId: "photo-1598046937985-11c320dfd379",
    short: "Absorbent, perforated into half-sheets so you don't over-pull.",
    description:
      "Two-ply and embossed for grip, with a half-sheet tear so a small spill doesn't cost a full sheet. Made from a mix of recycled and virgin fibre.",
    highlights: ["Half-sheet perforation", "Strong when wet", "Plastic-free wrap"],
    keywords: ["paper towels", "tissue", "kitchen roll", "cleaning", "disposable"],
  },
  {
    id: "p-detergent",
    slug: "active-fresh-laundry-detergent-2l",
    name: "Active Fresh Laundry Detergent",
    brand: "Northgate",
    category: "household",
    aisle: "Laundry",
    size: "2 L (approx. 40 washes)",
    price: 365,
    compareAtPrice: 420,
    rating: 4.5,
    reviewCount: 977,
    availability: "in_stock",
    tags: ["value", "popular"],
    photoId: "photo-1626806819282-2c1dc01a5e0c",
    short: "Low-suds liquid that works in cold water and hand-wash alike.",
    description:
      "Enzyme-based so it lifts sweat and oil at 30°C, which saves on water heating. Dosing cap marked for regular and heavy loads.",
    highlights: ["Works in cold water", "~40 washes per bottle", "Marked dosing cap"],
    keywords: ["detergent", "laundry soap", "sabon", "washing", "clothes"],
  },
  {
    id: "p-bath-tissue",
    slug: "bamboo-bath-tissue-12-rolls",
    name: "Bamboo Bath Tissue",
    brand: "Northgate",
    category: "household",
    aisle: "Paper & disposables",
    size: "12 rolls (3-ply)",
    price: 310,
    rating: 4.4,
    reviewCount: 531,
    availability: "in_stock",
    tags: ["new"],
    short: "Three-ply, made from fast-growing bamboo instead of hardwood pulp.",
    description:
      "Soft but strong, unbleached-adjacent (it's a pale cream, not stark white), and wrapped in paper not plastic. Septic-safe and quick to break down.",
    highlights: ["100% bamboo pulp", "3-ply, plastic-free wrap", "Septic-safe"],
    keywords: ["toilet paper", "bath tissue", "bathroom", "bamboo", "tissue"],
  },

  /* ---- Personal Care ---- */
  {
    id: "p-shampoo",
    slug: "daily-moisture-shampoo-400ml",
    name: "Daily Moisture Shampoo",
    brand: "Pure Kind",
    category: "personal-care",
    aisle: "Hair care",
    size: "400 ml",
    price: 235,
    rating: 4.3,
    reviewCount: 588,
    availability: "in_stock",
    tags: ["popular"],
    photoId: "photo-1602143407151-7111542de6e8",
    short: "Sulphate-free lather with aloe and coconut — safe for colour and daily use.",
    description:
      "A gentle everyday shampoo that cleans without stripping. No sulphates, silicones or added dye; a light coconut-vanilla scent that rinses away.",
    highlights: ["Sulphate- and silicone-free", "Colour-safe", "Aloe + coconut oil"],
    keywords: ["shampoo", "hair", "sabon sa buhok", "bath", "sulphate free"],
  },
  {
    id: "p-hand-soap",
    slug: "antibacterial-hand-soap-250ml",
    name: "Antibacterial Hand Soap",
    brand: "Pure Kind",
    category: "personal-care",
    aisle: "Bath & body",
    size: "250 ml pump",
    price: 95,
    rating: 4.5,
    reviewCount: 812,
    availability: "in_stock",
    tags: ["value"],
    short: "A proper foaming pump that kills germs without drying skin to paper.",
    description:
      "Glycerin-rich so hands don't crack after the tenth wash of the day. Mild fragrance, and the pump doses a coin-sized amount of foam.",
    highlights: ["Added glycerin", "Foaming pump — less waste", "Refillable bottle"],
    keywords: ["hand soap", "hand wash", "sabon", "bathroom", "hygiene"],
  },
  {
    id: "p-toothpaste",
    slug: "fresh-mint-toothpaste-150g",
    name: "Fresh Mint Toothpaste",
    brand: "Pure Kind",
    category: "personal-care",
    aisle: "Oral care",
    size: "150 g",
    price: 120,
    rating: 4.4,
    reviewCount: 934,
    availability: "in_stock",
    tags: ["value"],
    short: "Fluoride toothpaste with a mint that's cooling, not eye-watering.",
    description:
      "Standard 1450 ppm fluoride for cavity protection, a mild abrasive that won't wear enamel, and no SLS so it doesn't foam over. Recyclable tube.",
    highlights: ["1450 ppm fluoride", "SLS-free, low foam", "Recyclable tube"],
    keywords: ["toothpaste", "colgate", "oral care", "mint", "dental"],
  },
  {
    id: "p-bar-soap",
    slug: "sensitive-bar-soap-3x90g",
    name: "Sensitive Bar Soap",
    brand: "Pure Kind",
    category: "personal-care",
    aisle: "Bath & body",
    size: "3 x 90 g",
    price: 135,
    rating: 4.6,
    reviewCount: 445,
    availability: "in_stock",
    tags: ["value"],
    short: "Fragrance-free, dye-free cleansing bar for faces and bodies that react to everything.",
    description:
      "A syndet bar (not true soap) at skin-friendly pH, with a quarter of it moisturising cream. No fragrance, no dye, no essential oils.",
    highlights: ["Fragrance- and dye-free", "pH-balanced syndet bar", "¼ moisturising cream"],
    keywords: ["soap", "bar soap", "sabon", "sensitive skin", "bath"],
  },
];

/* ------------------------------------------------------------------ */
/*  Lookups                                                             */
/* ------------------------------------------------------------------ */

const productById = new Map(products.map((p) => [p.id, p]));
const productBySlug = new Map(products.map((p) => [p.slug, p]));
const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getProductById(id: string): Product | undefined {
  return productById.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getCategoryName(slug: string): string {
  return categoryBySlug.get(slug)?.name ?? slug;
}

export function categoryProductCount(slug: string): number {
  return products.reduce((n, p) => (p.category === slug ? n + 1 : n), 0);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getDeals(): Product[] {
  return products
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .sort(
      (a, b) =>
        (b.compareAtPrice! - b.price) / b.compareAtPrice! -
        (a.compareAtPrice! - a.price) / a.compareAtPrice!,
    );
}

export function getPopular(limit = 8): Product[] {
  return [...products]
    .filter((p) => p.tags.includes("popular") || p.tags.includes("bestseller"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.tags.includes("new")).slice(0, limit);
}

const FEATURED_IDS = [
  "p-sourdough",
  "p-salmon",
  "p-strawberries",
  "p-coffee",
  "p-jasmine-rice",
  "p-greek-yogurt",
];

export function getFeatured(): Product[] {
  return FEATURED_IDS.map((id) => productById.get(id)).filter(
    (p): p is Product => Boolean(p),
  );
}

export function getBestsellers(limit = 12): Product[] {
  return [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  const sameAisle = products.filter(
    (p) => p.id !== product.id && p.aisle === product.aisle,
  );
  const sameCategory = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category &&
      p.aisle !== product.aisle,
  );
  const picked = [...sameAisle, ...sameCategory];

  if (picked.length < limit) {
    const seen = new Set([product.id, ...picked.map((p) => p.id)]);
    for (const p of getBestsellers(20)) {
      if (picked.length >= limit) break;
      if (!seen.has(p.id)) {
        picked.push(p);
        seen.add(p.id);
      }
    }
  }

  return picked.slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Search                                                              */
/* ------------------------------------------------------------------ */

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return products
    .map((p) => {
      const haystack = [
        p.name,
        p.brand,
        getCategoryName(p.category),
        p.aisle,
        ...p.keywords,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { p, score: -1 };
        if (p.name.toLowerCase().includes(term)) score += 5;
        if (p.keywords.some((k) => k.includes(term))) score += 3;
        if (p.brand.toLowerCase().includes(term)) score += 2;
        score += 1;
      }
      if (p.name.toLowerCase().startsWith(q)) score += 6;
      return { p, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score || b.p.reviewCount - a.p.reviewCount)
    .map((r) => r.p);
}

export interface SearchSuggestion {
  type: "product" | "category";
  label: string;
  href: string;
  hint?: string;
}

export function searchSuggestions(query: string, limit = 6): SearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const catHits: SearchSuggestion[] = categories
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 2)
    .map((c) => ({
      type: "category",
      label: c.name,
      href: `/category/${c.slug}`,
      hint: "Category",
    }));

  const productHits: SearchSuggestion[] = searchProducts(query)
    .slice(0, limit - catHits.length)
    .map((p) => ({
      type: "product",
      label: p.name,
      href: `/product/${p.slug}`,
      hint: p.brand,
    }));

  return [...catHits, ...productHits];
}

/* ------------------------------------------------------------------ */
/*  Filter + sort                                                       */
/* ------------------------------------------------------------------ */

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export interface ProductFilters {
  sort: SortValue;
  maxPrice?: number;
  brands: string[];
  tags: string[];
  minRating?: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

export const DEFAULT_FILTERS: ProductFilters = {
  sort: "recommended",
  brands: [],
  tags: [],
  inStockOnly: false,
  onSaleOnly: false,
};

const NEW_ORDER = products.map((p) => p.id);

export function filterAndSortProducts(
  input: Product[],
  filters: ProductFilters,
): Product[] {
  let list = input.filter((p) => {
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (filters.tags.length && !filters.tags.some((t) => p.tags.includes(t as never)))
      return false;
    if (filters.minRating != null && p.rating < filters.minRating) return false;
    if (filters.inStockOnly && p.availability === "out_of_stock") return false;
    if (filters.onSaleOnly && !(p.compareAtPrice && p.compareAtPrice > p.price))
      return false;
    return true;
  });

  const inStockRank = (p: Product) => (p.availability === "out_of_stock" ? 1 : 0);

  switch (filters.sort) {
    case "price-asc":
      list = list.sort((a, b) => inStockRank(a) - inStockRank(b) || a.price - b.price);
      break;
    case "price-desc":
      list = list.sort((a, b) => inStockRank(a) - inStockRank(b) || b.price - a.price);
      break;
    case "rating":
      list = list.sort(
        (a, b) => inStockRank(a) - inStockRank(b) || b.rating - a.rating,
      );
      break;
    case "popular":
      list = list.sort(
        (a, b) => inStockRank(a) - inStockRank(b) || b.reviewCount - a.reviewCount,
      );
      break;
    case "newest":
      list = list.sort(
        (a, b) =>
          inStockRank(a) - inStockRank(b) ||
          Number(b.tags.includes("new")) - Number(a.tags.includes("new")) ||
          NEW_ORDER.indexOf(b.id) - NEW_ORDER.indexOf(a.id),
      );
      break;
    default:
      // "recommended": in-stock first, then bestsellers, then rating
      list = list.sort(
        (a, b) =>
          inStockRank(a) - inStockRank(b) ||
          Number(b.tags.includes("bestseller")) -
            Number(a.tags.includes("bestseller")) ||
          b.rating * Math.log10(b.reviewCount + 10) -
            a.rating * Math.log10(a.reviewCount + 10),
      );
  }

  return list;
}

export function getBrandsForProducts(list: Product[]): string[] {
  return [...new Set(list.map((p) => p.brand))].sort();
}

export function getPriceBounds(list: Product[]): { min: number; max: number } {
  if (!list.length) return { min: 0, max: 0 };
  const prices = list.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export const TAG_LABELS: Record<string, string> = {
  organic: "Organic",
  new: "New",
  popular: "Popular",
  local: "Locally sourced",
  value: "Great value",
  bestseller: "Bestseller",
  vegan: "Plant-based",
  chilled: "Keep chilled",
  frozen: "Keep frozen",
};
