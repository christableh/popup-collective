import Link from "next/link";
import { getPopUp, isHappeningNow, isPast, type PopUp } from "@/lib/popups";
import { appearancesFor, placementsReleased, type Seller } from "@/lib/sellers";
import { InterestButton } from "./InterestButton";
import { SellerAvatar } from "./SellerAvatar";

/** Seller page body: vibe, what they sell, and where to find them. */
export function SellerProfile({
  seller,
  view,
}: {
  seller: Seller;
  view: "user" | "business";
}) {
  const [c1, c2, c3] = seller.palette;
  const appearances = appearancesFor(seller.id)
    .map((a) => ({ ...a, popup: getPopUp(a.popupId)! }))
    .filter((a) => a.popup)
    .sort((a, b) => a.popup.date.localeCompare(b.popup.date));
  const upcoming = appearances.filter((a) => !isPast(a.popup));
  const past = appearances.filter((a) => isPast(a.popup)).reverse();

  return (
    <div className="pb-6">
      {/* Mood banner */}
      <div
        className="relative mx-5 mt-4 h-[110px] rounded-[10px]"
        style={{
          background: `linear-gradient(120deg, ${c1} 0%, ${c1} 38%, ${c2} 38%, ${c2} 70%, ${c3} 70%)`,
        }}
      >
        <SellerAvatar
          seller={seller}
          size={72}
          ring
          className="absolute -bottom-9 left-4 ring-4!"
        />
      </div>

      <div className="mx-5 mt-2 flex items-start justify-between pl-[96px]">
        <div className="min-w-0">
          <h2 className="truncate text-[20px] leading-6 font-bold italic">{seller.name}</h2>
          <p className="text-[12px] text-black/60">{seller.handle}</p>
        </div>
      </div>

      <div className="mx-5 mt-5">
        <p className="text-[14px] font-semibold">{seller.tagline}</p>
        <p className="mt-1 text-[12px] leading-[17px] text-black/75">{seller.about}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-teal px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {seller.category}
            </span>
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-semibold">
              {seller.priceRange}
            </span>
          </div>
          {view === "user" && (
            <InterestButton sellerId={seller.id} sellerName={seller.name} variant="pill" />
          )}
        </div>
      </div>

      <section className="mx-5 mt-5">
        <h3 className="text-[16px] font-semibold">Aesthetic</h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {seller.aesthetic.map((a) => (
            <li
              key={a}
              className="rounded-[9px] border border-teal/40 bg-tab-selected/40 px-3 py-1 text-[12px] font-semibold text-teal-ink"
            >
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex h-3 w-[160px] overflow-hidden rounded-full" aria-label="Brand colours">
          {seller.palette.map((c) => (
            <span key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>
      </section>

      <section className="mx-5 mt-5">
        <h3 className="text-[16px] font-semibold">What they sell</h3>
        <ul className="mt-2 grid w-[361px] grid-cols-3 gap-2">
          {seller.sells.map((item, i) => {
            const a = seller.palette[i % 3];
            const b = seller.palette[(i + 1) % 3];
            return (
              <li
                key={item.name}
                className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-[10px] p-2"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${b} 0 22%, transparent 23%), linear-gradient(150deg, ${a}, ${b})`,
                }}
              >
                <span className="rounded-md bg-white/90 px-1.5 py-1 text-[11px] leading-tight font-semibold">
                  {item.name}
                  <span className="block font-normal text-black/60">from {item.price}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-5 mt-5">
        <h3 className="text-[16px] font-semibold">Find them at</h3>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-[12px] text-black/60">No upcoming pop-ups yet.</p>
        ) : (
          <ul className="mt-2 flex w-[361px] flex-col gap-2">
            {upcoming.map(({ popup, booth }) => (
              <li key={popup.id}>
                <AppearanceRow popup={popup} booth={booth} view={view} />
              </li>
            ))}
          </ul>
        )}
        {past.length > 0 && (
          <p className="mt-3 text-[11px] text-black/60">
            Previously at: {past.map((a) => a.popup.name).join(", ")}
          </p>
        )}
      </section>
    </div>
  );
}

function AppearanceRow({
  popup,
  booth,
  view,
}: {
  popup: PopUp;
  booth?: number;
  view: "user" | "business";
}) {
  const released = placementsReleased(popup.id) && booth;
  return (
    <Link
      href={`/${view}/popups/${popup.id}${released ? "#map" : ""}`}
      className="relative block rounded-[10px] bg-teal px-3.5 py-2.5 text-white transition-colors hover:bg-teal-muted"
    >
      <p className="pr-24 text-[13px] leading-[18px] font-bold">{popup.name}</p>
      <p className="text-[12px] leading-[18px]">{popup.dateTime}</p>
      <p className="text-[12px] leading-[18px] opacity-80">{popup.venue}</p>
      <span className="absolute top-2.5 right-3 flex flex-col items-end gap-1">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            released ? "bg-tab-selected text-teal-ink" : "bg-white/20"
          }`}
        >
          {released ? `Booth ${booth}` : "Booth TBC"}
        </span>
        {isHappeningNow(popup) && (
          <span className="text-[10px] font-bold">● On now</span>
        )}
      </span>
      {released && (
        <span className="mt-1 block text-[11px] font-semibold underline underline-offset-2">
          See on booth map →
        </span>
      )}
    </Link>
  );
}
