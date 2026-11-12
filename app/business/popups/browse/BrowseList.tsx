"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { SearchBar } from "@/components/ui";
import { filterPopUps, upcomingPopups, type Category } from "@/lib/popups";
import { boothsLeft, bookingFor, useStore } from "@/lib/store";

type Sort = "date" | "price";

export function BrowseList({ initialQuery }: { initialQuery: string }) {
  const store = useStore();
  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState<Category[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<Sort>("date");

  const results = filterPopUps(upcomingPopups, query, selected).sort((a, b) =>
    sort === "price" ? a.boothPrice - b.boothPrice : a.date.localeCompare(b.date),
  );

  return (
    <>
      <div className="mt-[21px] pl-[33px]">
        <SearchBar
          withFilter
          value={query}
          onChange={setQuery}
          onSubmit={setQuery}
          filterActive={showFilters}
          onFilterClick={() => setShowFilters((v) => !v)}
        />
      </div>

      {showFilters && (
        <div className="mt-3 flex flex-col gap-2 pl-[25px]">
          <CategoryChips selected={selected} onChange={setSelected} />
          <div className="flex items-center gap-2 text-[12px]">
            <span className="font-semibold">Sort by</span>
            {(["date", "price"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sort === s}
                onClick={() => setSort(s)}
                className={`rounded-full px-3 py-0.5 capitalize ${
                  sort === s ? "bg-teal text-white" : "bg-tab-selected"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 pl-[29px] text-[12px] text-black/60">
        {results.length} pop-up{results.length === 1 ? "" : "s"}
        {query && <> matching &ldquo;{query}&rdquo;</>}
      </p>

      <ul className="mt-2 flex flex-col gap-3 pl-[25px]">
        {results.map((p) => {
          const left = boothsLeft(p, store);
          const booked = bookingFor(p.id, store);
          return (
            <li key={p.id}>
              <Link
                href={`/business/popups/${p.id}`}
                className="flex min-h-[111px] w-[354px] gap-3 rounded-[10px] bg-teal py-[18px] pr-4 pl-[17px] text-white transition-colors hover:bg-teal-muted"
              >
                <Image
                  src="/figma/avatar-lg.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-[18px] font-bold">{p.name}</p>
                  <p className="text-[12px] leading-[18px]">{p.dateTime}</p>
                  <p className="truncate text-[12px] leading-[18px]">{p.venue}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                    <span className="rounded-full bg-white/20 px-2 py-0.5">{p.category}</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5">From ${p.boothPrice}</span>
                    {booked ? (
                      <span className="rounded-full bg-tab-selected px-2 py-0.5 text-teal-ink">Booked ✓</span>
                    ) : (
                      <span className="rounded-full bg-white/20 px-2 py-0.5">
                        {left === 0 ? "Sold out" : `${left} booths left`}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
