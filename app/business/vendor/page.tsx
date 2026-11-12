import { Screen } from "@/components/Screen";
import { VendorView } from "./VendorView";

export default function VendorPage() {
  return (
    <Screen view="business" active="vendor">
      <VendorView />
    </Screen>
  );
}
