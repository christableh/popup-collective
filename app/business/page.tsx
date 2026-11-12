import Image from "next/image";
import Link from "next/link";
import { BoothsLeftNote } from "@/components/BoothsLeftNote";
import { Screen, SectionHeading } from "@/components/Screen";
import { PopUpDetails, PopUpRow } from "@/components/ui";
import { pastPopups, upcomingPopups } from "@/lib/popups";

// Figma: "Home page" (7:575)
export default function HomePage() {
  const suggestions = [...upcomingPopups]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  // Most room left = easiest to get into.
  const stillOpen = [...upcomingPopups]
    .sort(
      (a, b) =>
        b.boothsTotal - b.boothsTaken - (a.boothsTotal - a.boothsTaken),
    )
    .slice(0, 2);

  return (
    <Screen view="business" active="home">
      <p className="mt-5 h-[41px] pl-[22px] text-[20px] font-bold italic">
        Hello, Christabel!
      </p>

      <section className="px-6">
        <SectionHeading className="h-[30px] pl-px">
          Here are some PopUps for you
        </SectionHeading>
        <ul className="grid grid-cols-[159px_159px] justify-between gap-y-2">
          {suggestions.map((popup) => (
            <li key={popup.id}>
              <Link
                href={`/business/popups/${popup.id}`}
                className="relative block h-full min-h-[133px] rounded-[10px] bg-teal pt-[44px] pr-2 pb-2.5 pl-2.5 transition-colors hover:bg-teal-muted"
              >
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {popup.category}
                </span>
                <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold text-white">
                  ★ {popup.rating}
                </span>
                <PopUpDetails popup={popup} className="[&>p:nth-child(2)]:text-[11px]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[15px] px-[25px]">
        <SectionHeading className="h-6">
          Still looking to join a PopUp?
        </SectionHeading>
        <div className="flex h-[164px] w-[356px] flex-col gap-2 rounded-[10px] bg-teal-muted px-3 pt-3.5">
          {stillOpen.map((popup) => (
            <PopUpRow
              key={popup.id}
              popup={popup}
              href={`/business/popups/${popup.id}`}
              note={<BoothsLeftNote popupId={popup.id} />}
            />
          ))}
        </div>
      </section>

      <Image
        src="/figma/line.svg"
        alt=""
        width={402}
        height={1}
        className="mt-[11px] h-px w-full"
      />

      <section className="mt-[10px] px-[25px] pb-4">
        <SectionHeading className="h-7">Recent PopUps</SectionHeading>
        <div className="flex w-[356px] flex-col gap-2 rounded-[10px] bg-teal-muted p-3">
          {pastPopups.map((popup) => (
            <PopUpRow
              key={popup.id}
              popup={popup}
              href={`/business/popups/${popup.id}`}
              rating
            />
          ))}
        </div>
      </section>
    </Screen>
  );
}
