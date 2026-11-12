import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";
import { Screen } from "@/components/Screen";

// Figma: "iPhone 17 - 5" profile screen (58:1002), reached from the header avatar
export default function BusinessProfilePage() {
  return (
    <Screen view="business" backHref="/business" showAvatar={false}>
      <ProfileCard name="Christabel" view="business" />
      <Link
        href="/user"
        className="mt-4 ml-[25px] inline-block text-[12px] font-semibold text-teal underline-offset-2 hover:underline"
      >
        Switch to User view →
      </Link>
    </Screen>
  );
}
