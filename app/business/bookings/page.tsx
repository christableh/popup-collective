import { Screen } from "@/components/Screen";
import { BookingsList } from "./BookingsList";

// Figma: "Bookings page" (29:644)
export default function BookingsPage() {
  return (
    <Screen view="business" active="bookings">
      <BookingsList />
    </Screen>
  );
}
