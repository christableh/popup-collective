import Image from "next/image";
import Link from "next/link";

const views = [
  {
    href: "/business",
    title: "Business view",
    blurb: "Find booths, compare vendors and manage bookings.",
    icon: "/figma/shop-coins.png",
  },
  {
    href: "/user",
    title: "User view",
    blurb: "Discover pop-ups near you and plan your weekend.",
    icon: "/figma/user.png",
  },
];

/** Entry point: pick which set of Figma screens to explore. */
export default function ViewPicker() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[402px] bg-cream px-[25px]">
      <header className="flex h-[117px] items-start justify-center pt-[76px]">
        <h1 className="text-[24px] font-black">PopUp Collective</h1>
      </header>

      <p className="mt-6 text-[20px] font-bold italic">Who&apos;s browsing?</p>

      <ul className="mt-4 flex flex-col gap-4">
        {views.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="flex items-center gap-4 rounded-[10px] bg-teal p-5 text-white transition-colors hover:bg-teal-muted"
            >
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-tab-selected">
                <Image
                  src={v.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 object-contain"
                />
              </span>
              <span>
                <span className="block text-[16px] font-bold">{v.title}</span>
                <span className="mt-1 block text-[12px]">{v.blurb}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
