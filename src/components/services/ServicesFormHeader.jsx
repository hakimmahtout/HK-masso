import React from "react";
import Dialog from "../ui/Dialog";

export default function ServicesFormHeader({ title, description }) {
  return (
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
    </Dialog.Header>
  );
}
