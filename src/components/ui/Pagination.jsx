import { useSearchParams } from "react-router-dom";
import Button from "./Button";

const PAGE_SIZE = 8;

export default function Pagination({ count, isFetching = false }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    searchParams.set("limit", PAGE_SIZE);

    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    searchParams.set("limit", PAGE_SIZE);

    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t p-4">
      <p className="text-muted-foreground text-xs">
        Page {currentPage} of {isNaN(pageCount) ? 1 : pageCount}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1 || isFetching}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === pageCount || isFetching}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
