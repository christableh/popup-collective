// Mock pop-up events. Everything here is fake but realistic enough to demo the
// full browse → book → manage flow without a real backend.

export type Category = "Craft" | "Arts & Prints" | "Jewellery" | "Clothing";

export const categories: Category[] = [
  "Craft",
  "Arts & Prints",
  "Jewellery",
  "Clothing",
];

/**
 * The app's notion of "today". Pinned so the demo always looks the same
 * (and so server and client renders agree).
 */
export const TODAY = "2026-11-12";

type PopUpInput = {
  id: string;
  name: string;
  category: Category;
  /** Start date, YYYY-MM-DD. */
  date: string;
  /** Last day for multi-day events, YYYY-MM-DD. */
  endDate?: string;
  startTime: string;
  endTime: string;
  venue: string;
  /** Organiser running the pop-up. */
  vendor: string;
  description: string;
  /** Price of a standard 2×2m booth, SGD. */
  boothPrice: number;
  expectedAttendance: number;
  rating: number;
  boothsTotal: number;
  /** Booths already taken by other (fake) sellers. */
  boothsTaken: number;
  /** Pin position (px) on the 310×236 basemap. */
  pin: { left: number; top: number };
};

export type PopUp = PopUpInput & {
  /** Human-readable date & time, e.g. "Sat 21 Nov · 11am–7pm". */
  dateTime: string;
};

const input: PopUpInput[] = [
  {
    id: "katong-makers-market",
    name: "Katong Makers Market",
    category: "Craft",
    date: "2026-11-12",
    endDate: "2026-11-15",
    startTime: "11:00",
    endTime: "19:00",
    venue: "Joo Chiat Road, Katong",
    vendor: "Katong Makers Co.",
    description:
      "Four days of handmade ceramics, candles and leather goods along the shophouses of Joo Chiat.",
    boothPrice: 120,
    expectedAttendance: 700,
    rating: 4.4,
    boothsTotal: 26,
    boothsTaken: 20,
    pin: { left: 186, top: 106 },
  },
  {
    id: "jewellery-showcase",
    name: "Jewellery Showcase",
    category: "Jewellery",
    date: "2026-11-21",
    startTime: "11:00",
    endTime: "19:00",
    venue: "Arab Street, Kampong Glam",
    vendor: "Gilded Hands Co.",
    description:
      "Independent jewellers and metalsmiths showing new collections, with live engraving and ring-sizing.",
    boothPrice: 180,
    expectedAttendance: 1200,
    rating: 4.6,
    boothsTotal: 24,
    boothsTaken: 17,
    pin: { left: 155, top: 104 },
  },
  {
    id: "sentosa-print-fair",
    name: "Seaside Print Fair",
    category: "Arts & Prints",
    date: "2026-11-22",
    startTime: "15:00",
    endTime: "21:00",
    venue: "Palawan Green, Sentosa",
    vendor: "Inkwell Collective",
    description:
      "Risograph zines, posters and illustration prints on the lawn, with a sunset screen-printing demo.",
    boothPrice: 160,
    expectedAttendance: 1100,
    rating: 4.5,
    boothsTotal: 22,
    boothsTaken: 12,
    pin: { left: 151, top: 137 },
  },
  {
    id: "arts-craft-showcase",
    name: "Arts & Craft Showcase",
    category: "Craft",
    date: "2026-11-28",
    endDate: "2026-11-29",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Tiong Bahru Market Courtyard",
    vendor: "Tiong Bahru Makers Guild",
    description:
      "A weekend showcase of woodwork, textiles and paper craft, with drop-in workshops for families.",
    boothPrice: 150,
    expectedAttendance: 900,
    rating: 4.3,
    boothsTotal: 30,
    boothsTaken: 21,
    pin: { left: 135, top: 114 },
  },
  {
    id: "clothing-showcase",
    name: "Clothing Showcase",
    category: "Clothing",
    date: "2026-12-05",
    startTime: "12:00",
    endTime: "20:00",
    venue: "Orchard Gateway Atrium",
    vendor: "Threadline Events",
    description:
      "Local labels and upcyclers in the heart of Orchard. High foot traffic, indoor and air-conditioned.",
    boothPrice: 220,
    expectedAttendance: 2000,
    rating: 4.1,
    boothsTotal: 20,
    boothsTaken: 18,
    pin: { left: 139, top: 104 },
  },
  {
    id: "jewellery-2-popup",
    name: "Jewellery 2 PopUp",
    category: "Jewellery",
    date: "2026-12-12",
    startTime: "16:00",
    endTime: "22:00",
    venue: "Marina Bay Promenade",
    vendor: "Marina Night Markets",
    description:
      "An evening jewellery market by the bay. Sold out every year, so join the waitlist early.",
    boothPrice: 200,
    expectedAttendance: 1600,
    rating: 4.8,
    boothsTotal: 18,
    boothsTaken: 18,
    pin: { left: 164, top: 116 },
  },
  {
    id: "holland-vintage-swap",
    name: "Holland V Vintage Swap",
    category: "Clothing",
    date: "2026-12-19",
    startTime: "10:00",
    endTime: "17:00",
    venue: "Holland Village Piazza",
    vendor: "Second Loop Society",
    description:
      "Vintage and pre-loved fashion, plus a swap rail and a mending station.",
    boothPrice: 90,
    expectedAttendance: 600,
    rating: 4.0,
    boothsTotal: 16,
    boothsTaken: 7,
    pin: { left: 120, top: 98 },
  },
  {
    id: "new-year-makers-bazaar",
    name: "New Year Makers Bazaar",
    category: "Craft",
    date: "2027-01-09",
    endDate: "2027-01-10",
    startTime: "10:00",
    endTime: "21:00",
    venue: "Our Tampines Hub",
    vendor: "East Side Markets",
    description:
      "The biggest makers' market in the east. Gifts, home goods and snacks to start the year.",
    boothPrice: 130,
    expectedAttendance: 2500,
    rating: 4.2,
    boothsTotal: 40,
    boothsTaken: 9,
    pin: { left: 209, top: 79 },
  },
  {
    id: "punggol-print-fair",
    name: "Punggol Riso & Print Fair",
    category: "Arts & Prints",
    date: "2026-10-24",
    startTime: "11:00",
    endTime: "18:00",
    venue: "Waterway Point, Punggol",
    vendor: "Inkwell Collective",
    description: "Prints, stickers and zines from local illustrators.",
    boothPrice: 140,
    expectedAttendance: 800,
    rating: 4.7,
    boothsTotal: 20,
    boothsTaken: 20,
    pin: { left: 186, top: 59 },
  },
  {
    id: "jurong-jewel-market",
    name: "Jurong Jewel Market",
    category: "Jewellery",
    date: "2026-10-10",
    startTime: "10:00",
    endTime: "17:00",
    venue: "Jurong Lake Gardens",
    vendor: "Gilded Hands Co.",
    description: "A lakeside jewellery market in the west.",
    boothPrice: 170,
    expectedAttendance: 950,
    rating: 4.3,
    boothsTotal: 24,
    boothsTaken: 24,
    pin: { left: 85, top: 98 },
  },
];

