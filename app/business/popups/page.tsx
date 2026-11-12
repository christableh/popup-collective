import Link from "next/link";
import { SellerAvatar } from "@/components/SellerAvatar";
import { getSeller } from "@/lib/sellers";
import { Screen, SectionHeading } from "@/components/Screen";
import { PopUpsExplorer } from "./PopUpsExplorer";

const collab = ["mei-ceramics", "inkpot-studio", "loom-and-lace", "sol-silver"].map(
  (id) => getSeller(id)!,
);

// Figma: "PopUps page" (1:3)
export default function PopUpsPage() {
  return (
    <Screen view="business" active="popups">
      <PopUpsExplorer />

      <section className="mt-[13px] pl-9">
        <SectionHeading className="h-[23px]">
          Collab with these sellers
        </SectionHeading>
        <ul className="ml-1.5 flex gap-6">
          {collab.map((s) => (
            <li key={s.id} className="w-14 text-center">
              <Link href={`/business/sellers/${s.id}`} title={s.tagline} className="block">
                <SellerAvatar seller={s} size={56} />
                <span className="mt-1 block text-[9px] leading-[11px]">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Screen>
  );
}
