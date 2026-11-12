// Mock sellers (the small businesses that take booths at pop-ups) and which
// booth each one has at each pop-up.

import type { Category } from "./popups";

export type Seller = {
  id: string;
  name: string;
  handle: string;
  category: Category;
  tagline: string;
  about: string;
  /** Aesthetic / vibe tags, e.g. "Cottagecore". */
  aesthetic: string[];
  /** What they sell, shown as product tiles. */
  sells: { name: string; price: string }[];
  priceRange: string;
  /** Three brand colours, used for avatar + mood tiles. */
  palette: [string, string, string];
};

export const sellers: Seller[] = [
  {
    id: "mei-ceramics",
    name: "Mei Ceramics",
    handle: "@meiceramics.sg",
    category: "Craft",
    tagline: "Wheel-thrown stoneware in speckled glazes",
    about:
      "Mei throws every piece by hand in her Bukit Merah studio. Expect quiet, earthy tableware that gets better with use.",
    aesthetic: ["Minimalist", "Earthy", "Wabi-sabi"],
    sells: [
      { name: "Mugs", price: "$38" },
      { name: "Bud vases", price: "$28" },
      { name: "Ring dishes", price: "$18" },
    ],
    priceRange: "$18–$65",
    palette: ["#a8846a", "#d9c7b2", "#f3ebe1"],
  },
  {
    id: "inkpot-studio",
    name: "Inkpot Studio",
    handle: "@inkpot.studio",
    category: "Arts & Prints",
    tagline: "Risograph prints of Singapore shophouses",
    about:
      "Two illustrators and one temperamental riso machine. Bright, layered prints of the corners of Singapore we love.",
    aesthetic: ["Playful", "Bold colour", "Local nostalgia"],
    sells: [
      { name: "Riso prints", price: "$25" },
      { name: "Zines", price: "$12" },
      { name: "Postcards", price: "$5" },
    ],
    priceRange: "$5–$40",
    palette: ["#e8574c", "#2b59c3", "#ffd23f"],
  },
  {
    id: "loom-and-lace",
    name: "Loom & Lace",
    handle: "@loomandlace",
    category: "Clothing",
    tagline: "Hand-woven linen tops and scarves",
    about:
      "Slow fashion woven on a floor loom. Breathable natural fibres in undyed and plant-dyed tones.",
    aesthetic: ["Slow fashion", "Neutral tones"],
    sells: [
      { name: "Linen tops", price: "$89" },
      { name: "Woven scarves", price: "$45" },
      { name: "Market totes", price: "$32" },
    ],
    priceRange: "$32–$120",
    palette: ["#9c8a6e", "#d8cbb5", "#f4efe6"],
  },
  {
    id: "sol-silver",
    name: "Sol Silver",
    handle: "@solsilver.co",
    category: "Jewellery",
    tagline: "Dainty pieces in recycled sterling silver",
    about:
      "Everyday jewellery cast from 100% recycled silver. Stackable, hypoallergenic and made to be worn in the shower.",
    aesthetic: ["Dainty", "Minimalist"],
    sells: [
      { name: "Stacking rings", price: "$29" },
      { name: "Huggie hoops", price: "$42" },
      { name: "Pendants", price: "$55" },
    ],
    priceRange: "$29–$90",
    palette: ["#7d868d", "#cfd4d8", "#f2f3f4"],
  },
  {
    id: "petal-press",
    name: "Petal Press",
    handle: "@petalpress.sg",
    category: "Arts & Prints",
    tagline: "Pressed-flower art and keepsakes",
    about:
      "Flowers from local gardens, pressed and preserved. Bring your own bouquet and they'll press it for you.",
    aesthetic: ["Cottagecore", "Soft pastel", "Botanical"],
    sells: [
      { name: "Framed florals", price: "$48" },
      { name: "Bookmarks", price: "$9" },
      { name: "Resin earrings", price: "$24" },
    ],
    priceRange: "$9–$80",
    palette: ["#d98a9c", "#9bbf8a", "#fff4e8"],
  },
  {
    id: "kopi-candle-co",
    name: "Kopi Candle Co.",
    handle: "@kopicandle",
    category: "Craft",
    tagline: "Soy candles that smell like the kopitiam",
    about:
      "Kaya toast, pandan, teh tarik. Hand-poured soy candles in reused kopi cups that bring back Saturday mornings.",
    aesthetic: ["Nostalgic", "Cosy"],
    sells: [
      { name: "Soy candles", price: "$28" },
      { name: "Wax melts", price: "$12" },
      { name: "Gift sets", price: "$60" },
    ],
    priceRange: "$12–$60",
    palette: ["#6b4226", "#d9a066", "#f3e3cc"],
  },
  {
    id: "retro-rack",
    name: "Retro Rack SG",
    handle: "@retrorack.sg",
    category: "Clothing",
    tagline: "Curated 90s and Y2K vintage",
    about:
      "Hand-picked vintage from Japan and Thailand. Graphic tees, baggy denim and windbreakers, all washed and mended.",
    aesthetic: ["Y2K", "Streetwear", "Vintage"],
    sells: [
      { name: "Graphic tees", price: "$25" },
      { name: "Vintage denim", price: "$48" },
      { name: "Windbreakers", price: "$55" },
    ],
    priceRange: "$20–$80",
    palette: ["#3d5afe", "#ff4081", "#ffe66d"],
  },
  {
    id: "gilded-moth",
    name: "Gilded Moth",
    handle: "@gildedmoth",
    category: "Jewellery",
    tagline: "Gold-plated statement earrings",
    about:
      "Big, bold and lightweight. Art-deco and insect-inspired pieces for when you want to be noticed.",
    aesthetic: ["Maximalist", "Vintage glam"],
    sells: [
      { name: "Statement earrings", price: "$45" },
      { name: "Hair clips", price: "$22" },
      { name: "Brooches", price: "$35" },
    ],
    priceRange: "$22–$70",
    palette: ["#b8901f", "#5b2a86", "#f5e6c4"],
  },
  {
    id: "paper-tiger",
    name: "Paper Tiger Bindery",
    handle: "@papertiger.bindery",
    category: "Craft",
    tagline: "Hand-bound notebooks and journals",
    about:
      "Coptic and Japanese stab-bound journals with covers made from offcut fabric and handmade paper.",
    aesthetic: ["Stationery", "Kraft", "Analog"],
    sells: [
      { name: "Notebooks", price: "$22" },
      { name: "Travel journals", price: "$38" },
      { name: "Washi tape", price: "$6" },
    ],
    priceRange: "$6–$45",
    palette: ["#2f4858", "#b5835a", "#efe1c6"],
  },
  {
    id: "batik-baru",
    name: "Batik Baru",
    handle: "@batikbaru",
    category: "Clothing",
    tagline: "Modern cuts in heritage batik",
    about:
      "Hand-stamped batik from Pekalongan made into relaxed shirts and dresses you'd actually wear on a Tuesday.",
    aesthetic: ["Heritage", "Vibrant"],
    sells: [
      { name: "Batik shirts", price: "$75" },
      { name: "Wrap dresses", price: "$95" },
      { name: "Scrunchies", price: "$10" },
    ],
    priceRange: "$10–$110",
    palette: ["#1b4965", "#e09f3e", "#9e2a2b"],
  },
  {
    id: "tiny-kiln",
    name: "Tiny Kiln",
    handle: "@tinykiln",
    category: "Craft",
    tagline: "Miniature clay food and figurines",
    about:
      "Thumb-sized clay char kway teow, kueh and dim sum, as magnets, keychains and earrings.",
    aesthetic: ["Kawaii", "Playful"],
    sells: [
      { name: "Food magnets", price: "$14" },
      { name: "Keychains", price: "$16" },
      { name: "Mini figurines", price: "$22" },
    ],
    priceRange: "$12–$30",
    palette: ["#e88f7d", "#8fcbb8", "#fff1c1"],
  },
  {
    id: "sea-glass-co",
    name: "Sea Glass Co.",
    handle: "@seaglass.co",
    category: "Jewellery",
    tagline: "Jewellery from beach-found sea glass",
    about:
      "Every piece starts as a shard picked up on Changi and Pulau Ubin beaches, wrapped in silver wire.",
    aesthetic: ["Coastal", "Breezy"],
    sells: [
      { name: "Necklaces", price: "$38" },
      { name: "Anklets", price: "$24" },
      { name: "Suncatchers", price: "$30" },
    ],
    priceRange: "$24–$60",
    palette: ["#2a6f97", "#7fc8c2", "#e8f4f2"],
  },
  {
    id: "line-and-leaf",
    name: "Line & Leaf",
    handle: "@lineandleaf",
    category: "Arts & Prints",
    tagline: "Botanical line-art prints",
    about:
      "Single-line drawings of tropical plants, printed on recycled card and linen tea towels.",
    aesthetic: ["Minimalist", "Botanical"],
    sells: [
      { name: "A4 prints", price: "$22" },
      { name: "Tea towels", price: "$18" },
      { name: "Greeting cards", price: "$6" },
    ],
    priceRange: "$6–$50",
    palette: ["#4f6d4a", "#c8c3a9", "#f4f1e6"],
  },
  {
    id: "thrift-theory",
    name: "Thrift Theory",
    handle: "@thrifttheory",
    category: "Clothing",
    tagline: "Upcycled patchwork pieces",
    about:
      "Old jeans and fabric scraps reborn as patchwork jackets and bucket hats. No two are the same.",
    aesthetic: ["Upcycled", "Eclectic"],
    sells: [
      { name: "Patchwork jackets", price: "$120" },
      { name: "Bucket hats", price: "$35" },
      { name: "Tote bags", price: "$28" },
    ],
    priceRange: "$28–$150",
    palette: ["#8d5524", "#2e86ab", "#f18f01"],
  },
  {
    id: "knotty-knits",
    name: "Knotty Knits",
    handle: "@knottyknits.sg",
    category: "Craft",
    tagline: "Crochet bags and plushies",
    about:
      "Chunky crochet bags, bucket hats and very huggable plushies, all hooked by hand.",
    aesthetic: ["Cottagecore", "Cosy", "Soft pastel"],
    sells: [
      { name: "Crochet bags", price: "$45" },
      { name: "Plushies", price: "$30" },
      { name: "Coasters", price: "$12" },
    ],
    priceRange: "$12–$60",
    palette: ["#c9707a", "#e5b8a8", "#ffe8d6"],
  },
  {
    id: "christabel-crafts",
    name: "Christabel Crafts",
    handle: "@christabelcrafts",
    category: "Craft",
    tagline: "Hand-painted totes and accessories",
    about:
      "Hand-painted canvas totes, pouches and badges in teal and cream. Custom names painted on the spot.",
    aesthetic: ["Hand-painted", "Calm"],
    sells: [
      { name: "Painted totes", price: "$35" },
      { name: "Pouches", price: "$18" },
      { name: "Badges", price: "$5" },
    ],
    priceRange: "$5–$45",
    palette: ["#356c6a", "#bbcecd", "#fbf6ee"],
  },
];

