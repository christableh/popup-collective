"use client";

import Image from "next/image";
import { toggleReminder, useStore } from "@/lib/store";

/** Alarm icon that toggles a reminder for a pop-up (user view). */
export function ReminderButton({
  popupId,
  className = "",
}: {
  popupId: string;
  className?: string;
}) {
  const store = useStore();
  const on = store.reminders.includes(popupId);
  return (
    <button
      type="button"
      aria-label={on ? "Remove reminder" : "Remind me"}
      aria-pressed={on}
      title={on ? "Reminder set" : "Remind me"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleReminder(popupId);
      }}
      className={`h-[39px] w-6 transition-opacity ${on ? "" : "opacity-40 hover:opacity-70"} ${className}`}
    >
      <Image
        src="/figma/alarm.png"
        alt=""
        fill
        sizes="24px"
        className="object-contain"
      />
      {on && (
        <span className="absolute -right-1 bottom-0 size-2.5 rounded-full border-2 border-sage bg-white" />
      )}
    </button>
  );
}

/** Pill version for the pop-up info page. */
export function ReminderPill({ popupId }: { popupId: string }) {
  const store = useStore();
  const on = store.reminders.includes(popupId);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggleReminder(popupId)}
      className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
        on ? "bg-tab-selected text-teal-ink" : "bg-white/20 text-white hover:bg-white/30"
      }`}
    >
      {on ? "🔔 Reminder set" : "Remind me"}
    </button>
  );
}
