"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/Screen";
import { PopUpRow, SearchBar } from "@/components/ui";
import { getPopUp, filterPopUps, upcomingPopups, type PopUp } from "@/lib/popups";
import { boothsLeft, toggleSaved, useStore, type State } from "@/lib/store";

type Mode = "compare" | "saved";

// Default pair to compare when fewer than two pop-ups are saved.
const DEFAULT_COMPARE = ["jewellery-showcase", "jewellery-2-popup"];

// Figma: "Vendors page" — Compare (7:286) and Saved (50:2683) states
export function VendorView() {
  const store = useStore();
  const [mode, setMode] = useState<Mode>("compare");
  const [query, setQuery] = useState("");
  const isCompare = mode === "compare";

  const saved = store.saved.map(getPopUp).filter((p): p is PopUp => !!p);
  const compareIds = [...store.saved, ...DEFAULT_COMPARE]
    .filter((id, i, all) => all.indexOf(id) === i)
    .slice(0, 2);
  const compared = compareIds.map((id) => getPopUp(id)!);
  const cards = isCompare ? compared : saved;

  const booths = filterPopUps(upcomingPopups, query, [])
    .filter((p) => boothsLeft(p, store) > 0)
    .sort((a, b) => b.rating - a.rating);

  return (
    <>
      <div className="mt-4 pl-[18px]">
        <SearchBar withFilter value={query} onChange={setQuery} onSubmit={setQuery} />
      </div>

      <div
        role="group"
        aria-label="View"
        className="mt-[9px] ml-14 flex text-[12px] font-semibold"
      >
        {(["compare", "saved"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className="relative flex h-[31px] w-[130px] items-center justify-center capitalize"
          >
            <Image
              src={mode === m ? "/figma/seg-dark.svg" : "/figma/seg-light.svg"}
              alt=""
              width={130}
              height={31}
              className="absolute inset-0"
            />
            <span className="relative">
              {m}
              {m === "saved" && ` (${saved.length})`}
            </span>
          </button>
        ))}
      </div>

      {cards.length === 0 ? (
        <p className="mt-[19px] ml-6 flex h-[163px] w-[348px] items-center justify-center rounded-[5px] bg-teal/10 px-8 text-center text-[12px]">
          Nothing saved yet. Tap ♡ Save on any pop-up to keep it here.
        </p>
      ) : (
        <ul className="mt-[19px] ml-6 flex gap-3 overflow-x-auto pr-6 pb-1">
          {cards.map((popup) => (
            <li key={popup.id} className="shrink-0">
              <VendorCard popup={popup} detailed={isCompare} store={store} />
            </li>
          ))}
        </ul>
      )}

      <section className={`${isCompare ? "mt-[23px]" : "mt-12"} ml-[21px]`}>
        <SectionHeading className="h-[30px] pl-[7px]">
          Available Booths
        </SectionHeading>
        <div className="flex min-h-[177px] w-[354px] flex-col gap-3 rounded-[10px] bg-teal px-2.5 py-3">
          {booths.map((popup) => (
            <PopUpRow
              key={popup.id}
              popup={popup}
              href={`/business/popups/${popup.id}`}
              rating
              tall
              note={`${boothsLeft(popup, store)} left · from $${popup.boothPrice}`}
            />
          ))}
          {booths.length === 0 && (
            <p className="pt-14 text-center text-[12px] text-white">
              No open booths match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function VendorCard({
  popup,
  detailed,
  store,
}: {
  popup: PopUp;
  detailed: boolean;
  store: State;
}) {
  const saved = store.saved.includes(popup.id);
  const left = boothsLeft(popup, store);
  return (
    <div
      className={`relative w-[168px] rounded-[5px] bg-teal text-[11px] text-white ${
        detailed ? "h-[293px]" : "h-[163px]"
      }`}
    >
      <Link
        href={`/business/popups/${popup.id}`}
        className="block h-full pt-[11px] pr-2 pl-3.5"
      >
        <p className="w-[117px] text-[13px] leading-4 font-bold">{popup.name}</p>
        <p className="mt-[5px] leading-[15px]">{popup.dateTime}</p>
        <p className="mt-0.5 leading-[15px]">{popup.vendor}</p>
        <Image
          src="/figma/divider-136.svg"
          alt=""
          width={136}
          height={1}
          className="mt-[5px] -ml-[3px]"
        />
        {detailed ? (
          <dl className="mt-2.5 -ml-0.5 grid grid-cols-[62px_1fr] gap-y-2 leading-[13px]">
            <dt className="opacity-75">Price</dt>
            <dd className="font-semibold">From ${popup.boothPrice}</dd>
            <dt className="opacity-75">Expected attendance</dt>
            <dd className="font-semibold">~{popup.expectedAttendance.toLocaleString("en-SG")}</dd>
            <dt className="opacity-75">Type</dt>
            <dd className="font-semibold">{popup.category}</dd>
            <dt className="opacity-75">Booths</dt>
            <dd className="font-semibold">{left === 0 ? "Sold out" : `${left} left`}</dd>
            <dt className="opacity-75">Reviews</dt>
            <dd className="font-semibold">★ {popup.rating}</dd>
          </dl>
        ) : (
          <p className="mt-2 font-semibold">
            From ${popup.boothPrice} · ★ {popup.rating}
          </p>
        )}
      </Link>
      <button
        type="button"
        aria-label={saved ? `Unsave ${popup.name}` : `Save ${popup.name}`}
        aria-pressed={saved}
        onClick={() => toggleSaved(popup.id)}
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/15 text-[15px] hover:bg-white/25"
      >
        {saved ? "♥" : "♡"}
      </button>
    </div>
  );
}
