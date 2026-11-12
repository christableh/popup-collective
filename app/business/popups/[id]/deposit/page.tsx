import { notFound } from "next/navigation";
import { Screen } from "@/components/Screen";
import { PopUpDetails } from "@/components/ui";
import { getPopUp } from "@/lib/popups";
import { DepositForm } from "../BookingFlow";

// Figma: "PopUp info page" deposit step (55:637)
export default async function DepositPage({
  params,
}: PageProps<"/business/popups/[id]/deposit">) {
  const { id } = await params;
  const popup = getPopUp(id);
  if (!popup) notFound();

  return (
    <Screen view="business" active="popups" backHref={`/business/popups/${popup.id}`} showAvatar={false}>
      <article className="relative mt-5 ml-[26px] min-h-[359px] w-[361px] rounded-[10px] bg-teal pt-8">
        <PopUpDetails popup={popup} className="pl-[26px]" />
        <DepositForm popupId={popup.id} />
      </article>
    </Screen>
  );
}
