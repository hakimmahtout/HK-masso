import Dialog from "../ui/Dialog";

export default function AvailabilityFormHeader({ title }) {
  return (
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>
        Define when this worker accepts bookings.
      </Dialog.Description>
    </Dialog.Header>
  );
}
