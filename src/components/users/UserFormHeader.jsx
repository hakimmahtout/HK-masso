import React from "react";
import Dialog from "../ui/Dialog";

export default function UserFormHeader({ title, description }) {
  return (
    <Dialog.Header>
      <Dialog.Title>
        {/* {editing ? "Edit user" : "Create user"} */}
        {title}
      </Dialog.Title>
      <Dialog.Description>
        {/* {editing
                      ? "Update this account's details."
                      : "Add a new account to your platform."} */}
        {description}
      </Dialog.Description>
    </Dialog.Header>
  );
}
