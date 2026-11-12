import Link from "next/link";
import { ReminderButton } from "@/components/ReminderButton";
import { Screen, SectionHeading } from "@/components/Screen";
import { PopUpDetails } from "@/components/ui";
import { DiscoverSellers, TodayCard } from "./HomeExtras";
import { addDays, isOnDay, TODAY, upcomingPopups } from "@/lib/popups";

// Figma: "home page" (32:946)
export default function UserHomePage() {
  const current = upcomingPopups.slice(0, 2);
  // Saturday/Sunday of next week, relative to the demo's TODAY.
  const weekday = new Date(`${TODAY}T00:00:00Z`).getUTCDay();
  const saturday = addDays(TODAY, 6 - weekday + 7);
  const sunday = addDays(saturday, 1);
  const soon = upcomingPopups
    .filter((p) => isOnDay(p, saturday) || isOnDay(p, sunday))
    .slice(0, 3);

  return (
    <Screen view="user" active="home">
      <p className="mt-[54px] h-[47px] pl-4 text-[20px] font-bold italic">
        Hello, Christabel!
      </p>

      <TodayCard />

      <section className="px-[18px]">
        <SectionHeading className="h-6">Current PopUps</SectionHeading>
        <ul className="flex gap-[29px]">
          {current.map((popup) => (
            <li key={popup.id}>
              <Link
                href={`/user/popups/${popup.id}`}
                className="relative block h-full min-h-[133px] w-[159px] rounded-[10px] bg-teal pt-[44px] pr-2 pb-2.5 pl-2.5 transition-colors hover:bg-teal-muted"
              >
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {popup.category}
                </span>
                <PopUpDetails popup={popup} className="[&>p:nth-child(2)]:text-[11px]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[26px] px-[18px]">
        <SectionHeading className="h-[30px]">
          Events next weekend..
        </SectionHeading>
        <ul className="flex w-[349px] flex-col gap-[18px] rounded-[10px] bg-teal px-[9px] py-[18px]">
          {soon.map((popup) => (
            <li
              key={popup.id}
              className="relative h-[61px] w-[327px] rounded-[3px] bg-sage text-white"
            >
              <Link
                href={`/user/popups/${popup.id}`}
                className="block h-full px-[7px] pt-[3px] pr-10"
              >
                <PopUpDetails popup={popup} className="[&>p]:truncate" />
              </Link>
              <ReminderButton popupId={popup.id} className="absolute -top-1 left-[299px]" />
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-black/60">
          Tap the bell to get a reminder the day before.
        </p>
      </section>

      <DiscoverSellers />
    </Screen>
  );
}
