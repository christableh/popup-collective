"use client";

import { getPopUp } from "@/lib/popups";
import { bookingFor, boothsLeft, useStore } from "@/lib/store";

/** "5 booths left" / "Sold out" / "Booked ✓", live from the store. */
export function BoothsLeftNote({ popupId }: { popupId: string }) {
  const store = useStore();
  if (bookingFor(popupId, store)) return <>Booked ✓</>;
  const left = boothsLeft(getPopUp(popupId)!, store);
  return <>{left === 0 ? "Sold out" : `${left} booths left`}</>;
}
