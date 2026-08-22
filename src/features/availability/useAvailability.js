import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllAvailability } from "../../services/apiAvailability";
import { useSearchParams } from "react-router-dom";

export function useAvailability() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: ["availability", search, page, limit],
    queryFn: () => getAllAvailability(search, page, limit),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    isFetching,
    error,
    records: data?.data?.data,
    totalResults: data?.totalResults,
    refetch,
  };
}
