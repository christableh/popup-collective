import Image from "next/image";
import Link from "next/link";

type Tab = { key: string; label: string; href: string; icon: string };

export type View = "business" | "user";

const tabsByView: Record<View, Tab[]> = {
  // Figma: "Business owners view" (69:815)
  business: [
    {
      key: "popups",
      label: "PopUps",
      href: "/business/popups",
      icon: "/figma/shop.png",
    },
    { key: "home", label: "Home", href: "/business", icon: "/figma/home.png" },
    {
      key: "vendor",
      label: "Vendor",
      href: "/business/vendor",
      icon: "/figma/shop-coins.png",
    },
    {
      key: "bookings",
      label: "Bookings",
      href: "/business/bookings",
      icon: "/figma/rules.png",
    },
  ],
  // Figma: "User public view" (69:816)
  user: [
    {
      key: "popups",
      label: "PopUps",
      href: "/user/popups",
      icon: "/figma/shop.png",
    },
    { key: "home", label: "Home", href: "/user", icon: "/figma/home.png" },
    {
      key: "calendar",
      label: "Calendar",
      href: "/user/calendar",
      icon: "/figma/calendar.png",
    },
    {
      key: "profile",
      label: "Profile",
      href: "/user/profile",
      icon: "/figma/user.png",
    },
  ],
};

export type TabBarProps = {
  /** Key of the highlighted tab; omit to highlight none. */
  active?: string;
  view: View;
};

/** iOS-style floating tab bar (Figma: "Tab Bar - iPhone"). */
export function TabBar({ active, view }: TabBarProps) {
  const tabs = tabsByView[view];

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-0 left-1/2 z-10 flex h-[95px] w-full max-w-[402px] -translate-x-1/2 items-end justify-center bg-cream px-[25px] pt-4 pb-[25px]"
    >
      <div className="relative flex flex-1 items-center justify-center px-0.5">
        {/* Glass pill background */}
        <div
          aria-hidden
          className="absolute -inset-1 rounded-full shadow-[1.25px_0px_0px_-0.75px_#d0d0d0,-1.25px_0px_0px_-0.75px_#d0d0d0,0px_0px_0px_0.5px_#e8e8e8,0px_8px_15px_0px_rgba(0,0,0,0.02)]"
        >
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,0.25)),linear-gradient(90deg,rgba(0,0,0,0.25),rgba(0,0,0,0.25))]" />
          <div className="absolute inset-0 rounded-full bg-[rgba(68,68,68,0.6)] mix-blend-plus-lighter" />
          <div className="absolute inset-0 rounded-full bg-[rgba(248,248,248,0.2)] mix-blend-luminosity" />
        </div>

        {tabs.map((tab, i) => {
          const selected = tab.key === active;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              aria-current={selected ? "page" : undefined}
              className={`relative flex h-[54px] min-w-px flex-1 flex-col items-center justify-center gap-px px-2 pt-1.5 pb-[7px] ${
                i < tabs.length - 1 ? "-mr-2" : ""
              }`}
            >
              {selected && (
                <span
                  aria-hidden
                  className="absolute inset-y-0 -inset-x-0.5 rounded-full bg-tab-selected"
                />
              )}
              <Image
                src={tab.icon}
                alt=""
                width={28}
                height={28}
                className="relative size-7 object-contain"
              />
              <span
                className={`relative w-full text-center font-system text-[10px] leading-3 font-semibold ${
                  selected ? "text-teal-ink" : "text-ink"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
