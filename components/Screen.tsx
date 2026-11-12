import Image from "next/image";
import Link from "next/link";
import { TabBar, type TabBarProps } from "./TabBar";

type ScreenProps = TabBarProps & {
  /** Href for the back chevron; omit to hide it. */
  backHref?: string;
  /** Show the profile avatar in the top-right corner (business view only). */
  showAvatar?: boolean;
  children: React.ReactNode;
};

/** Phone-width shell: title header, scrollable content, fixed tab bar. */
export function Screen({
  backHref,
  showAvatar,
  children,
  ...tabBar
}: ScreenProps) {
  const avatar = showAvatar ?? tabBar.view === "business";
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[402px] bg-cream pb-[115px]">
      <header className="relative flex h-[117px] items-start justify-center pt-[76px]">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Back"
            className="absolute top-[76px] left-[6px] h-[42px] w-[53px]"
          >
            <Image
              src="/figma/back.png"
              alt=""
              fill
              sizes="53px"
              className="object-contain"
            />
          </Link>
        )}
        <h1 className="text-[24px] font-black">PopUp Collective</h1>
        {avatar && (
          <Link
            href={`/${tabBar.view}/profile`}
            aria-label="Profile"
            className="absolute top-[75px] right-[25px] h-[39px] w-[38px]"
          >
            <Image
              src="/figma/avatar-bg.svg"
              alt=""
              width={38}
              height={36}
              className="absolute top-px left-0"
            />
            <Image
              src="/figma/user.png"
              alt=""
              width={28}
              height={39}
              className="absolute top-0 left-[5px] h-[39px] w-[28px] object-contain"
            />
          </Link>
        )}
      </header>
      <main>{children}</main>
      <TabBar {...tabBar} />
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-[16px] font-semibold ${className}`}>{children}</h2>
  );
}
