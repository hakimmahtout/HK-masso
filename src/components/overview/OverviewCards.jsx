import React from "react";
import StatCard from "../dashboard/StatCard";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import Skeleton from "../ui/Skeleton";
import { formatCurrency } from "../../utils/overviewUtils";

export default function OverviewCards({
  pending,
  confirmed,
  completed,
  totalBookings,
  isLoading,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[122px] rounded-2xl" />
        ))
      ) : (
        <>
          <StatCard
            label="Today's bookings"
            value={totalBookings}
            hint={
              pending?.num > 0
                ? `${pending?.num} awaiting confirmation`
                : "No pending bookings"
            }
            icon={CalendarCheck}
            tone="primary"
          />

          <StatCard
            label="Today's revenue"
            value={formatCurrency(completed?.revenue)}
            hint="Only completed bookings"
            icon={DollarSign}
            tone="accent"
          />

          <StatCard
            label="Pending bookings"
            value={pending?.num}
            hint={
              pending?.num > 0
                ? "Needs your attention"
                : "Everything is up to date"
            }
            icon={AlertCircle}
            tone="info"
          />

          <StatCard
            label="Confirmed today"
            value={confirmed?.num + completed?.num}
            hint={`${completed?.num} completed`}
            icon={CheckCircle2}
            tone="success"
          />
        </>
      )}
    </div>
  );
}
