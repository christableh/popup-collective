"use client";

// A tiny fake backend: state lives in localStorage and every mutation goes
// through an async "API" call with a short delay so the UI behaves as if it
// were talking to a server. Swap these functions for real fetch calls later.

import { useSyncExternalStore } from "react";
import {
  boothCost,
  getPopUp,
  isPast,
  type BoothSize,
  type PopUp,
} from "./popups";
import { occupiedBooths } from "./sellers";

export type Booking = {
  id: string;
  /** Short reference shown to the user, e.g. "PC-7KQ2M". */
  ref: string;
  popupId: string;
  size: BoothSize;
  booth: number;
  total: number;
  deposit: number;
  createdAt: string;
  status: "confirmed" | "cancelled";
};

export type State = {
  bookings: Booking[];
  /** Popup ids saved on the Vendor page (business view). */
  saved: string[];
  /** Popup ids with a reminder set (user view). */
  reminders: string[];
  /** Seller ids the user is interested in visiting (user view). */
  interested: string[];
};

const STORAGE_KEY = "popup-collective:v1";

const SEED: State = {
  bookings: [
    {
      id: "seed-1",
      ref: "PC-4HT8Q",
      popupId: "katong-makers-market",
      size: "standard",
      booth: 14,
      total: 120,
      deposit: 36,
      createdAt: "2026-10-30T09:12:00.000Z",
      status: "confirmed",
    },
    {
      id: "seed-2",
      ref: "PC-9MX2A",
      popupId: "punggol-print-fair",
      size: "large",
      booth: 7,
      total: 224,
      deposit: 67,
      createdAt: "2026-09-18T03:40:00.000Z",
      status: "confirmed",
    },
  ],
  saved: ["jewellery-showcase", "sentosa-print-fair"],
  reminders: ["jewellery-showcase"],
  interested: ["mei-ceramics", "knotty-knits", "sol-silver"],
};

let state: State | null = null;
const listeners = new Set<() => void>();

function read(): State {
  if (state) return state;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? { ...SEED, ...(JSON.parse(raw) as Partial<State>) } : SEED;
  } catch {
    state = SEED;
  }
  return state;
}

function write(next: State) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode / storage disabled: keep working in memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep multiple tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    state = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Subscribe to the whole store. Server render uses the seed data. */
export function useStore(): State {
  return useSyncExternalStore(subscribe, read, () => SEED);
}

// ---------- derived helpers ----------

export const activeBookings = (s: State) =>
  s.bookings.filter((b) => b.status === "confirmed");

export function boothsLeft(p: PopUp, s: State) {
  const mine = activeBookings(s).filter((b) => b.popupId === p.id).length;
  return Math.max(0, p.boothsTotal - p.boothsTaken - mine);
}

export function bookingFor(popupId: string, s: State) {
  return activeBookings(s)
    .filter((b) => b.popupId === popupId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function splitBookings(s: State) {
  const withPopup = activeBookings(s)
    .map((b) => ({ booking: b, popup: getPopUp(b.popupId)! }))
    .filter((x) => x.popup);
  return {
    upcoming: withPopup
      .filter((x) => !isPast(x.popup))
      .sort((a, b) => a.popup.date.localeCompare(b.popup.date)),
    past: withPopup
      .filter((x) => isPast(x.popup))
      .sort((a, b) => b.popup.date.localeCompare(a.popup.date)),
  };
}

// ---------- "API" ----------

const latency = (ms = 700) => new Promise((r) => setTimeout(r, ms));

function makeRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "PC-";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export class ApiError extends Error {}

export async function bookBooth(popupId: string, size: BoothSize) {
  await latency(1100);
  const s = read();
  const popup = getPopUp(popupId);
  if (!popup) throw new ApiError("This pop-up no longer exists.");
  if (isPast(popup)) throw new ApiError("This pop-up has already ended.");
  if (boothsLeft(popup, s) === 0) throw new ApiError("Sorry, the last booth was just taken.");
  if (bookingFor(popupId, s)) throw new ApiError("You already have a booth at this pop-up.");

  const { total, deposit } = boothCost(popup, size);
  const booking: Booking = {
    id: crypto.randomUUID(),
    ref: makeRef(),
    popupId,
    size,
    booth: pickBooth(popupId, popup.boothsTotal, s),
    total,
    deposit,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };
  write({ ...s, bookings: [...s.bookings, booking] });
  return booking;
}

/** Highest-numbered booth not held by a lineup seller or another booking. */
function pickBooth(popupId: string, total: number, s: State) {
  const taken = new Set([
    ...occupiedBooths(popupId),
    ...activeBookings(s).filter((b) => b.popupId === popupId).map((b) => b.booth),
  ]);
  for (let n = total; n >= 1; n--) if (!taken.has(n)) return n;
  return total;
}

export async function cancelBooking(id: string) {
  await latency();
  const s = read();
  write({
    ...s,
    bookings: s.bookings.map((b) =>
      b.id === id ? { ...b, status: "cancelled" } : b,
    ),
  });
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

/** Optimistic: updates instantly, like a "like" button would. */
export function toggleSaved(popupId: string) {
  const s = read();
  write({ ...s, saved: toggle(s.saved, popupId) });
}

export function toggleReminder(popupId: string) {
  const s = read();
  write({ ...s, reminders: toggle(s.reminders, popupId) });
}

export function toggleInterested(sellerId: string) {
  const s = read();
  write({ ...s, interested: toggle(s.interested, sellerId) });
}

export function resetDemoData() {
  write(SEED);
}
