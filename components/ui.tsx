import Image from "next/image";
import Link from "next/link";
import type { PopUp } from "@/lib/popups";
import { lineupFor } from "@/lib/sellers";
import { SellerAvatar } from "./SellerAvatar";

/** Outlined search field, optionally followed by the filter ("Slider") icon. */
export function SearchBar({
  withFilter = false,
  value,
  onChange,
  onSubmit,
  onFilterClick,
  filterActive = false,
  name = "q",
  action,
}: {
  withFilter?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFilterClick?: () => void;
  filterActive?: boolean;
  name?: string;
  /** Plain form submit target, for server-rendered pages. */
  action?: string;
}) {
  return (
    <form
      role="search"
      action={action}
      onSubmit={
        onSubmit
          ? (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              onSubmit(String(data.get(name) ?? ""));
            }
          : undefined
      }
      className="flex items-center gap-3"
    >
      <label className="relative flex h-[33px] w-[305px] items-center rounded-[5px] border border-black bg-cream pl-[37px]">
        <Image
          src="/figma/search.png"
          alt=""
          width={20}
          height={20}
          className="absolute left-[9px] size-5 object-contain"
        />
        <span className="sr-only">Search</span>
        <input
          type="search"
          name={name}
          placeholder="Search pop-ups, venues, organisers..."
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="h-full w-full bg-transparent pr-2 text-[12px] text-black outline-none placeholder:text-black/60"
        />
      </label>
      {withFilter && (
        <button
          type="button"
          aria-label="Filters"
          aria-pressed={filterActive}
          onClick={onFilterClick}
          className={`relative h-[39px] w-8 shrink-0 rounded-md ${
            filterActive ? "bg-tab-selected" : ""
          }`}
        >
          <Image
            src="/figma/slider.png"
            alt=""
            fill
            sizes="32px"
            className="object-contain"
          />
        </button>
      )}
    </form>
  );
}

/** "Sellers: ●●●" — the first few sellers at a pop-up; `dark` on light backgrounds. */
export function Sellers({
  popupId,
  dark = false,
}: {
  popupId?: string;
  dark?: boolean;
}) {
  const lineup = popupId ? lineupFor(popupId) : [];
  if (lineup.length === 0) {
    const src = dark ? "/figma/avatar-sm-dark.svg" : "/figma/avatar-sm.svg";
    return (
      <span className="flex items-center gap-[5px] text-[12px]">
        Sellers:
        <span className="flex gap-1">
          <Image src={src} alt="" width={21} height={21} />
          <Image src={src} alt="" width={21} height={21} />
        </span>
      </span>
    );
  }
  const shown = lineup.slice(0, 3);
  const extra = lineup.length - shown.length;
  return (
    <span
      className="flex items-center gap-[5px] text-[12px]"
      title={lineup.map((e) => e.seller.name).join(", ")}
    >
      Sellers:
      <span className="flex">
        {shown.map((e, i) => (
          <SellerAvatar
            key={e.sellerId}
            seller={e.seller}
            size={21}
            className={`text-[8px] ${i > 0 ? "-ml-1.5" : ""} ${
              dark ? "ring-2 ring-cream" : "ring-2 ring-teal"
            }`}
          />
        ))}
      </span>
      {extra > 0 && <span className="text-[11px] font-semibold">+{extra}</span>}
    </span>
  );
}

/** Five-star rating (Figma: "Group 7"); stars beyond the rating are faded. */
export function Stars({ rating = 5 }: { rating?: number }) {
  const offsets = [0, 24, 47, 71, 94];
  return (
    <span
      role="img"
      aria-label={`${rating} star rating`}
      className="relative block h-[19px] w-[123px]"
    >
      {offsets.map((left, i) => (
        <Image
          key={left}
          src="/figma/star.png"
          alt=""
          width={29}
          height={19}
          style={{ left }}
          className={`absolute top-0 h-[19px] w-[29px] object-contain ${
            i + 0.5 > rating ? "opacity-35" : ""
          }`}
        />
      ))}
    </span>
  );
}

/** Sage list row used in "Upcoming Pop Ups" and "Available Booths". */
export function PopUpRow({
  popup,
  href,
  rating = false,
  tall = false,
  note,
}: {
  popup: PopUp;
  href: string;
  rating?: boolean;
  tall?: boolean;
  /** Small text in the bottom-right corner instead of the sellers row. */
  note?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative block shrink-0 rounded-[3px] bg-sage px-[7px] text-white transition-opacity hover:opacity-90 ${
        tall ? "h-[65px] pt-[7px]" : "h-[61px] pt-[3px]"
      }`}
    >
      <p className="truncate pr-[130px] text-[13px] leading-[18px] font-bold">
        {popup.name}
      </p>
      <p className="mt-0.5 text-[12px] leading-[18px]">{popup.dateTime}</p>
      <p className="truncate pr-[110px] text-[12px] leading-[18px]">{popup.vendor}</p>
      {rating && (
        <span className="absolute top-1 right-1.5">
          <Stars rating={popup.rating} />
        </span>
      )}
      <span className="absolute right-[12px] bottom-[5px] text-[11px] font-semibold">
        {note ?? <Sellers popupId={popup.id} />}
      </span>
    </Link>
  );
}

/** Translucent teal pill (SVG background from Figma) as a link or a button. */
export function PillButton({
  href,
  onClick,
  disabled = false,
  background,
  width,
  children,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  background: string;
  width: number;
  children: React.ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      <Image
        src={background}
        alt=""
        width={width}
        height={40}
        className="absolute inset-0"
      />
      <span className="relative flex items-center gap-1.5">{children}</span>
    </>
  );
  const cls = `relative flex h-10 items-center justify-center transition-opacity ${
    disabled ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
  } ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} style={{ width }} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ width }}
      className={cls}
    >
      {inner}
    </button>
  );
}

/** Title / date / vendor block shown inside teal panels (`dark` on cream). */
export function PopUpDetails({
  popup,
  dark = false,
  className = "",
}: {
  popup: PopUp;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`${dark ? "text-black" : "text-white"} ${className}`}>
      <p className="text-[13px] leading-[18px] font-bold">{popup.name}</p>
      <p className="mt-0.5 text-[12px] leading-[18px]">{popup.dateTime}</p>
      <p className="text-[12px] leading-[18px]">{popup.vendor}</p>
    </div>
  );
}

/** Key facts shown in the white panel on the pop-up info pages. */
export function PopUpFacts({
  popup,
  rows,
}: {
  popup: PopUp;
  rows: [label: string, value: React.ReactNode][];
}) {
  return (
    <div className="mt-[34px] ml-4 min-h-[208px] w-[327px] rounded-[3px] bg-white p-3.5 text-[12px] text-black">
      <p className="leading-[17px]">{popup.description}</p>
      <dl className="mt-3 grid grid-cols-[110px_1fr] gap-y-1.5 border-t border-black/10 pt-3">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-black/55">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Spinner for buttons waiting on the fake API. */
export function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}
