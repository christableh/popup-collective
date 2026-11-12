"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/Screen";
import { Spinner } from "@/components/ui";
import { boothSizes, isHappeningNow, type PopUp } from "@/lib/popups";
import {
  cancelBooking,
  splitBookings,
  useStore,
  type Booking,
} from "@/lib/store";

export function BookingsList() {
  const store = useStore();
  const { upcoming, past } = splitBookings(store);

  return (
    <>
      <section className="mt-6 pl-[26px]">
        <h2 className="h-[41px] text-[20px] font-bold">My Bookings</h2>
        {upcoming.length === 0 ? (
          <div className="flex h-[102px] w-[351px] flex-col items-center justify-center gap-2 rounded-[10px] bg-teal-muted text-[13px] text-white">
            No upcoming bookings yet.
            <Link
              href="/business/popups"
              className="rounded-full bg-white/20 px-4 py-1 font-semibold hover:bg-white/30"
            >
              Find a pop-up
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-[21px]">
            {upcoming.map(({ booking, popup }) => (
              <li key={booking.id}>
                <BookingCard booking={booking} popup={popup} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-[60px] pl-[25px]">
        <SectionHeading className="h-7">Past Bookings</SectionHeading>
        {past.length === 0 ? (
          <p className="text-[12px] text-black/60">Nothing here yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {past.map(({ booking, popup }) => (
              <li key={booking.id}>
                <BookingCard booking={booking} popup={popup} past />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function BookingCard({
  booking,
  popup,
  past = false,
}: {
  booking: Booking;
  popup: PopUp;
  past?: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const size = boothSizes.find((s) => s.key === booking.size)!.label;
  const live = isHappeningNow(popup);

  async function onCancel() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setPending(true);
    await cancelBooking(booking.id);
  }

  return (
    <article
      className={`relative w-[351px] rounded-[10px] p-3.5 text-white ${
        past ? "bg-teal-muted/70" : "bg-teal-muted"
      }`}
    >
      <Link href={`/business/popups/${popup.id}`} className="block pr-20">
        <p className="text-[13px] leading-[18px] font-bold">{popup.name}</p>
        <p className="text-[12px] leading-[18px]">{popup.dateTime}</p>
        <p className="text-[12px] leading-[18px]">{popup.venue}</p>
      </Link>
      <span className="absolute top-3.5 right-3.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide">
        {booking.ref}
      </span>
      {live && (
        <span className="absolute top-9 right-3.5 rounded-full bg-tab-selected px-2 py-0.5 text-[10px] font-bold text-teal-ink">
          On now
        </span>
      )}
      <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-2 text-[11px]">
        <span>
          Booth #{booking.booth} · {size} · ${booking.deposit} deposit paid
        </span>
        {!past && !live && (
          <button
            type="button"
            onClick={onCancel}
            onBlur={() => setConfirming(false)}
            disabled={pending}
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold ${
              confirming ? "bg-red-600" : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {pending ? <Spinner /> : confirming ? "Tap to confirm" : "Cancel"}
          </button>
        )}
      </div>
    </article>
  );
}
