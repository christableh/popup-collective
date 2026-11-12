import { notFound } from "next/navigation";
import { Screen } from "@/components/Screen";
import { PillButton, PopUpDetails } from "@/components/ui";
import { getPopUp } from "@/lib/popups";
import { ConfirmedDetails } from "../BookingFlow";

// Figma: "PopUp info page" confirmation step (55:698)
export default async function ConfirmedPage({
  params,
}: PageProps<"/business/popups/[id]/confirmed">) {
  const { id } = await params;
  const popup = getPopUp(id);
  if (!popup) notFound();

  return (
    <Screen view="business" active="popups" backHref="/business/popups" showAvatar={false}>
      <article className="mt-5 ml-[22px] min-h-[271px] w-[361px] rounded-[10px] bg-teal pt-3.5 pb-5">
        <h2 className="mx-auto w-[212px] text-center text-[20px] font-black text-white">
          Your Booking has been confirmed!
        </h2>
        <PopUpDetails popup={popup} className="mt-[27px] pl-[17px]" />
        <p className="mt-1 pl-[17px] text-[12px] text-white">{popup.venue}</p>
        <ConfirmedDetails popupId={popup.id} />
      </article>

      <PillButton
        href="/business/bookings"
        background="/figma/btn-bookings.svg"
        width={196}
        className="mt-[25px] ml-[184px] text-[20px] font-semibold"
      >
        Go to my bookings
      </PillButton>
    </Screen>
  );
}
