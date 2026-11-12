import { Suspense } from "react";
import { Screen } from "@/components/Screen";
import { BrowseList } from "./BrowseList";

type SearchParams = PageProps<"/business/popups/browse">["searchParams"];

// Figma: "PopUps page" list variant (50:4477)
export default function BrowsePopUpsPage({
  searchParams,
}: PageProps<"/business/popups/browse">) {
  return (
    <Screen view="business" active="popups" backHref="/business/popups">
      {/* searchParams is request-time data, so keep it behind Suspense. */}
      <Suspense fallback={<BrowseList initialQuery="" />}>
        <BrowseWithQuery searchParams={searchParams} />
      </Suspense>
    </Screen>
  );
}

async function BrowseWithQuery({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";
  // key: reset local state when arriving with a new ?q=
  return <BrowseList key={initialQuery} initialQuery={initialQuery} />;
}
