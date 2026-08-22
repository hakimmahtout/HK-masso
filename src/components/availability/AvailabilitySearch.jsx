import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Badge from "../ui/Badge";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

export default function AvailabilitySearch({ totalResults, isFetching }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    if (debouncedSearch === currentSearch) return;

    if (debouncedSearch) {
      searchParams.set("search", debouncedSearch);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  return (
    <div className="flex flex-wrap items-center gap-3 border-b p-4">
      <div className="relative min-w-0 flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by day, worker…"
          className="pl-9"
        />
        {isFetching && (
          <Loader2 className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>
      <Badge variant="secondary" className="shrink-0">
        {totalResults} total
      </Badge>
    </div>
  );
}
