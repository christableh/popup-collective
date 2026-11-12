"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { View } from "./TabBar";
import { resetDemoData, splitBookings, useStore, type State } from "@/lib/store";

type Row = { label: string; value?: string; href?: string };

function rowsFor(view: View, s: State): Row[] {
  if (view === "business") {
    const { upcoming, past } = splitBookings(s);
    const deposits = [...upcoming, ...past].reduce((n, x) => n + x.booking.deposit, 0);
    return [
      { label: "Upcoming bookings", value: String(upcoming.length), href: "/business/bookings" },
      { label: "Past pop-ups", value: String(past.length), href: "/business/bookings" },
      { label: "Saved pop-ups", value: String(s.saved.length), href: "/business/vendor" },
      { label: "Deposits paid", value: `$${deposits}` },
    ];
  }
  return [
    { label: "Reminders", value: String(s.reminders.length), href: "/user" },
    { label: "My calendar", href: "/user/calendar" },
    { label: "Interested sellers", value: String(s.interested.length), href: "/user/sellers?filter=interested" },
    { label: "Home area", value: "Singapore" },
  ];
}

// Figma: profile body shared by "iPhone 17 - 5" (58:1002) and "iPhone 17 - 3" (33:2125)
export function ProfileCard({ name, view }: { name: string; view: View }) {
  const store = useStore();
  const [resetDone, setResetDone] = useState(false);
  const rows = rowsFor(view, store);

  const rowCls =
    "flex h-full w-full items-center justify-between px-5 text-[14px] font-semibold text-white";

  return (
    <>
      <div className="mt-[41px] flex items-start pl-[19px]">
        <div className="relative h-[69px] w-[69px] shrink-0">
          <Image
            src="/figma/avatar-bg-lg.svg"
            alt=""
            width={69}
            height={63.69}
            className="absolute top-[1.77px] left-0"
          />
          <Image
            src="/figma/user.png"
            alt=""
            width={51}
            height={69}
            className="absolute top-0 left-[9.08px] h-[69px] w-[50.84px] object-contain"
          />
        </div>
        <div className="mt-[13px] ml-[15px]">
          <h2 className="text-[20px] font-bold italic">{name}</h2>
          <p className="text-[12px] text-black/60">
            {view === "business" ? "Seller · Christabel Crafts" : "Pop-up explorer"}
          </p>
        </div>
      </div>

      <ul className="mt-[19px] ml-[25px] flex h-[332px] w-[349px] flex-col rounded-[10px] bg-teal">
        {rows.map((row, i) => (
          <li key={row.label} className="relative flex-1">
            {i > 0 && <Divider />}
            {row.href ? (
              <Link href={row.href} className={`${rowCls} hover:bg-white/5`}>
                {row.label}
                <span className="font-normal">{row.value ?? "›"}</span>
              </Link>
            ) : (
              <div className={rowCls}>
                {row.label}
                <span className="font-normal">{row.value}</span>
              </div>
            )}
          </li>
        ))}
        <li className="relative flex-1">
          <Divider />
          <button
            type="button"
            onClick={() => {
              resetDemoData();
              setResetDone(true);
            }}
            className={`${rowCls} hover:bg-white/5`}
          >
            Reset demo data
            <span className="font-normal">{resetDone ? "Done ✓" : "↺"}</span>
          </button>
        </li>
      </ul>
    </>
  );
}

function Divider() {
  return (
    <Image
      src="/figma/divider-344.svg"
      alt=""
      width={344}
      height={1}
      className="absolute top-0 left-[3px]"
    />
  );
}
