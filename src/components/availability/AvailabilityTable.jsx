import React, { useState } from "react";
import Table from "../ui/Table";
import Dialog from "../ui/Dialog";
import AvailabilityFormHeader from "./AvailabilityFormHeader";
import AvailabilityFormBody from "./AvailabilityFormBody";
import { EmptyState, ErrorState, TableSkeleton } from "../dashboard/States";
import { CalendarClock, Pencil, Plus, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import { ConfirmDialog } from "../dashboard/ConfirmDialog";
import { useDeleteAvailability } from "../../features/availability/useDeleteAvailability";
import Badge from "../ui/Badge";
import { useSearchParams } from "react-router-dom";

export default function AvailabilityTable({
  records,
  isLoading,
  error,
  refetch,
}) {
  const { isDeleting, deleteAvailability } = useDeleteAvailability();

  const [searchParams] = useSearchParams();
  const param = searchParams.get("search") || searchParams.get("page") || "";

  const [deleting, setDeleting] = useState(null);

  if (isLoading) {
    return <TableSkeleton columns={5} />;
  }

  if (records.length === 0) {
    return (
      <EmptyState
        icon={<CalendarClock className="h-5 w-5" />}
        title="No availability set"
        description={
          param
            ? "Try a different search term."
            : "Add working hours so customers can book appointments."
        }
        action={
          !param ? (
            <Dialog.Open opens="createAvailability1">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> New slot
              </Button>
            </Dialog.Open>
          ) : undefined
        }
      />
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Worker</Table.Head>
            <Table.Head className="hidden sm:table-cell">Gender</Table.Head>
            <Table.Head>Day</Table.Head>
            <Table.Head className="hidden md:table-cell">Hours</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {records.map((record) => (
            <Table.Row
              key={record._id}
              className="hover:bg-muted/40 transition-colors"
            >
              <Table.Cell className="font-medium">
                <p className="truncate">{record.worker.name ?? "—"}</p>
                <p className="text-muted-foreground truncate text-xs md:hidden">
                  {record.startWorkingTime} – {record.endWorkingTime}
                </p>
              </Table.Cell>
              <Table.Cell className="text-muted-foreground hidden sm:table-cell">
                {record.workerGender ?? "—"}
              </Table.Cell>
              <Table.Cell>
                {typeof record.dayOfWeek === "number"
                  ? (DAYS[record.dayOfWeek] ?? record.dayOfWeek)
                  : (record.dayOfWeek ?? "—")}
              </Table.Cell>
              <Table.Cell className="text-muted-foreground hidden md:table-cell">
                {record.startWorking ?? "—"} – {record.endWorking ?? "—"}
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={record.isOpen === false ? "outline" : "default"}
                >
                  {record.isOpen === false ? "Closed" : "Open"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-end gap-1">
                  <Dialog.Open opens={`editAvailability-${record._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit availability"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Dialog.Open>

                  <Dialog.Overlay name={`editAvailability-${record._id}`}>
                    <Dialog.Window className="sm:max-w-lg">
                      <AvailabilityFormHeader title="Edit availability" />
                      <Dialog.Body>
                        <AvailabilityFormBody record={record} />
                      </Dialog.Body>
                    </Dialog.Window>
                  </Dialog.Overlay>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete availability"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleting(record)}
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
        title="Delete this availability?"
        description={`${deleting?.worker.name ?? "This slot"} will no longer accept bookings for that day.`}
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() =>
          deleting &&
          deleteAvailability(
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
