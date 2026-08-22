import React from "react";
import AvailabilityTable from "./AvailabilityTable";
import { useAvailability } from "../../features/availability/useAvailability";
import AvailabilitySearch from "./AvailabilitySearch";
import Pagination from "../ui/Pagination";

export default function AvailabilityTableOperations() {
  const {
    isLoading,
    isFetching,
    error,
    records = [],
    totalResults,
    refetch,
  } = useAvailability();

  return (
    <div className="surface-card overflow-hidden">
      <AvailabilitySearch totalResults={totalResults} isFetching={isFetching} />
      <div className="overflow-x-auto">
        <AvailabilityTable
          records={records}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>
      <Pagination count={totalResults} isFetching={isFetching} />
    </div>
  );
}
