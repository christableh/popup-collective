"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PillButton, Spinner } from "@/components/ui";
import {
  boothCost,
  boothSizes,
  formatDate,
  getPopUp,
  isPast,
  type BoothSize,
} from "@/lib/popups";
import {
  ApiError,
  bookBooth,
  bookingFor,
  boothsLeft,
  toggleSaved,
  useStore,
} from "@/lib/store";

/** Booths-left value for the facts panel, kept live with the store. */
export function BoothsLeft({ popupId }: { popupId: string }) {
  const store = useStore();
  const left = boothsLeft(getPopUp(popupId)!, store);
  return <>{left === 0 ? "Sold out" : `${left} of ${getPopUp(popupId)!.boothsTotal}`}</>;
}

/** Save + Book buttons at the bottom of the info card. */
export function InfoActions({ popupId }: { popupId: string }) {
  const store = useStore();
  const popup = getPopUp(popupId)!;
  const saved = store.saved.includes(popupId);
  const booking = bookingFor(popupId, store);
  const left = boothsLeft(popup, store);

  let book: React.ReactNode;
  if (booking) {
    book = (
      <PillButton href="/business/bookings" background="/figma/btn-book.svg" width={130}>
        Booked ✓
      </PillButton>
    );
  } else if (isPast(popup)) {
    book = (
      <PillButton disabled background="/figma/btn-book.svg" width={130}>
        Ended
      </PillButton>
    );
  } else if (left === 0) {
    book = (
      <PillButton disabled background="/figma/btn-book.svg" width={130}>
        Sold out
      </PillButton>
    );
  } else {
    book = (
      <PillButton
        href={`/business/popups/${popupId}/deposit`}
        background="/figma/btn-book.svg"
        width={130}
      >
        Book
      </PillButton>
    );
  }

  return (
    <div className="absolute inset-x-[11px] bottom-[18px] flex items-center justify-between text-[16px] font-semibold text-black">
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => toggleSaved(popupId)}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[14px] text-white hover:bg-white/10"
      >
        <span aria-hidden className="text-[18px] leading-none">{saved ? "♥" : "♡"}</span>
        {saved ? "Saved" : "Save"}
      </button>
      {book}
    </div>
  );
}

/** Booth size picker + cost + "Confirm & deposit" on the deposit step. */
export function DepositForm({ popupId }: { popupId: string }) {
  const router = useRouter();
  const store = useStore();
  const popup = getPopUp(popupId)!;
  const [size, setSize] = useState<BoothSize>("standard");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { total, deposit } = boothCost(popup, size);
  const existing = bookingFor(popupId, store);
  const left = boothsLeft(popup, store);

  async function confirm() {
    setPending(true);
    setError(null);
    try {
      await bookBooth(popupId, size);
      router.push(`/business/popups/${popupId}/confirmed`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
      setPending(false);
    }
  }

  return (
    <>
      <fieldset className="mt-2.5 ml-[18px] w-[327px] rounded-[3px] bg-white p-3 text-[12px] text-black">
        <legend className="sr-only">Booth size</legend>
        <p className="mb-2 font-semibold">Choose your booth</p>
        <div className="flex flex-col gap-1.5">
          {boothSizes.map((s) => {
            const cost = boothCost(popup, s.key);
            return (
              <label
                key={s.key}
                className={`flex cursor-pointer items-center justify-between rounded-md border px-2.5 py-2 ${
                  size === s.key ? "border-teal bg-teal/10" : "border-black/15"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="size"
                    value={s.key}
                    checked={size === s.key}
                    onChange={() => setSize(s.key)}
                    className="accent-teal"
                  />
                  {s.label}
                </span>
                <span className="font-semibold">${cost.total}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-black/55">
          {left} booth{left === 1 ? "" : "s"} left · {formatDate(popup.date)} at {popup.venue}
        </p>
      </fieldset>

      <div className="mt-[21px] pl-[23px] text-white">
        <p className="text-[16px] font-bold">Cost: ${total}</p>
        <p className="text-[12px]">
          Pay ${deposit} deposit now, ${total - deposit} on the day
        </p>
      </div>

      {error && (
        <p role="alert" className="mx-[18px] mt-3 rounded-md bg-white/90 px-3 py-2 text-[12px] font-semibold text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 mr-2 mb-4 flex justify-end">
        {existing ? (
          <PillButton
            href="/business/bookings"
            background="/figma/btn-deposit.svg"
            width={158}
            className="text-[16px] font-semibold"
          >
            Already booked ✓
          </PillButton>
        ) : (
          <PillButton
            onClick={confirm}
            disabled={pending || left === 0}
            background="/figma/btn-deposit.svg"
            width={158}
            className="text-[16px] font-semibold"
          >
            {pending ? (
              <>
                <Spinner /> Processing…
              </>
            ) : left === 0 ? (
              "Sold out"
            ) : (
              <>Confirm &amp; deposit</>
            )}
          </PillButton>
        )}
      </div>
    </>
  );
}

/** Booking reference + booth details on the confirmation step. */
export function ConfirmedDetails({ popupId }: { popupId: string }) {
  const store = useStore();
  const booking = bookingFor(popupId, store);

  if (!booking) {
    return (
      <p className="mt-6 px-[17px] text-[12px] text-white">
        We couldn&apos;t find this booking.{" "}
        <Link href={`/business/popups/${popupId}`} className="underline">
          Back to the pop-up
        </Link>
      </p>
    );
  }

  const size = boothSizes.find((s) => s.key === booking.size)!.label;
  return (
    <dl className="mx-[17px] mt-4 grid grid-cols-[110px_1fr] gap-y-1 rounded-md bg-white/15 p-3 text-[12px] text-white">
      <dt className="opacity-75">Reference</dt>
      <dd className="font-bold tracking-wide">{booking.ref}</dd>
      <dt className="opacity-75">Booth</dt>
      <dd className="font-semibold">
        #{booking.booth} · {size}
      </dd>
      <dt className="opacity-75">Deposit paid</dt>
      <dd className="font-semibold">${booking.deposit}</dd>
      <dt className="opacity-75">Due on the day</dt>
      <dd className="font-semibold">${booking.total - booking.deposit}</dd>
    </dl>
  );
}
