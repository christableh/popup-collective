import { Suspense } from "react";
import { Screen } from "@/components/Screen";
import { SellerDirectory } from "./SellerDirectory";

type SearchParams = PageProps<"/user/sellers">["searchParams"];

export default function SellersPage({ searchParams }: PageProps<"/user/sellers">) {
  return (
    <Screen view="user" active="home" backHref="/user">
      <Suspense fallback={<SellerDirectory initialFilter="all" />}>
        <WithFilter searchParams={searchParams} />
      </Suspense>
    </Screen>
  );
}

async function WithFilter({ searchParams }: { searchParams: SearchParams }) {
  const { filter } = await searchParams;
  const initial = filter === "interested" ? "interested" : "all";
  return <SellerDirectory key={initial} initialFilter={initial} />;
}
