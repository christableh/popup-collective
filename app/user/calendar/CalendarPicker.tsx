"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PopUpDetails, Sellers } from "@/components/ui";
import { isOnDay, popups, TODAY } from "@/lib/popups";

// The design labels columns SUN MON WED THU FRI SAT SUN (a Figma typo); use the real week.
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const [TY, TM, TD] = TODAY.split("-").map(Number);
const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/**
 * iOS-style compact date picker (Figma: "Date and time - Pickers") plus the
 * selected-day detail shown in "iPhone 17 - 4" (48:2231).
 */
export function CalendarPicker() {
  const [view, setView] = useState({ year: TY, month: TM - 1 });
  const [selected, setSelected] = useState<number | null>(TD);

  const first = new Date(Date.UTC(view.year, view.month, 1));
  const daysInMonth = new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array<null>(first.getUTCDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const monthLabel = first.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const eventsOn = (day: number) =>
    popups.filter((p) => isOnDay(p, iso(view.year, view.month, day)));
  const selectedEvents = selected ? eventsOn(selected) : [];

  const shiftMonth = (delta: number) => {
    const d = new Date(Date.UTC(view.year, view.month + delta, 1));
    setView({ year: d.getUTCFullYear(), month: d.getUTCMonth() });
    setSelected(null);
  };

  const isToday = (day: number) => iso(view.year, view.month, day) === TODAY;

  return (
    <>
      <div className="mt-[9px] ml-4 w-[370px] rounded-[13px] bg-white px-[13px] pt-[13px] pb-2 font-system shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <div className="flex h-[22px] items-center justify-between pl-[3px]">
          <h2 className="flex items-center gap-1 text-[17px] leading-[22px] font-semibold tracking-[-0.43px]">
            {monthLabel}
            <ChevronRight
              aria-hidden
              className="size-4 text-[#0088ff]"
              strokeWidth={3}
            />
          </h2>
          <div className="flex gap-[17px] pr-1.5 text-[#0088ff]">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => shiftMonth(-1)}
            >
              <ChevronLeft className="size-[22px]" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
            >
              <ChevronRight className="size-[22px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="mt-[7px] grid grid-cols-7 text-center text-[13px] leading-[18px] font-semibold text-[rgba(60,60,67,0.3)] uppercase">
          {WEEKDAY_LABELS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div
          role="grid"
          aria-label={monthLabel}
          className="mt-[7px] grid grid-cols-7 auto-rows-[46px] place-items-center"
        >
          {cells.map((day, i) =>
            day === null ? (
              <span key={`blank-${i}`} />
            ) : (
              <button
                key={day}
                type="button"
                aria-pressed={selected === day}
                aria-label={`${day}${eventsOn(day).length ? `, ${eventsOn(day).length} pop-up(s)` : ""}`}
                onClick={() => setSelected(day)}
                className={`relative flex size-11 items-center justify-center rounded-full tracking-[-0.45px] ${
                  selected === day
                    ? "bg-[rgba(0,136,255,0.12)] text-[24px] font-medium text-[#0088ff]"
                    : isToday(day)
                      ? "text-[20px] font-semibold text-[#0088ff]"
                      : "text-[20px] text-black"
                }`}
              >
                {day}
                {eventsOn(day).length > 0 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0.5 size-1.5 rounded-full bg-teal"
                  />
                )}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="min-h-[103px] pt-[18px] pb-3" aria-live="polite">
        {selected !== null && selectedEvents.length === 0 && (
          <p className="pl-8 text-[12px] text-black/60">
            No pop-ups on this day. Days with a dot have events.
          </p>
        )}
        {selectedEvents.map((p) => (
          <Link
            key={p.id}
            href={`/user/popups/${p.id}`}
            className="relative mx-4 mb-2 block rounded-[10px] py-1.5 pl-4 hover:bg-teal/10"
          >
            <PopUpDetails popup={p} dark />
            <span className="absolute top-[30px] right-4">
              <Sellers popupId={p.id} dark />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
