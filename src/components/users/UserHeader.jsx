import { Plus } from "lucide-react";
import PageHeader from "../dashboard/PageHeader";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import UserFormHeader from "./UserFormHeader";
import UserFormBody from "./UserFormBody";

export default function UserHeader() {
  return (
    <PageHeader
      title="Users"
      description="Manage everyone with access to your studio platform."
      actions={
        <>
          <Dialog.Open opens="createUser1">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New user
            </Button>
          </Dialog.Open>
          <Dialog.Overlay name="createUser1">
            <Dialog.Window className="sm:max-w-lg">
              <UserFormHeader
                title="Create user"
                description="Add a new account to your platform."
              />
              <Dialog.Body>
                <UserFormBody />
              </Dialog.Body>
            </Dialog.Window>
          </Dialog.Overlay>
        </>
      }
    />
  );
}
