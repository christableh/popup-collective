import Image from "next/image";
import Link from "next/link";
import type { PopUp } from "@/lib/popups";

/** 310×236 basemap (Figma: "Figmap") with a pin per pop-up. */
export function PopUpMap({
  popups,
  hrefFor,
  className = "",
}: {
  popups: PopUp[];
  hrefFor: (p: PopUp) => string;
  className?: string;
}) {
  return (
    <div className={`relative h-[236px] w-[310px] ${className}`}>
      <Image
        src="/figma/basemap.png"
        alt="Map of Singapore showing pop-up locations"
        fill
        sizes="310px"
        className="object-contain"
        priority
      />
      {popups.map((p) => (
        <Link
          key={p.id}
          href={hrefFor(p)}
          aria-label={p.name}
          title={`${p.name} · ${p.venue}`}
          style={{ left: p.pin.left, top: p.pin.top }}
          className="absolute h-5 w-4 transition-transform hover:z-10 hover:scale-125"
        >
          <Image src="/figma/marker.svg" alt="" width={16} height={20} />
        </Link>
      ))}
      {popups.length === 0 && (
        <p className="absolute inset-x-0 bottom-2 mx-auto w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold">
          No pop-ups match your filters
        </p>
      )}
    </div>
  );
}
