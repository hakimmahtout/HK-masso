import { Plus } from "lucide-react";
import PageHeader from "../dashboard/PageHeader";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import AvailabilityFormHeader from "./AvailabilityFormHeader";
import AvailabilityFormBody from "./AvailabilityFormBody";

export default function AvailabilityHeader() {
  return (
    <PageHeader
      title="Availability"
      description="Working hours and capacity per worker and weekday."
      actions={
        <>
          <Dialog.Open opens="createAvailability1">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New slot
            </Button>
          </Dialog.Open>
          <Dialog.Overlay name="createAvailability1">
            <Dialog.Window className="sm:max-w-lg">
              <AvailabilityFormHeader title="New availability" />
              <Dialog.Body>
                <AvailabilityFormBody />
              </Dialog.Body>
            </Dialog.Window>
          </Dialog.Overlay>
        </>
      }
    />
  );
}
