import { initials, type Seller } from "@/lib/sellers";

/** Brand-coloured initials circle standing in for a seller's logo. */
export function SellerAvatar({
  seller,
  size = 40,
  ring = false,
  className = "",
}: {
  seller: Seller;
  size?: number;
  /** White ring, for overlapping stacks and banners. */
  ring?: boolean;
  className?: string;
}) {
  const [main, accent] = seller.palette;
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.36),
        background: `linear-gradient(135deg, ${main} 55%, ${accent})`,
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight text-white ${
        ring ? "ring-2 ring-cream" : ""
      } ${className}`}
    >
      {initials(seller.name)}
    </span>
  );
}
