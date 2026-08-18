export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
};

export type ProductVariant = {
  id: string;
  name: string;
  value: string;
  swatch?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection: string;
  materials: string[];
  dimensions: string;
  weight: string;
  leadTime: string;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Bestseller" | "Limited" | "Award-winning";
  featured: boolean;
  images: string[];
  finishes: ProductVariant[];
  upholstery?: ProductVariant[];
  inStock: boolean;
};

export const categories: Category[] = [
  {
    id: "cat-seating",
    name: "Seating",
    slug: "seating",
    description:
      "Sofas, lounge chairs, and ottomans sculpted for hours of repose. Each piece is hand-upholstered by master craftspeople.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80",
    productCount: 18,
  },
  {
    id: "cat-tables",
    name: "Tables",
    slug: "tables",
    description:
      "Dining, console, and coffee tables in solid hardwood and natural stone. Engineered to anchor a room for generations.",
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1600&q=80",
    productCount: 14,
  },
  {
    id: "cat-storage",
    name: "Storage",
    slug: "storage",
    description:
      "Cabinets, sideboards, and wardrobes with soft-close hardware and hand-finished veneers. Form meets quiet function.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    productCount: 11,
  },
  {
    id: "cat-beds",
    name: "Beds",
    slug: "beds",
    description:
      "Upholstered and solid-wood bed frames designed as the centerpiece of the master suite. Built for a lifetime of rest.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    productCount: 9,
  },
  {
    id: "cat-lighting",
    name: "Lighting",
    slug: "lighting",
    description:
      "Sculptural floor lamps, pendant lights, and sconces that cast a warm, considered glow across your interiors.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
    productCount: 12,
  },
  {
    id: "cat-decor",
    name: "Decor",
    slug: "decor",
    description:
      "Mirrors, sculptures, and objets d'art — the finishing touches that make a house unmistakably yours.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
    productCount: 16,
  },
];

