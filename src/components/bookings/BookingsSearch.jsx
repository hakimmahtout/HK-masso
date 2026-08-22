import { CalendarDays, Loader2, Search, X } from "lucide-react";
import Input from "../ui/Input";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export default function BookingsSearch({ isFetching }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") || "",
  );
  const statusFilter = searchParams.get("status") || "";

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch === currentSearch) return;

    const updatedParams = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      updatedParams.set("search", debouncedSearch);
    } else {
      updatedParams.delete("search");
    }

    setSearchParams(updatedParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleStatusChange = (value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set("status", value);
    } else {
      updatedParams.delete("status");
    }
    setSearchParams(updatedParams);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);

    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set("date", value);
    } else {
      updatedParams.delete("date");
    }
    setSearchParams(updatedParams);
  };

  const handleClearDate = () => {
    setSelectedDate("");
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("date");
    setSearchParams(updatedParams);
  };

  return (
    <div className="relative flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
      {/* SEARCH */}
      <div className="relative min-w-0 flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by customer"
          className="pr-9 pl-9"
        />

        {/* Spinner inside search field when fetching */}
        {isFetching && (
          <Loader2 className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {/* DATE */}
      <div className="relative w-full shrink-0 lg:w-[190px]">
        <CalendarDays className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border-input bg-background text-foreground h-10 w-full rounded-md border pr-9 pl-9 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/20"
        />

        {selectedDate && !isFetching && (
          <button
            type="button"
            onClick={handleClearDate}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
            aria-label="Clear date"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* STATUS */}
      <Select value={statusFilter} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full shrink-0 lg:w-[180px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All statuses</SelectItem>

          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
