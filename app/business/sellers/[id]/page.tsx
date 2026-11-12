import { notFound } from "next/navigation";
import { Screen } from "@/components/Screen";
import { SellerProfile } from "@/components/SellerProfile";
import { getSeller, sellers } from "@/lib/sellers";

export function generateStaticParams() {
  return sellers.map((s) => ({ id: s.id }));
}

export default async function SellerPage({
  params,
}: PageProps<"/business/sellers/[id]">) {
  const { id } = await params;
  const seller = getSeller(id);
  if (!seller) notFound();

  return (
    <Screen view="business" active="popups" backHref="/business/popups" showAvatar={false}>
      <SellerProfile seller={seller} view="business" />
    </Screen>
  );
}