export const collections: Collection[] = [
  {
    id: "col-heritage",
    name: "The Heritage Collection",
    slug: "heritage",
    tagline: "Timeless forms, eternal materials",
    description:
      "Inspired by the great houses of old, the Heritage Collection reimagines classical silhouettes with modern engineering. Solid teak, hand-carved detailing, and finishes that deepen with age.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "col-monolith",
    name: "The Monolith Series",
    slug: "monolith",
    tagline: "Architectural statements in stone and steel",
    description:
      "For the bold interior. The Monolith Series pairs raw natural stone with brushed blackened steel for furniture that reads as sculpture. Limited annual production.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "col-atelier",
    name: "The Atelier Line",
    slug: "atelier",
    tagline: "Bespoke upholstery, made to order",
    description:
      "Choose your frame, your fabric, your finish. Every Atelier piece is built to your specification by a single craftsperson, from first cut to final stitch.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "col-noir",
    name: "Noir",
    slug: "noir",
    tagline: "The dark side of luxury",
    description:
      "Smoked oak, blackened brass, and deep velvet. Noir is for those who understand that true luxury whispers, in the lowest register.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
];

const finishOptions: ProductVariant[] = [
  { id: "fin-natural-teak", name: "Finish", value: "Natural Teak", swatch: "#9b6b3a" },
  { id: "fin-smoked-oak", name: "Finish", value: "Smoked Oak", swatch: "#4a3a2a" },
  { id: "fin-walnut", name: "Finish", value: "American Walnut", swatch: "#5c3d2e" },
  { id: "fin-ebonized", name: "Finish", value: "Ebonized Ash", swatch: "#1a1a1d" },
  { id: "fin-ivory-lacquer", name: "Finish", value: "Ivory Lacquer", swatch: "#f5f3ef" },
];

const upholsteryOptions: ProductVariant[] = [
  { id: "up-boucle-ivory", name: "Upholstery", value: "Ivory Bouclé", swatch: "#e8e2d6" },
  { id: "up-velvet-emerald", name: "Upholstery", value: "Emerald Velvet", swatch: "#1e4d3b" },
  { id: "up-velvet-sapphire", name: "Upholstery", value: "Sapphire Velvet", swatch: "#1e3a5f" },
  { id: "up-leather-cognac", name: "Upholstery", value: "Cognac Aniline Leather", swatch: "#8b5a2b" },
  { id: "up-linen-charcoal", name: "Upholstery", value: "Charcoal Linen", swatch: "#2b2b30" },
  { id: "up-mohair-rust", name: "Upholstery", value: "Rust Mohair", swatch: "#a0522d" },
];

export const products: Product[] = [
  {
    id: "p-001",
    name: "Sovereign Lounge Sofa",
    slug: "sovereign-lounge-sofa",
    tagline: "A three-seater that commands the room",
    description:
      "The Sovereign is our flagship sofa — a deep, low-slung three-seater with a solid kiln-dried teak frame and hand-tied springs. Down-blend cushions wrapped in your choice of upholstery cradle the body in layered comfort. Each Sovereign is numbered and signed by the craftsperson who built it.",
    price: 485000,
    compareAtPrice: 540000,
    category: "seating",
    collection: "atelier",
    materials: ["Kiln-dried solid teak", "Hand-tied springs", "Down-blend cushions", "Hand-stitched upholstery"],
    dimensions: "240 × 98 × 72 cm",
    weight: "78 kg",
    leadTime: "8–10 weeks",
    rating: 4.9,
    reviewCount: 47,
    badge: "Bestseller",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions.slice(0, 3),
    upholstery: upholsteryOptions,
    inStock: true,
  },
  {
    id: "p-002",
    name: "Monolith Dining Table",
    slug: "monolith-dining-table",
    tagline: "A single slab of stone, suspended in steel",
    description:
      "The Monolith dining table is a feat of engineering — a 40mm honed Italian Calacatta marble slab appears to float above a blackened steel base. Seats eight comfortably. Each slab is book-matched and unique; no two Monolith tables are alike.",
    price: 720000,
    category: "tables",
    collection: "monolith",
    materials: ["Honed Calacatta marble", "Blackened brushed steel", "Leveling foot hardware"],
    dimensions: "280 × 120 × 75 cm",
    weight: "340 kg",
    leadTime: "12–14 weeks",
    rating: 5.0,
    reviewCount: 18,
    badge: "Award-winning",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1533020436903-9155af1b32c9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-marble-calacatta", name: "Stone", value: "Calacatta Gold Marble", swatch: "#e8e0d0" },
      { id: "fin-marble-nero", name: "Stone", value: "Nero Marquina Marble", swatch: "#1a1a1d" },
      { id: "fin-stone-travertine", name: "Stone", value: "Roman Travertine", swatch: "#c9b896" },
    ],
    inStock: true,
  },
  {
    id: "p-003",
    name: "Heritage Armchair",
    slug: "heritage-armchair",
    tagline: "Wingback silhouette, reimagined",
    description:
      "The Heritage armchair updates the classic wingback for the modern interior. A hand-carved solid walnut frame cradles a deep, single cushion. The signature rolled arms are upholstered by hand using traditional techniques passed down through three generations of our craftspeople.",
    price: 195000,
    category: "seating",
    collection: "heritage",
    materials: ["Solid American walnut", "Hand-carved detailing", "High-resilience foam core", "Down-blend wrap"],
    dimensions: "82 × 88 × 110 cm",
    weight: "32 kg",
    leadTime: "6–8 weeks",
    rating: 4.8,
    reviewCount: 63,
    badge: "Bestseller",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions.slice(1, 4),
    upholstery: upholsteryOptions,
    inStock: true,
  },
  {
    id: "p-004",
    name: "Atelier Sideboard",
    slug: "atelier-sideboard",
    tagline: "Storage as a gallery wall",
    description:
      "The Atelier sideboard is a long, low cabinet designed to display art and conceal clutter in equal measure. Three push-to-open doors reveal adjustable shelving in a hand-finished veneer interior. Soft-close throughout. Available in five exterior finishes.",
    price: 310000,
    category: "storage",
    collection: "atelier",
    materials: ["Hardwood veneer over MDF core", "Solid brass push-to-open hardware", "Adjustable interior shelving"],
    dimensions: "200 × 48 × 72 cm",
    weight: "95 kg",
    leadTime: "8–10 weeks",
    rating: 4.7,
    reviewCount: 29,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions,
    inStock: true,
  },
  {
    id: "p-005",
    name: "Noir Floor Lamp",
    slug: "noir-floor-lamp",
    tagline: "Sculptural light, cast in shadow",
    description:
      "The Noir floor lamp is a study in contrast — a slender blackened brass stem supports a hand-blown smoked glass shade. The light it casts is warm and directional, perfect for reading or for washing a textured wall in a soft glow. Dimmable.",
    price: 88000,
    category: "lighting",
    collection: "noir",
    materials: ["Blackened brushed brass", "Hand-blown smoked glass", "Dimmable LED module", "Braided fabric cord"],
    dimensions: "40 × 40 × 165 cm",
    weight: "11 kg",
    leadTime: "4–6 weeks",
    rating: 4.6,
    reviewCount: 41,
    badge: "New",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-brass-black", name: "Finish", value: "Blackened Brass", swatch: "#1a1a1d" },
      { id: "fin-brass-antique", name: "Finish", value: "Antique Brass", swatch: "#7a6342" },
    ],
    inStock: true,
  },
  {
    id: "p-006",
    name: "Herage Canopy Bed",
    slug: "heritage-canopy-bed",
    tagline: "A four-poster for the modern suite",
    description:
      "The Heritage canopy bed is a four-poster stripped to its essence — four slender solid teak posts support a minimalist frame, draped or left bare. The headboard is upholstered in your choice of fabric. A centerpiece that defines the room without overwhelming it.",
    price: 425000,
    category: "beds",
    collection: "heritage",
    materials: ["Solid kiln-dried teak", "Upholstered headboard", "Slatted solid wood support base"],
    dimensions: "180 × 220 × 210 cm (King)",
    weight: "120 kg",
    leadTime: "10–12 weeks",
    rating: 4.9,
    reviewCount: 22,
    badge: "Limited",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions.slice(0, 3),
    upholstery: upholsteryOptions.slice(0, 4),
    inStock: true,
  },
  {
    id: "p-007",
    name: "Monolith Coffee Table",
    slug: "monolith-coffee-table",
    tagline: "A boulder, polished to a mirror",
    description:
      "The Monolith coffee table is a single block of honed Nero Marquina marble, its top polished to a reflective sheen while the base retains a raw, cleft finish. The contrast between the two surfaces is the point. A sculptural anchor for any seating arrangement.",
    price: 245000,
    category: "tables",
    collection: "monolith",
    materials: ["Solid Nero Marquina marble", "Honed and polished finish", "Felt floor protectors"],
    dimensions: "120 × 70 × 38 cm",
    weight: "180 kg",
    leadTime: "8–10 weeks",
    rating: 4.8,
    reviewCount: 15,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-marble-nero", name: "Stone", value: "Nero Marquina", swatch: "#1a1a1d" },
      { id: "fin-marble-calacatta", name: "Stone", value: "Calacatta Gold", swatch: "#e8e0d0" },
    ],
    inStock: true,
  },
  {
    id: "p-008",
    name: "Atelier Ottoman",
    slug: "atelier-ottoman",
    tagline: "The perfect footrest, and so much more",
    description:
      "The Atelier ottoman is a versatile piece — extra seating, a footrest, or a casual coffee table with a tray. A solid wood frame, high-resilience foam, and your choice of upholstery. Pairs perfectly with the Heritage armchair.",
    price: 78000,
    category: "seating",
    collection: "atelier",
    materials: ["Solid hardwood frame", "High-resilience foam", "Down-blend top layer", "Hand-stitched upholstery"],
    dimensions: "70 × 50 × 42 cm",
    weight: "14 kg",
    leadTime: "4–6 weeks",
    rating: 4.7,
    reviewCount: 38,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions.slice(0, 2),
    upholstery: upholsteryOptions,
    inStock: true,
  },
  {
    id: "p-009",
    name: "Noir Console Table",
    slug: "noir-console-table",
    tagline: "A whisper in the hallway",
    description:
      "The Noir console is a narrow, wall-hugging table in smoked oak with a blackened steel stretcher. Designed for entryways and hallways where depth is limited but presence is not. The single drawer is lined in soft-touch felt.",
    price: 165000,
    category: "tables",
    collection: "noir",
    materials: ["Smoked oak veneer", "Blackened steel frame", "Soft-close felt-lined drawer"],
    dimensions: "140 × 35 × 80 cm",
    weight: "28 kg",
    leadTime: "6–8 weeks",
    rating: 4.6,
    reviewCount: 19,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-smoked-oak", name: "Finish", value: "Smoked Oak", swatch: "#4a3a2a" },
      { id: "fin-ebonized", name: "Finish", value: "Ebonized Ash", swatch: "#1a1a1d" },
    ],
    inStock: true,
  },
  {
    id: "p-010",
    name: "Heritage Wardrobe",
    slug: "heritage-wardrobe",
    tagline: "A room within a room",
    description:
      "The Heritage wardrobe is a full-height solid teak cabinet with two hanging compartments, a central shelving tower, and integrated soft-close drawers. The doors are panelled in solid wood and close with a whisper. Interior lighting is standard.",
    price: 540000,
    category: "storage",
    collection: "heritage",
    materials: ["Solid kiln-dried teak", "Soft-close hinges and drawers", "Integrated LED interior lighting", "Brass handles"],
    dimensions: "240 × 62 × 220 cm",
    weight: "210 kg",
    leadTime: "12–14 weeks",
    rating: 4.9,
    reviewCount: 12,
    badge: "Limited",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: finishOptions.slice(0, 3),
    inStock: true,
  },
  {
    id: "p-011",
    name: "Atelier Pendant Light",
    slug: "atelier-pendant-light",
    tagline: "A drop of warm light",
    description:
      "The Atelier pendant is a hand-blown opaline glass shade suspended from a slender brass stem. The light is diffuse and warm — ideal over a dining table or kitchen island. Adjustable drop length. Dimmable.",
    price: 62000,
    category: "lighting",
    collection: "atelier",
    materials: ["Hand-blown opaline glass", "Brushed brass stem", "Dimmable LED", "Adjustable cord"],
    dimensions: "30 × 30 × 40 cm (shade)",
    weight: "4 kg",
    leadTime: "3–5 weeks",
    rating: 4.5,
    reviewCount: 54,
    badge: "New",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-brass-brushed", name: "Finish", value: "Brushed Brass", swatch: "#b8995a" },
      { id: "fin-brass-antique", name: "Finish", value: "Antique Brass", swatch: "#7a6342" },
    ],
    inStock: true,
  },
  {
    id: "p-012",
    name: "Monolith Mirror",
    slug: "monolith-mirror",
    tagline: "Reflection, framed in stone",
    description:
      "The Monolith mirror is a full-length mirror set within a solid marble frame. The frame is honed flat, the mirror is beveled. Leans against a wall or can be wall-mounted. A sculptural presence that doubles the light in any room.",
    price: 185000,
    category: "decor",
    collection: "monolith",
    materials: ["Solid marble frame", "Beveled mirror glass", "Wall-mount hardware included"],
    dimensions: "90 × 8 × 180 cm",
    weight: "85 kg",
    leadTime: "8–10 weeks",
    rating: 4.7,
    reviewCount: 9,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
    ],
    finishes: [
      { id: "fin-marble-calacatta", name: "Stone", value: "Calacatta Gold", swatch: "#e8e0d0" },
      { id: "fin-marble-nero", name: "Stone", value: "Nero Marquina", swatch: "#1a1a1d" },
      { id: "fin-stone-travertine", name: "Stone", value: "Roman Travertine", swatch: "#c9b896" },
    ],
    inStock: true,
  },
];

// === Data access helpers ===

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.badge === "Bestseller");
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.badge === "New");
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, count);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPriceRange(items: Product[]): string | null {
  if (items.length === 0) return null;
  const prices = items.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? inr.format(min) : `${inr.format(min)} – ${inr.format(max)}`;
}
