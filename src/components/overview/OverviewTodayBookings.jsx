import { ErrorState, EmptyState, TableSkeleton } from "../dashboard/States";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import { formatBookingTime, statusTone } from "../../utils/overviewUtils";
import { AlertCircle, CalendarCheck, CheckCircle2, Clock } from "lucide-react";

export default function OverviewTodayBookings({
  pending,
  confirmed,
  completed,
  cancelled,
  totalBookings,
  todayBookings,
  isLoading,
  error,
  refetch,
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <section className="surface-card overflow-hidden xl:col-span-2">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />

            <div>
              <h2 className="text-base font-semibold">Today's schedule</h2>

              <p className="text-muted-foreground text-xs">
                Appointments scheduled for today
              </p>
            </div>
          </div>

          <Badge variant="outline">
            {totalBookings} {totalBookings === 1 ? "booking" : "bookings"}
          </Badge>
        </div>

        {isLoading ? (
          <TableSkeleton columns={5} />
        ) : error ? (
          <ErrorState error={error} onRetry={() => refetch()} />
        ) : todayBookings.length === 0 ? (
          <EmptyState
            title="No bookings today"
            description="When customers book today, their appointments will appear here."
          />
        ) : (
          // 👇 Only this area scrolls
          <div className="max-h-[320px] overflow-auto">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Time</Table.Head>
                  <Table.Head>Customer</Table.Head>
                  <Table.Head>Service</Table.Head>
                  <Table.Head>Worker</Table.Head>
                  <Table.Head className="text-right">Status</Table.Head>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {todayBookings.map((booking) => (
                  <Table.Row key={booking._id}>
                    <Table.Cell className="font-medium whitespace-nowrap">
                      {formatBookingTime(booking.startTime)}
                    </Table.Cell>

                    <Table.Cell>{booking.fullName}</Table.Cell>

                    <Table.Cell className="text-muted-foreground">
                      {booking.service.name}
                    </Table.Cell>

                    <Table.Cell className="text-muted-foreground">
                      {booking.worker.name}
                    </Table.Cell>

                    <Table.Cell className="text-right">
                      <Badge
                        variant="outline"
                        className={statusTone(booking.status)}
                      >
                        {booking.status ?? "pending"}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </section>

      {/* TODAY STATUS */}

      <section className="surface-card">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-semibold">Today's status</h2>

          <p className="text-muted-foreground text-xs">
            Booking status at a glance
          </p>
        </div>

        <div className="space-y-3 p-5">
          <StatusRow
            label="Pending"
            description="Awaiting confirmation"
            value={pending?.num ?? 0}
            icon={AlertCircle}
            tone="warning"
          />

          <StatusRow
            label="Confirmed"
            description="Ready for today"
            value={confirmed?.num ?? 0}
            icon={CalendarCheck}
            tone="info"
          />

          <StatusRow
            label="Completed"
            description="Finished appointments"
            value={completed?.num ?? 0}
            icon={CheckCircle2}
            tone="success"
          />

          <StatusRow
            label="Cancelled"
            description="Cancelled today"
            value={cancelled?.num ?? 0}
            icon={AlertCircle}
            tone="danger"
          />
        </div>
      </section>
    </div>
  );
}

function StatusRow({ label, description, value, icon: Icon, tone }) {
  const styles = {
    warning: {
      container: "bg-warning/15",
      icon: "text-warning",
    },
    info: {
      container: "bg-info/15",
      icon: "text-info",
    },
    success: {
      container: "bg-success/15",
      icon: "text-success",
    },
    danger: {
      container: "bg-destructive/12",
      icon: "text-destructive",
    },
  };

  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles[tone].container}`}
        >
          <Icon className={`h-4 w-4 ${styles[tone].icon}`} />
        </div>

        <div>
          <p className="text-sm font-medium">{label}</p>

          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>

      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
