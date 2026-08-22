import React, { useState } from "react";
import Table from "../ui/Table";
import { Eye, Pencil, Plus, Trash2, UsersIcon } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import UserData from "./UserData";
import UserFormHeader from "./UserFormHeader";
import UserFormBody from "./UserFormBody";
import { EmptyState, ErrorState, TableSkeleton } from "../dashboard/States";
import { useSearchParams } from "react-router-dom";
import { useDeleteUser } from "../../features/users/useDeleteUser";
import { ConfirmDialog } from "../dashboard/ConfirmDialog";

export default function UserTable({ users, isLoading, error, refetch }) {
  const { isDeleting, deleteUser } = useDeleteUser();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("search") || searchParams.get("page") || "";

  const [deleting, setDeleting] = useState(null);

  if (isLoading) {
    return <TableSkeleton columns={4} />;
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={<UsersIcon className="h-5 w-5" />}
        title={param ? "No matching users" : "No users yet"}
        description={
          param
            ? "Try a different search term."
            : "Create your first user to get started."
        }
        action={
          !param ? (
            <Dialog.Open opens="createUser1">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> New user
              </Button>
            </Dialog.Open>
          ) : undefined
        }
      />
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => users.refetch()} />;
  }

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head className="hidden sm:table-cell">Email</Table.Head>
            <Table.Head className="hidden md:table-cell">Phone</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row
              key={user._id}
              className="hover:bg-muted/40 transition-colors"
            >
              <Table.Cell className="font-medium">
                <div className="min-w-0">
                  <p className="truncate">{user.name ?? "—"}</p>
                  <p className="text-muted-foreground truncate text-xs sm:hidden">
                    {user.email}
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell className="text-muted-foreground hidden sm:table-cell">
                {user.email ?? "—"}
              </Table.Cell>
              <Table.Cell className="text-muted-foreground hidden md:table-cell">
                {user.phone ?? "—"}
              </Table.Cell>
              <Table.Cell>
                <Badge
                  variant={
                    user.role === "admin" || user.role === "super-admin"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user.role ?? "user"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-end gap-1">
                  <Dialog.Open opens={`viewUser-${user._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="View user"
                      //   onClick={() => void openView(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Dialog.Open>

                  <Dialog.Overlay name={`viewUser-${user._id}`}>
                    <Dialog.Window className="sm:max-w-lg">
                      <UserFormHeader
                        title={user.name}
                        description={user.email}
                      />
                      <Dialog.Body>
                        <UserData user={user} />
                      </Dialog.Body>
                    </Dialog.Window>
                  </Dialog.Overlay>

                  <Dialog.Open opens={`editUser-${user._id}`}>
                    <Button variant="ghost" size="icon" aria-label="Edit user">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Dialog.Open>

                  <Dialog.Overlay name={`editUser-${user._id}`}>
                    <Dialog.Window className="sm:max-w-lg">
                      <UserFormHeader
                        title="Edit user"
                        description="Update this account's details."
                      />
                      <Dialog.Body>
                        <UserFormBody userToEdit={user} />
                      </Dialog.Body>
                    </Dialog.Window>
                  </Dialog.Overlay>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete user"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleting(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this user?"
        description={`${deleting?.name ?? deleting?.email ?? "This account"} will be permanently removed.`}
        confirmLabel="Delete user"
        loading={isDeleting}
        onConfirm={() =>
          deleting &&
          deleteUser(
            { _id: deleting._id },
            {
              onSuccess: () => {
                setDeleting(null);
              },
            },
          )
        }
      />
    </>
  );
}