/** The signed-in business user's own seller profile. */
export const MY_SELLER_ID = "christabel-crafts";

export type LineupEntry = { sellerId: string; booth?: number };

// Booth numbers appear once the organiser releases the floor plan.
const lineups: Record<string, LineupEntry[]> = {
  "katong-makers-market": [
    { sellerId: "mei-ceramics", booth: 3 },
    { sellerId: "kopi-candle-co", booth: 5 },
    { sellerId: "paper-tiger", booth: 8 },
    { sellerId: "tiny-kiln", booth: 11 },
    { sellerId: "knotty-knits", booth: 12 },
    { sellerId: "christabel-crafts", booth: 14 },
    { sellerId: "petal-press", booth: 17 },
    { sellerId: "batik-baru", booth: 20 },
    { sellerId: "line-and-leaf", booth: 22 },
  ],
  "jewellery-showcase": [
    { sellerId: "sol-silver", booth: 2 },
    { sellerId: "gilded-moth", booth: 6 },
    { sellerId: "sea-glass-co", booth: 9 },
    { sellerId: "petal-press", booth: 13 },
    { sellerId: "tiny-kiln", booth: 16 },
  ],
  "sentosa-print-fair": [
    { sellerId: "inkpot-studio", booth: 1 },
    { sellerId: "line-and-leaf", booth: 4 },
    { sellerId: "petal-press", booth: 7 },
    { sellerId: "paper-tiger", booth: 10 },
    { sellerId: "sea-glass-co", booth: 15 },
  ],
  "arts-craft-showcase": [
    { sellerId: "mei-ceramics" },
    { sellerId: "paper-tiger" },
    { sellerId: "knotty-knits" },
    { sellerId: "kopi-candle-co" },
    { sellerId: "tiny-kiln" },
    { sellerId: "inkpot-studio" },
  ],
  "clothing-showcase": [
    { sellerId: "loom-and-lace" },
    { sellerId: "retro-rack" },
    { sellerId: "batik-baru" },
    { sellerId: "thrift-theory" },
  ],
  "jewellery-2-popup": [
    { sellerId: "sol-silver" },
    { sellerId: "gilded-moth" },
    { sellerId: "sea-glass-co" },
  ],
  "holland-vintage-swap": [
    { sellerId: "retro-rack" },
    { sellerId: "thrift-theory" },
    { sellerId: "loom-and-lace" },
  ],
  "new-year-makers-bazaar": [
    { sellerId: "mei-ceramics" },
    { sellerId: "kopi-candle-co" },
    { sellerId: "knotty-knits" },
    { sellerId: "batik-baru" },
    { sellerId: "inkpot-studio" },
    { sellerId: "petal-press" },
  ],
  "punggol-print-fair": [
    { sellerId: "inkpot-studio", booth: 3 },
    { sellerId: "line-and-leaf", booth: 6 },
    { sellerId: "christabel-crafts", booth: 7 },
    { sellerId: "petal-press", booth: 9 },
  ],
  "jurong-jewel-market": [
    { sellerId: "sol-silver", booth: 1 },
    { sellerId: "gilded-moth", booth: 5 },
    { sellerId: "sea-glass-co", booth: 8 },
  ],
};

export function getSeller(id: string) {
  return sellers.find((s) => s.id === id);
}

export function lineupFor(popupId: string): (LineupEntry & { seller: Seller })[] {
  return (lineups[popupId] ?? [])
    .map((e) => ({ ...e, seller: getSeller(e.sellerId)! }))
    .filter((e) => e.seller);
}

/** Have booth numbers been released for this pop-up? */
export function placementsReleased(popupId: string) {
  const l = lineups[popupId] ?? [];
  return l.length > 0 && l.every((e) => e.booth !== undefined);
}

/** Pop-ups a seller is part of, with their booth (if released). */
export function appearancesFor(sellerId: string) {
  return Object.entries(lineups).flatMap(([popupId, entries]) =>
    entries
      .filter((e) => e.sellerId === sellerId)
      .map((e) => ({ popupId, booth: e.booth })),
  );
}

/** Booth numbers already assigned to lineup sellers (excluding one seller). */
export function occupiedBooths(popupId: string, exceptSellerId?: string) {
  return (lineups[popupId] ?? [])
    .filter((e) => e.booth !== undefined && e.sellerId !== exceptSellerId)
    .map((e) => e.booth!);
}

export function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
