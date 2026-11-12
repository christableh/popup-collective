import { notFound } from "next/navigation";
import { ReminderPill } from "@/components/ReminderButton";
import { BoothMap } from "@/components/BoothMap";
import { Screen } from "@/components/Screen";
import { SellerLineup } from "@/components/SellerLineup";
import { PopUpDetails, PopUpFacts, Sellers, Stars } from "@/components/ui";
import { placementsReleased } from "@/lib/sellers";
import { getPopUp, isPast, popups } from "@/lib/popups";

export function generateStaticParams() {
  return popups.map((p) => ({ id: p.id }));
}

// Figma: "PopUp info page" (69:758) — public view, no booking
export default async function UserPopUpInfoPage({
  params,
}: PageProps<"/user/popups/[id]">) {
  const { id } = await params;
  const popup = getPopUp(id);
  if (!popup) notFound();

  return (
    <Screen view="user" active="popups" backHref="/user/popups">
      <article className="relative mt-[25px] ml-5 min-h-[553px] w-[361px] rounded-[10px] bg-teal pt-[27px] pb-[80px]">
        <PopUpDetails popup={popup} className="pl-[26px]" />
        <span className="absolute top-[59px] right-9 text-white">
          <Sellers popupId={popup.id} />
        </span>
        <span className="absolute top-[27px] right-6">
          <Stars rating={popup.rating} />
        </span>

        <PopUpFacts
          popup={popup}
          rows={[
            ["Where", popup.venue],
            ["When", popup.dateTime],
            ["What", popup.category],
            ["Stalls", `${popup.boothsTotal} sellers`],
            ["Entry", "Free"],
          ]}
        />

        <div className="absolute right-[11px] bottom-[18px]">
          {isPast(popup) ? (
            <span className="text-[14px] font-semibold text-white/80">This pop-up has ended</span>
          ) : (
            <ReminderPill popupId={popup.id} />
          )}
        </div>
      </article>

      {/* On the day, the map matters most; before that, the lineup does. */}
      {placementsReleased(popup.id) ? (
        <>
          <BoothMap popupId={popup.id} view="user" />
          <SellerLineup popupId={popup.id} view="user" />
        </>
      ) : (
        <>
          <SellerLineup popupId={popup.id} view="user" />
          <BoothMap popupId={popup.id} view="user" />
        </>
      )}
      <div className="h-6" />
    </Screen>
  );
}
