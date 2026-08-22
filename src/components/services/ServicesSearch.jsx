import { Search } from "lucide-react";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export default function ServicesSearch() {
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
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search services by name or category…"
        className="pl-9"
      />
    </div>
  );
}
