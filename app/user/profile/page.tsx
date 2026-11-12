import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";
import { Screen } from "@/components/Screen";

// Figma: "iPhone 17 - 3" (33:2125)
export default function UserProfilePage() {
  return (
    <Screen view="user" active="profile">
      <ProfileCard name="Christabel" view="user" />
      <Link
        href="/business"
        className="mt-4 ml-[25px] inline-block text-[12px] font-semibold text-teal underline-offset-2 hover:underline"
      >
        Switch to Business view →
      </Link>
    </Screen>
  );
}
