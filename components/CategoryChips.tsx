"use client";

import Image from "next/image";
import { categories, type Category } from "@/lib/popups";

/** Filter chips (Figma: Rectangles 3–5). */
export function CategoryChips({
  selected,
  onChange,
}: {
  selected: Category[];
  onChange: (next: Category[]) => void;
}) {
  const toggle = (c: Category) =>
    onChange(
      selected.includes(c) ? selected.filter((x) => x !== c) : [...selected, c],
    );

  return (
    <div className="flex gap-2">
      {categories.map((c) => {
        const on = selected.includes(c);
        return (
          <button
            key={c}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(c)}
            className={`relative flex h-[26px] w-[84px] items-center justify-center rounded-[9px] text-[12px] font-semibold transition-shadow ${
              on ? "text-white" : ""
            }`}
          >
            <Image
              src="/figma/chip.svg"
              alt=""
              width={84}
              height={26}
              className="absolute inset-0"
            />
            {on && (
              <span aria-hidden className="absolute inset-0 rounded-[9px] bg-teal" />
            )}
            <span className="relative">{c}</span>
          </button>
        );
      })}
    </div>
  );
}
