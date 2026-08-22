import Dialog from "../ui/Dialog";

export default function BookingFormHeader({ title, description }) {
  return (
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
    </Dialog.Header>
  );
}
