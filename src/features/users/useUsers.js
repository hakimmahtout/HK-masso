import { useSearchParams } from "react-router-dom";
import { getAllUsers } from "../../services/apiUsers";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useUsers() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: ["users", search, page, limit],
    queryFn: () => getAllUsers(search, page, limit),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    isFetching,
    error,
    users: data?.data?.data,
    totalResults: data?.totalResults,
    refetch,
  };
}
