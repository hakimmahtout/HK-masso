import OverviewHeader from "../components/overview/OverviewHeader";
import OverviewCards from "../components/overview/OverviewCards";
import OverviewTodayBookings from "../components/overview/OverviewTodayBookings";
import OverviewRevenu12Months from "../components/overview/OverviewRevenu12Months";
import OverviewWorkerRevenuAndHours from "../components/overview/OverviewWorkerRevenuAndHours";
import OverviewPopularServicesAndTodayActivity from "../components/overview/OverviewPopularServicesAndTodayActivity";
import { useBookingsStats } from "../features/bookings/useBookingsStats";
import { SEO } from "../components/ui/SEO";

export default function Overview() {
  const {
    todayBookings = [],
    totalBookings,
    todayStats = [],
    startTimes = [],
    totalRevenu = [],
    workerStats = [],
    serviceStats = [],
    yearRevenu = [],
    isLoading,
    error,
    refetch,
  } = useBookingsStats();

  const pending = todayStats?.find((item) => item.status === "pending");
  const confirmed = todayStats?.find((item) => item.status === "confirmed");
  const completed = todayStats?.find((item) => item.status === "completed");
  const cancelled = todayStats?.find((item) => item.status === "cancelled");

  return (
    <>
      <SEO
        title="Overview | HK Masso Dashboard"
        description="HK Masso admin dashboard overview with real-time booking statistics, revenue analysis, and therapist activity."
      />

      <div className="space-y-6">
        <OverviewHeader />

        <OverviewCards
          pending={pending}
          confirmed={confirmed}
          completed={completed}
          totalBookings={totalBookings}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />

        <OverviewTodayBookings
          pending={pending}
          confirmed={confirmed}
          completed={completed}
          cancelled={cancelled}
          totalBookings={totalBookings}
          todayBookings={todayBookings}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />

        <OverviewRevenu12Months
          isLoading={isLoading}
          totalRevenu={totalRevenu}
          yearRevenu={yearRevenu}
          error={error}
          refecth={refetch}
        />

        <OverviewWorkerRevenuAndHours
          workerStats={workerStats}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />

        <OverviewPopularServicesAndTodayActivity
          startTimes={startTimes}
          serviceStats={serviceStats}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>
    </>
  );
}
