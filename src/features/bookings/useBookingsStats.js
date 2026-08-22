import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBookingsStats } from "../../services/apiBookings";

export function useBookingsStats() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["bookings-stats"],
    queryFn: getBookingsStats,
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    error,
    todayBookings: data?.data?.todayBookings,
    totalBookings: data?.total,
    totalRevenu: data?.totalRevenu,
    startTimes: data?.data?.startTimes,
    todayStats: data?.data?.todayStats,
    workerStats: data?.data?.workerStats,
    serviceStats: data?.data?.serviceStats,
    yearRevenu: data?.data?.yearRevenu,
    refetch,
  };
}
