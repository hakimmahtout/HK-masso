import { useSearchParams } from "react-router-dom";
import { getAllServices } from "../../services/apiServices";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useServices() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["services", search],
    queryFn: () => getAllServices(search),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    error,
    services: data?.data?.data,
    totalResults: data?.totalResults,
    refetch,
  };
}
