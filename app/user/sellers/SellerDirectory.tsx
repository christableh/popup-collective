"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { InterestButton } from "@/components/InterestButton";
import { SellerAvatar } from "@/components/SellerAvatar";
import { SearchBar } from "@/components/ui";
import type { Category } from "@/lib/popups";
import { MY_SELLER_ID, sellers } from "@/lib/sellers";
import { useStore } from "@/lib/store";

type Filter = "all" | "interested";

export function SellerDirectory({ initialFilter }: { initialFilter: Filter }) {
  const store = useStore();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<Category[]>([]);

  const q = query.trim().toLowerCase();
  const list = sellers
    .filter((s) => s.id !== MY_SELLER_ID)
    .filter((s) => filter === "all" || store.interested.includes(s.id))
    .filter((s) => cats.length === 0 || cats.includes(s.category))
    .filter(
      (s) =>
        !q ||
        [s.name, s.tagline, ...s.aesthetic, ...s.sells.map((x) => x.name)].some((t) =>
          t.toLowerCase().includes(q),
        ),
    );

  return (
    <>
      <h2 className="mt-4 pl-[22px] text-[20px] font-bold">Discover sellers</h2>
      <p className="pl-[22px] text-[12px] text-black/60">
        Browse by vibe, tap ♡ on the ones you want to visit, and we&apos;ll mark them on the
        booth map on the day.
      </p>

      <div className="mt-3 pl-[22px]">
        <SearchBar value={query} onChange={setQuery} onSubmit={setQuery} />
      </div>
      <div className="mt-[9px] pl-[22px]">
        <CategoryChips selected={cats} onChange={setCats} />
      </div>

      <div role="group" aria-label="Show" className="mt-3 flex gap-2 pl-[22px] text-[12px] font-semibold">
        {(["all", "interested"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 ${
              filter === f ? "bg-teal text-white" : "bg-tab-selected/60"
            }`}
          >
            {f === "all" ? "All sellers" : `♥ Interested (${store.interested.length})`}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mx-5 mt-6 rounded-[10px] bg-teal/10 px-6 py-8 text-center text-[12px]">
          {filter === "interested" && store.interested.length === 0
            ? "You haven't marked any sellers yet. Tap ♡ on a seller to add them here."
            : "No sellers match. Try another search."}
        </p>
      ) : (
        <ul className="mx-5 mt-3 grid w-[361px] grid-cols-2 gap-2.5">
          {list.map((s) => (
            <li key={s.id} className="relative">
              <Link
                href={`/user/sellers/${s.id}`}
                className="block h-full overflow-hidden rounded-[10px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              >
                <span
                  className="block h-[46px]"
                  style={{
                    background: `linear-gradient(120deg, ${s.palette[0]} 0 45%, ${s.palette[1]} 45% 75%, ${s.palette[2]} 75%)`,
                  }}
                />
                <span className="block px-2.5 pb-2.5">
                  <SellerAvatar seller={s} size={40} ring className="-mt-5" />
                  <span className="mt-1 block truncate text-[13px] font-bold">{s.name}</span>
                  <span className="line-clamp-2 block h-[30px] text-[11px] leading-[15px] text-black/65">
                    {s.tagline}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1">
                    {s.aesthetic.slice(0, 2).map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-teal/10 px-1.5 py-px text-[9px] font-semibold text-teal-ink"
                      >
                        {a}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
              <InterestButton
                sellerId={s.id}
                sellerName={s.name}
                className="absolute top-[52px] right-2"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
