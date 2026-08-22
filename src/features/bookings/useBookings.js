import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const date = searchParams.get("date") || "";

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: ["bookings", status, search, page, limit, date],
    queryFn: () => getAllBookings(status, search, page, limit, date),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    isFetching,
    error,
    bookings: data?.data?.data,
    totalResults: data?.totalResults,
    refetch,
  };
}
