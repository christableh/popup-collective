"use client";

import Link from "next/link";
import { SellerAvatar } from "@/components/SellerAvatar";
import { isHappeningNow, upcomingPopups } from "@/lib/popups";
import { lineupFor, MY_SELLER_ID, placementsReleased, sellers } from "@/lib/sellers";
import { useStore } from "@/lib/store";

/**
 * "On the day" nudge: if a pop-up is running today and sellers the user is
 * interested in are there, point them at the booth map.
 */
export function TodayCard() {
  const store = useStore();
  const today = upcomingPopups
    .filter(isHappeningNow)
    .map((p) => ({
      popup: p,
      mine: lineupFor(p.id).filter((e) => store.interested.includes(e.sellerId)),
    }))
    .find((x) => x.mine.length > 0);

  if (!today) return null;
  const { popup, mine } = today;
  const released = placementsReleased(popup.id);

  return (
    <Link
      href={`/user/popups/${popup.id}#map`}
      className="mx-[18px] mb-5 block w-[349px] rounded-[10px] bg-teal-ink p-3.5 text-white transition-colors hover:bg-teal"
    >
      <p className="text-[11px] font-bold tracking-wide uppercase opacity-80">● On today</p>
      <p className="mt-0.5 text-[15px] font-bold">
        {mine.length} seller{mine.length === 1 ? "" : "s"} you like {mine.length === 1 ? "is" : "are"} at{" "}
        {popup.name}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {mine.slice(0, 3).map(({ seller, booth }) => (
          <li key={seller.id} className="flex items-center gap-2 text-[12px]">
            <SellerAvatar seller={seller} size={24} className="text-[9px]" />
            <span className="flex-1 truncate font-semibold">{seller.name}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
              {released && booth ? `Booth ${booth}` : "Booth TBC"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[12px] font-semibold underline underline-offset-2">
        Open booth map →
      </p>
    </Link>
  );
}

/** Horizontal row of sellers to browse, interested ones first. */
export function DiscoverSellers() {
  const store = useStore();
  const list = sellers
    .filter((s) => s.id !== MY_SELLER_ID)
    .sort(
      (a, b) =>
        Number(store.interested.includes(b.id)) - Number(store.interested.includes(a.id)),
    )
    .slice(0, 8);

  return (
    <section className="mt-[22px] px-[18px]">
      <div className="flex h-[30px] items-start justify-between pr-1">
        <h2 className="text-[16px] font-semibold">Sellers to discover</h2>
        <Link
          href="/user/sellers"
          className="text-[12px] font-semibold text-teal underline-offset-2 hover:underline"
        >
          See all
        </Link>
      </div>
      <ul className="-mr-[18px] flex gap-3 overflow-x-auto pr-[18px] pb-1">
        {list.map((s) => {
          const on = store.interested.includes(s.id);
          return (
            <li key={s.id} className="w-[64px] shrink-0 text-center">
              <Link href={`/user/sellers/${s.id}`} className="block">
                <span className="relative inline-block">
                  <SellerAvatar seller={s} size={56} />
                  {on && (
                    <span className="absolute -right-0.5 -bottom-0.5 flex size-5 items-center justify-center rounded-full bg-teal text-[11px] text-white ring-2 ring-cream">
                      ♥
                    </span>
                  )}
                </span>
                <span className="mt-1 line-clamp-2 block text-[10px] leading-[12px] font-semibold">
                  {s.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
