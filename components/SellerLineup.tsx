"use client";

import Link from "next/link";
import { lineupFor, MY_SELLER_ID, placementsReleased } from "@/lib/sellers";
import { useStore } from "@/lib/store";
import { InterestButton } from "./InterestButton";
import { SellerAvatar } from "./SellerAvatar";

/** Who's selling at a pop-up. Interested sellers float to the top (user view). */
export function SellerLineup({
  popupId,
  view,
}: {
  popupId: string;
  view: "user" | "business";
}) {
  const store = useStore();
  const released = placementsReleased(popupId);
  const lineup = lineupFor(popupId)
    .filter((e) => view === "user" || e.sellerId !== MY_SELLER_ID)
    .sort((a, b) => {
      if (view === "user") {
        const ai = store.interested.includes(a.sellerId) ? 0 : 1;
        const bi = store.interested.includes(b.sellerId) ? 0 : 1;
        if (ai !== bi) return ai - bi;
      }
      return (a.booth ?? 99) - (b.booth ?? 99);
    });

  if (lineup.length === 0) return null;

  return (
    <section className="mx-5 mt-6">
      <div className="flex items-baseline justify-between pr-1">
        <h2 className="text-[16px] font-semibold">
          {view === "user" ? "Sellers at this pop-up" : "Other sellers here"}
        </h2>
        <span className="text-[12px] text-black/60">{lineup.length} confirmed</span>
      </div>
      {view === "business" && (
        <p className="mt-1 text-[12px] text-black/60">
          See who you&apos;ll be next to and find people to collab with.
        </p>
      )}
      <ul className="mt-2 flex w-[361px] flex-col divide-y divide-black/10 rounded-[10px] bg-white">
        {lineup.map(({ seller, booth }) => (
          <li key={seller.id} className="flex items-center gap-3 px-3 py-2.5">
            <Link
              href={`/${view}/sellers/${seller.id}`}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <SellerAvatar seller={seller} size={40} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold">{seller.name}</span>
                <span className="block truncate text-[11px] text-black/60">
                  {seller.sells.map((s) => s.name).join(" · ")}
                </span>
                <span className="mt-0.5 flex gap-1">
                  {seller.aesthetic.slice(0, 2).map((a) => (
                    <span key={a} className="rounded-full bg-teal/10 px-1.5 py-px text-[9px] font-semibold text-teal-ink">
                      {a}
                    </span>
                  ))}
                </span>
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  released && booth ? "bg-tab-selected text-teal-ink" : "bg-black/5 text-black/50"
                }`}
              >
                {released && booth ? `Booth ${booth}` : "Booth TBC"}
              </span>
            </Link>
            {view === "user" && (
              <InterestButton sellerId={seller.id} sellerName={seller.name} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
