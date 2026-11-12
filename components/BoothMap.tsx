"use client";

import Link from "next/link";
import { useState } from "react";
import { getPopUp } from "@/lib/popups";
import {
  lineupFor,
  MY_SELLER_ID,
  placementsReleased,
  type Seller,
} from "@/lib/sellers";
import { bookingFor, useStore } from "@/lib/store";
import { InterestButton } from "./InterestButton";
import { SellerAvatar } from "./SellerAvatar";

// Floor-plan geometry (SVG units, 1 unit ≈ 1px at 327px wide).
const W = 327;
const COLS = 6;
const BOOTH_W = 44;
const BOOTH_H = 30;
const GAP = 6;
const BACK_TO_BACK = 4;
const AISLE = 26;
const TOP = 52;
const LEFT = (W - (COLS * BOOTH_W + (COLS - 1) * GAP)) / 2;

const COLORS = {
  ground: "#efe8dc",
  aisle: "#f8f3ea",
  interested: "#356c6a",
  mine: "#e09f3e",
  seller: "#9ab5b4",
  empty: "#ffffff",
  emptyStroke: "#d6cdbd",
};

function boothPos(n: number) {
  const idx = n - 1;
  const row = Math.floor(idx / COLS);
  const col = idx % COLS;
  const pair = Math.floor(row / 2);
  const y =
    TOP + pair * (2 * BOOTH_H + BACK_TO_BACK + AISLE) + (row % 2) * (BOOTH_H + BACK_TO_BACK);
  return { x: LEFT + col * (BOOTH_W + GAP), y };
}

/**
 * Event layout with each booth plotted. Booths of sellers the user is
 * interested in (user view) or the business's own booth (business view) are
 * highlighted. Before the organiser releases placements, shows a teaser.
 */
