import Button from "../ui/Button";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { useUsers } from "../../features/users/useUsers";
import Pagination from "../ui/Pagination";

export default function UserTableAndOperations() {
  const {
    isLoading,
    isFetching,
    error,
    users = [],
    totalResults,
    refetch,
  } = useUsers();

  return (
    <div className="surface-card overflow-hidden">
      <UserSearch totalResults={totalResults} isFetching={isFetching} />
      <div className="overflow-x-auto">
        <UserTable
          users={users}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>

      <Pagination count={totalResults} isFetching={isFetching} />
    </div>
  );
}
