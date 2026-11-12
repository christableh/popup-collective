import { notFound } from "next/navigation";
import { Screen } from "@/components/Screen";
import { SellerProfile } from "@/components/SellerProfile";
import { getSeller, sellers } from "@/lib/sellers";

export function generateStaticParams() {
  return sellers.map((s) => ({ id: s.id }));
}

export default async function SellerPage({
  params,
}: PageProps<"/user/sellers/[id]">) {
  const { id } = await params;
  const seller = getSeller(id);
  if (!seller) notFound();

  return (
    <Screen view="user" backHref="/user/sellers" showAvatar={false}>
      <SellerProfile seller={seller} view="user" />
    </Screen>
  );
}
