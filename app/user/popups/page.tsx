import { Screen } from "@/components/Screen";
import { UserPopUpsExplorer } from "./UserPopUpsExplorer";

// Figma: "iPhone 17 - 1" (32:1020)
export default function UserPopUpsPage() {
  return (
    <Screen view="user" active="popups">
      <UserPopUpsExplorer />
    </Screen>
  );
}
