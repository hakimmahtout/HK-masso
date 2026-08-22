import Dialog from "../components/ui/Dialog";
import AvailabilityHeader from "../components/availability/AvailabilityHeader";
import AvailabilityTableOperations from "../components/availability/AvailabilityTableOperations";
import { SEO } from "../components/ui/SEO";

export default function Availability() {
  return (
    <>
      <SEO
        title="Availability | HK Masso Dashboard"
        description="Manage therapist working hours, shifts, and availability schedules on the HK Masso admin dashboard."
      />

      <div className="space-y-6">
        <Dialog>
          <AvailabilityHeader />

          <AvailabilityTableOperations />
        </Dialog>
      </div>
    </>
  );
}
