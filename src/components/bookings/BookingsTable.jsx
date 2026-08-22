import React from "react";
import { EmptyState, ErrorState, TableSkeleton } from "../dashboard/States";
import { CalendarCheck, Eye } from "lucide-react";
import Table from "../ui/Table";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Dialog from "../ui/Dialog";
import BookingFormHeader from "./BookingFormHeader";
import BookingFormBody from "./BookingFormBody";

function statusVariant(status) {
  if (status === "confirmed") return "default";
  if (status === "cancelled") return "destructive";
  if (status === "completed") return "secondary";
  return "outline";
}

export default function BookingsTable({ bookings, isLoading, error, refetch }) {
  if (isLoading) {
    return <TableSkeleton columns={5} />;
  }

  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={<CalendarCheck className="h-5 w-5" />}
        title="No bookings found"
        description="Bookings created on the customer website will appear here."
      />
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Customer</Table.Head>
          <Table.Head className="hidden sm:table-cell">Service</Table.Head>
          <Table.Head className="hidden md:table-cell">Date</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Details</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {bookings.map((booking) => (
          <Table.Row
            key={booking._id}
            className="hover:bg-muted/40 transition-colors"
          >
            <Table.Cell className="font-medium">
              <p className="truncate">{booking.fullName ?? "Guest"}</p>
              <p className="text-muted-foreground truncate text-xs sm:hidden">
                {booking.service.name}
              </p>
            </Table.Cell>
            <Table.Cell className="text-muted-foreground hidden sm:table-cell">
              {booking.service.name}
            </Table.Cell>
            <Table.Cell className="text-muted-foreground hidden md:table-cell">
              {booking.date ? new Date(booking.date).toLocaleDateString() : "—"}
              {booking.startTime
                ? ` · ${new Date(booking.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Use 24-hour format
                  })}`
                : ""}
            </Table.Cell>
            <Table.Cell>
              <Badge variant={statusVariant(booking.status)}>
                {booking.status ?? "pending"}
              </Badge>
            </Table.Cell>
            <Table.Cell className="text-right">
              <Dialog.Open opens={`viewBooking-${booking._id}`}>
                <Button variant="ghost" size="icon" aria-label="View booking">
                  <Eye className="h-4 w-4" />
                </Button>
              </Dialog.Open>

              <Dialog.Overlay name={`viewBooking-${booking._id}`}>
                <Dialog.Window className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                  <BookingFormHeader
                    title="Booking details"
                    description={booking._id}
                  />
                  <Dialog.Body>
                    <BookingFormBody booking={booking} />
                  </Dialog.Body>
                </Dialog.Window>
              </Dialog.Overlay>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
