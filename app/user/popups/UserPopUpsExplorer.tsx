"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { PopUpMap } from "@/components/PopUpMap";
import { SectionHeading } from "@/components/Screen";
import { PopUpDetails, PopUpRow, SearchBar, Sellers } from "@/components/ui";
import {
  filterPopUps,
  isHappeningNow,
  upcomingPopups,
  type Category,
} from "@/lib/popups";

// Figma: "iPhone 17 - 1" (32:1020)
export function UserPopUpsExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Category[]>([]);
  const [showChips, setShowChips] = useState(true);

  const results = filterPopUps(upcomingPopups, query, selected);
  const now = results.filter(isHappeningNow);
  const upcoming = results.filter((p) => !isHappeningNow(p));

  return (
    <>
      <div className="mt-[18px] pl-[22px]">
        <SearchBar
          withFilter
          value={query}
          onChange={setQuery}
          onSubmit={setQuery}
          filterActive={showChips}
          onFilterClick={() => setShowChips((v) => !v)}
        />
      </div>

      {showChips && (
        <div className="mt-[9px] pl-[22px]">
          <CategoryChips selected={selected} onChange={setSelected} />
        </div>
      )}

      <PopUpMap
        popups={results}
        hrefFor={(p) => `/user/popups/${p.id}`}
        className="mt-[18px] ml-[50px]"
      />

      <section className="mt-[7px] pl-[21px]">
        <SectionHeading className="h-[30px]">Happening now!</SectionHeading>
        {now.length === 0 ? (
          <p className="ml-2 flex h-[60px] w-[346px] items-center justify-center rounded-[10px] bg-teal/10 text-[12px]">
            Nothing on right now{query || selected.length ? " that matches" : ""}.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {now.map((p) => (
              <Link
                key={p.id}
                href={`/user/popups/${p.id}`}
                className="relative ml-2 block h-[99px] w-[346px] rounded-[10px] bg-teal pt-5 pl-[21px] transition-colors hover:bg-teal-muted"
              >
                <PopUpDetails popup={p} />
                <span className="absolute top-3 right-4 rounded-full bg-tab-selected px-2 py-0.5 text-[10px] font-bold text-teal-ink">
                  ● Live
                </span>
                <span className="absolute right-[26px] bottom-[16px] text-white">
                  <Sellers popupId={p.id} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-[15px] pl-[23px]">
        <SectionHeading className="h-6">Upcoming Pop Ups</SectionHeading>
        <div className="ml-1.5 flex w-[346px] flex-col gap-2 rounded-[10px] bg-teal p-2">
          {upcoming.map((p) => (
            <PopUpRow key={p.id} popup={p} href={`/user/popups/${p.id}`} rating />
          ))}
          {upcoming.length === 0 && (
            <p className="py-8 text-center text-[12px] text-white">
              No upcoming pop-ups match.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
