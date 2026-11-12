"use client";

import { toggleInterested, useStore } from "@/lib/store";

/** Mark a seller as one you want to visit. `pill` for profile pages, `icon` in lists. */
export function InterestButton({
  sellerId,
  sellerName,
  variant = "icon",
  className = "",
}: {
  sellerId: string;
  sellerName: string;
  variant?: "icon" | "pill";
  className?: string;
}) {
  const store = useStore();
  const on = store.interested.includes(sellerId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleInterested(sellerId);
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={onClick}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
          on
            ? "bg-teal text-white"
            : "border border-teal bg-cream text-teal hover:bg-teal/10"
        } ${className}`}
      >
        <span aria-hidden>{on ? "♥" : "♡"}</span>
        {on ? "Interested" : "I'm interested"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Not interested in ${sellerName}` : `Interested in ${sellerName}`}
      onClick={onClick}
      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[17px] transition-colors ${
        on ? "bg-teal text-white" : "bg-teal/10 text-teal hover:bg-teal/20"
      } ${className}`}
    >
      {on ? "♥" : "♡"}
    </button>
  );
}
