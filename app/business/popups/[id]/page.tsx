import { notFound } from "next/navigation";
import { BoothMap } from "@/components/BoothMap";
import { Screen } from "@/components/Screen";
import { SellerLineup } from "@/components/SellerLineup";
import { PopUpDetails, PopUpFacts, Sellers, Stars } from "@/components/ui";
import { placementsReleased } from "@/lib/sellers";
import { getPopUp } from "@/lib/popups";
import { BoothsLeft, InfoActions } from "./BookingFlow";

// Figma: "PopUp info page" (32:866)
export default async function PopUpInfoPage({
  params,
}: PageProps<"/business/popups/[id]">) {
  const { id } = await params;
  const popup = getPopUp(id);
  if (!popup) notFound();

  return (
    <Screen view="business" active="popups" backHref="/business/popups" showAvatar={false}>
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
            ["Venue", popup.venue],
            ["Category", popup.category],
            ["Booth fee", `From $${popup.boothPrice}`],
            ["Expected crowd", `~${popup.expectedAttendance.toLocaleString("en-SG")} visitors`],
            ["Booths left", <BoothsLeft key="left" popupId={popup.id} />],
            ["Rating", `${popup.rating} / 5`],
          ]}
        />

        <InfoActions popupId={popup.id} />
      </article>

      {/* On the day, the map matters most; before that, the lineup does. */}
      {placementsReleased(popup.id) ? (
        <>
          <BoothMap popupId={popup.id} view="business" />
          <SellerLineup popupId={popup.id} view="business" />
        </>
      ) : (
        <>
          <SellerLineup popupId={popup.id} view="business" />
          <BoothMap popupId={popup.id} view="business" />
        </>
      )}
      <div className="h-6" />
    </Screen>
  );
}
