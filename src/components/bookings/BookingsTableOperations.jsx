import { useBookings } from "../../features/bookings/useBookings";
import Pagination from "../ui/Pagination";
import BookingsSearch from "./BookingsSearch";
import BookingsTable from "./BookingsTable";

export default function BookingsTableOperations() {
  const {
    isLoading,
    isFetching,
    error,
    bookings = [],
    totalResults,
    refetch,
  } = useBookings();

  return (
    <div className="surface-card overflow-hidden">
      <BookingsSearch isFetching={isFetching} />

      <div className="overflow-x-auto">
        <BookingsTable
          bookings={bookings}
          error={error}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>

      <Pagination count={totalResults} isFetching={isFetching} />
    </div>
  );
}
