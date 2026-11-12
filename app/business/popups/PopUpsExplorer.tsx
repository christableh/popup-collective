"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { PopUpMap } from "@/components/PopUpMap";
import { SectionHeading } from "@/components/Screen";
import { PopUpRow, SearchBar } from "@/components/ui";
import { filterPopUps, upcomingPopups, type Category } from "@/lib/popups";
import { boothsLeft, useStore } from "@/lib/store";

export function PopUpsExplorer() {
  const router = useRouter();
  const store = useStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Category[]>([]);
  const results = filterPopUps(upcomingPopups, query, selected);

  return (
    <>
      <div className="mt-[18px] pl-[26px]">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={(q) =>
            router.push(`/business/popups/browse?q=${encodeURIComponent(q)}`)
          }
        />
      </div>

      <div className="mt-[9px] pl-[22px]">
        <CategoryChips selected={selected} onChange={setSelected} />
      </div>

      <PopUpMap
        popups={results}
        hrefFor={(p) => `/business/popups/${p.id}`}
        className="mt-[18px] ml-[54px]"
      />

      <section className="mt-[17px] pl-[29px]">
        <div className="flex h-[30px] items-start justify-between pr-[27px] pl-[7px]">
          <SectionHeading>Upcoming Pop Ups</SectionHeading>
          <Link
            href={`/business/popups/browse${query ? `?q=${encodeURIComponent(query)}` : ""}`}
            className="text-[12px] font-semibold text-teal underline-offset-2 hover:underline"
          >
            See all ({results.length})
          </Link>
        </div>
        <div className="flex h-[163px] w-[346px] flex-col gap-[13px] rounded-[10px] bg-teal px-2 pt-3">
          {results.slice(0, 2).map((p) => {
            const left = boothsLeft(p, store);
            return (
              <PopUpRow
                key={p.id}
                popup={p}
                href={`/business/popups/${p.id}`}
                note={left === 0 ? "Sold out" : `${left} booths left`}
              />
            );
          })}
          {results.length === 0 && (
            <p className="pt-12 text-center text-[12px] text-white">
              Nothing matches. Try another search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
