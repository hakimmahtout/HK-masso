import BookingsHeader from "../components/bookings/BookingsHeader";
import BookingsTableOperations from "../components/bookings/BookingsTableOperations";
import Dialog from "../components/ui/Dialog";
import { SEO } from "../components/ui/SEO";

export default function Bookings() {
  return (
    <>
      <SEO
        title="Bookings | HK Masso Dashboard"
        description="Manage, filter, and track all client appointments and reservation records on the HK Masso admin dashboard."
      />

      <div className="space-y-6">
        <Dialog>
          <BookingsHeader />
          <BookingsTableOperations />
        </Dialog>
      </div>
    </>
  );
}
