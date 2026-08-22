import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import { useDeleteMe } from "../../features/users/useDeleteMe";
import { ConfirmDialog } from "../dashboard/ConfirmDialog";

export default function ProfileDanger() {
  const { deleteMe, isDeleting } = useDeleteMe();
  const [confirmDelete, setConfirmDelete] = useState();
  return (
    <>
      <div className="surface-card border-destructive/30 space-y-3 p-6 h-fit">
        <div className="bg-destructive/10 text-destructive grid h-10 w-10 place-items-center rounded-xl">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold">Danger zone</h2>
        <p className="text-muted-foreground text-sm">
          Deleting your account removes your access to this dashboard
          immediately.
        </p>
        <Button variant="destructive" onClick={() => setConfirmDelete(true)}>
          Delete my account
        </Button>
      </div>
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete your account?"
        description="You will be signed out and lose access to the dashboard."
        confirmLabel="Delete account"
        loading={isDeleting}
        onConfirm={() => deleteMe()}
      />
    </>
  );
}