export function BoothMap({
  popupId,
  view,
}: {
  popupId: string;
  view: "user" | "business";
}) {
  const store = useStore();
  const popup = getPopUp(popupId)!;
  const released = placementsReleased(popupId);
  const sellerHref = (id: string) => `/${view}/sellers/${id}`;

  const myBooking = view === "business" ? bookingFor(popupId, store) : undefined;
  const lineup = lineupFor(popupId).filter(
    // In the business view, "you" come from your booking, not the lineup.
    (e) => view === "user" || e.sellerId !== MY_SELLER_ID,
  );
  const byBooth = new Map<number, Seller>();
  for (const e of lineup) if (e.booth) byBooth.set(e.booth, e.seller);
  const interested = new Set(view === "user" ? store.interested : []);
  const interestedHere = lineup.filter((e) => interested.has(e.sellerId));

  const firstHighlighted =
    myBooking?.booth ??
    interestedHere.find((e) => e.booth)?.booth ??
    null;
  const [selected, setSelected] = useState<number | null>(firstHighlighted);

  const rows = Math.ceil(popup.boothsTotal / COLS);
  const pairs = Math.ceil(rows / 2);
  const height = TOP + pairs * (2 * BOOTH_H + BACK_TO_BACK) + (pairs - 1) * AISLE + 46;

  const selectedSeller = selected ? byBooth.get(selected) : undefined;
  const selectedIsMine = !!myBooking && selected === myBooking.booth;

  return (
    <section id="map" className="mx-5 mt-6 scroll-mt-4">
      <div className="flex items-baseline justify-between pr-1">
        <h2 className="text-[16px] font-semibold">Booth map</h2>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            released ? "bg-tab-selected text-teal-ink" : "bg-black/10 text-black/60"
          }`}
        >
          {released ? "Placements confirmed" : "Placements TBC"}
        </span>
      </div>
      {view === "user" && released && (
        <p className="mt-1 text-[12px] text-black/60">
          {interestedHere.length > 0
            ? `${interestedHere.length} seller${interestedHere.length === 1 ? "" : "s"} you're interested in ${
                interestedHere.length === 1 ? "is" : "are"
              } marked ♥. Tap a booth to see who's there.`
            : "Tap ♡ on sellers below to mark them on the map."}
        </p>
      )}

      <div className="relative mt-2 w-[361px] overflow-hidden rounded-[10px] bg-white p-[17px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          width={W}
          height={height}
          role="img"
          aria-label={`Floor plan for ${popup.name}`}
          className={released ? "" : "opacity-40 blur-[1.5px]"}
        >
          <rect x={0} y={0} width={W} height={height} rx={8} fill={COLORS.ground} />
          {/* Stage / food strip */}
          <rect x={LEFT} y={10} width={W - 2 * LEFT} height={28} rx={5} fill="#d9cdb8" />
          <text x={W / 2} y={28} textAnchor="middle" fontSize={10} fontWeight={700} fill="#6b5d48">
            STAGE · FOOD &amp; DRINKS
          </text>
          {/* Aisles */}
          {Array.from({ length: pairs - 1 }, (_, p) => {
            const y = TOP + (p + 1) * (2 * BOOTH_H + BACK_TO_BACK) + p * AISLE;
            return <rect key={p} x={0} y={y} width={W} height={AISLE} fill={COLORS.aisle} />;
          })}
          {/* A few trees for flavour */}
          {[12, W - 12].map((x) =>
            [TOP + 10, height - 70].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill="#a9c2a0" />
            )),
          )}
          {/* Booths */}
          {Array.from({ length: popup.boothsTotal }, (_, i) => {
            const n = i + 1;
            const { x, y } = boothPos(n);
            const seller = released ? byBooth.get(n) : undefined;
            const isMine = released && myBooking?.booth === n;
            const isInterested = !!seller && interested.has(seller.id);
            const fill = isMine
              ? COLORS.mine
              : isInterested
                ? COLORS.interested
                : seller
                  ? COLORS.seller
                  : COLORS.empty;
            const clickable = released && (!!seller || isMine);
            const isSelected = released && selected === n;
            return (
              <g
                key={n}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-label={
                  clickable
                    ? `Booth ${n}: ${isMine ? "your booth" : seller!.name}`
                    : undefined
                }
                onClick={clickable ? () => setSelected(n) : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(n);
                        }
                      }
                    : undefined
                }
                className={clickable ? "cursor-pointer outline-none" : ""}
              >
                <rect
                  x={x}
                  y={y}
                  width={BOOTH_W}
                  height={BOOTH_H}
                  rx={4}
                  fill={fill}
                  stroke={isSelected ? "#111" : fill === COLORS.empty ? COLORS.emptyStroke : "none"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={x + BOOTH_W / 2}
                  y={y + BOOTH_H / 2 + 3.5}
                  textAnchor="middle"
                  fontSize={isMine ? 9 : 10}
                  fontWeight={700}
                  fill={fill === COLORS.empty ? "#a49a89" : "#fff"}
                >
                  {isMine ? "YOU" : isInterested ? `♥ ${n}` : n}
                </text>
              </g>
            );
          })}
          {/* Entrance */}
          <path
            d={`M ${W / 2 - 7} ${height - 12} L ${W / 2} ${height - 22} L ${W / 2 + 7} ${height - 12} Z`}
            fill="#6b5d48"
          />
          <text x={W / 2} y={height - 26} textAnchor="middle" fontSize={9} fontWeight={700} fill="#6b5d48">
            ENTRANCE
          </text>
        </svg>

        {!released && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <p className="text-[14px] font-bold">Booth placements coming soon</p>
            <p className="mt-1 text-[12px] text-black/70">
              {view === "user"
                ? interestedHere.length > 0
                  ? `Once ${popup.vendor} confirms the layout, we'll mark the ${interestedHere.length} seller${interestedHere.length === 1 ? "" : "s"} you're interested in right here.`
                  : "Once the organiser confirms the layout, sellers you're interested in will be marked here."
                : myBooking
                  ? `You're booth #${myBooking.booth} for now. Final placement will be confirmed by ${popup.vendor}.`
                  : "The organiser will publish the floor plan closer to the day."}
            </p>
          </div>
        )}
      </div>

      {released && (
        <>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-black/70">
            {view === "user" && <Legend color={COLORS.interested} label="Interested" />}
            {view === "business" && myBooking && <Legend color={COLORS.mine} label="Your booth" />}
            <Legend color={COLORS.seller} label="Other sellers" />
            <Legend color={COLORS.empty} label="Other booths" outline />
          </ul>

          {selected && (selectedSeller || selectedIsMine) && (
            <div className="mt-3 flex items-center gap-3 rounded-[10px] bg-teal p-3 text-white">
              {selectedIsMine ? (
                <p className="text-[13px] font-semibold">
                  Booth #{selected} is yours. Set up from 2 hours before opening.
                </p>
              ) : (
                <>
                  <Link href={sellerHref(selectedSeller!.id)} className="flex min-w-0 flex-1 items-center gap-3">
                    <SellerAvatar seller={selectedSeller!} size={40} />
                    <span className="min-w-0">
                      <span className="block text-[11px] opacity-80">Booth #{selected}</span>
                      <span className="block truncate text-[14px] font-bold">{selectedSeller!.name}</span>
                      <span className="block truncate text-[11px]">
                        {selectedSeller!.sells.map((s) => s.name).join(" · ")}
                      </span>
                    </span>
                  </Link>
                  {view === "user" && (
                    <InterestButton
                      sellerId={selectedSeller!.id}
                      sellerName={selectedSeller!.name}
                      className="bg-white/15! text-white!"
                    />
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function Legend({ color, label, outline = false }: { color: string; label: string; outline?: boolean }) {
  return (
    <li className="flex items-center gap-1">
      <span
        className={`inline-block size-3 rounded-[3px] ${outline ? "border border-[#d6cdbd]" : ""}`}
        style={{ background: color }}
      />
      {label}
    </li>
  );
}
