import React from "react";
import Label from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useEditBooking } from "../../features/bookings/useEditBooking";

const STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export default function BookingFormBody({ booking }) {
  const { editBooking, isEditing } = useEditBooking();
  return (
    <>
      <dl className="space-y-2.5 text-sm">
        {[
          ["Customer", booking?.fullName],
          ["Email", booking?.email],
          ["Phone", booking?.phone],
          ["Service", booking?.service?.name],
          ["Worker", booking?.worker?.name],
          [
            "Duration",
            booking?.duration ? `${booking.duration} min` : undefined,
          ],
          [
            "Price",
            booking?.price !== undefined
              ? `${String(booking.price)}$`
              : undefined,
          ],
          [
            "Date",
            booking?.date
              ? new Date(booking?.date).toLocaleDateString()
              : undefined,
          ],
          [
            "Time",
            new Date(booking?.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Use 24-hour format
            }),
          ],
          ["Notes", booking?.notes],
          [
            "Created",
            booking?.createdAt
              ? new Date(booking.createdAt).toLocaleString()
              : undefined,
          ],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="flex justify-between gap-4 border-b pb-2"
          >
            <dt className="text-muted-foreground shrink-0">{label}</dt>
            <dd className="min-w-0 truncate font-medium">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="space-y-2 mt-4">
        <Label>Update status</Label>
        <Select
          value={booking?.status ?? "pending"}
          onValueChange={(value) =>
            booking && editBooking({ _id: booking._id, status: value })
          }
          disabled={isEditing}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
