import Link from "next/link";
import { Screen, SectionHeading } from "@/components/Screen";
import { PopUpDetails, Sellers } from "@/components/ui";
import { addDays, TODAY, upcomingPopups } from "@/lib/popups";
import { CalendarPicker } from "./CalendarPicker";

// Figma: "iPhone 17 - 2" (32:1355) and the day-selected state "iPhone 17 - 4" (48:2231)
export default function CalendarPage() {
  const horizon = addDays(TODAY, 14);
  const nextTwoWeeks = upcomingPopups.filter((p) => p.date <= horizon);

  return (
    <Screen view="user" active="calendar">
      <CalendarPicker />

      <section className="pl-4">
        <SectionHeading className="h-[30px]">
          Happening in next 2 Weeks...
        </SectionHeading>
        <ul className="ml-2 flex flex-col gap-1.5">
          {nextTwoWeeks.map((popup) => (
            <li key={popup.id}>
              <Link
                href={`/user/popups/${popup.id}`}
                className="relative block h-[84px] w-[346px] rounded-[10px] bg-teal pt-3.5 pl-[13px] transition-colors hover:bg-teal-muted"
              >
                <PopUpDetails popup={popup} />
                <span className="absolute right-[20px] bottom-[12px] text-white">
                  <Sellers popupId={popup.id} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Screen>
  );
}