// ---------- formatting (manual, so server and client output match) ----------

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m: m - 1, d, weekday };
}

/** "Sat 21 Nov" */
export function formatDate(iso: string) {
  const { d, m, weekday } = parts(iso);
  return `${WEEKDAYS[weekday]} ${d} ${MONTHS[m]}`;
}

/** "11:00" → "11am", "16:30" → "4:30pm" */
export function formatTime(hhmm: string) {
  const [h, min] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return min ? `${h12}:${String(min).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

function formatDateRange(p: PopUpInput) {
  if (!p.endDate) return formatDate(p.date);
  const a = parts(p.date);
  const b = parts(p.endDate);
  if (a.m === b.m) {
    return `${WEEKDAYS[a.weekday]} ${a.d} – ${WEEKDAYS[b.weekday]} ${b.d} ${MONTHS[b.m]}`;
  }
  return `${formatDate(p.date)} – ${formatDate(p.endDate)}`;
}

export const popups: PopUp[] = input.map((p) => ({
  ...p,
  dateTime: `${formatDateRange(p)} · ${formatTime(p.startTime)}–${formatTime(p.endTime)}`,
}));

// ---------- queries ----------

export function getPopUp(id: string) {
  return popups.find((p) => p.id === id);
}

export const lastDay = (p: PopUp) => p.endDate ?? p.date;
export const isPast = (p: PopUp) => lastDay(p) < TODAY;
export const isHappeningNow = (p: PopUp) => p.date <= TODAY && lastDay(p) >= TODAY;
/** Covers the given YYYY-MM-DD day. */
export const isOnDay = (p: PopUp, iso: string) => p.date <= iso && lastDay(p) >= iso;

const byDate = (a: PopUp, b: PopUp) => a.date.localeCompare(b.date);

/** Not yet finished, soonest first (includes ones happening now). */
export const upcomingPopups = popups.filter((p) => !isPast(p)).sort(byDate);
/** Finished, most recent first. */
export const pastPopups = popups.filter(isPast).sort((a, b) => byDate(b, a));

export function addDays(iso: string, days: number) {
  const { y, m, d } = parts(iso);
  return new Date(Date.UTC(y, m, d + days)).toISOString().slice(0, 10);
}

/** Case-insensitive match on name, venue, organiser or category. */
export function matchesSearch(p: PopUp, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [p.name, p.venue, p.vendor, p.category].some((s) =>
    s.toLowerCase().includes(q),
  );
}

export function filterPopUps(
  list: PopUp[],
  query: string,
  selected: Category[],
) {
  return list.filter(
    (p) =>
      matchesSearch(p, query) &&
      (selected.length === 0 || selected.includes(p.category)),
  );
}

// ---------- booth pricing ----------

export type BoothSize = "standard" | "large";

export const boothSizes: { key: BoothSize; label: string; multiplier: number }[] = [
  { key: "standard", label: "Standard 2×2m", multiplier: 1 },
  { key: "large", label: "Large 3×3m", multiplier: 1.6 },
];

export const DEPOSIT_RATE = 0.3;

export function boothCost(p: PopUp, size: BoothSize) {
  const m = boothSizes.find((s) => s.key === size)!.multiplier;
  const total = Math.round(p.boothPrice * m);
  return { total, deposit: Math.round(total * DEPOSIT_RATE) };
}
