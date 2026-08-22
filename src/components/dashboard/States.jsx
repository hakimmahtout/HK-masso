import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";

export function TableSkeleton({ rows = 6, columns = 5 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-5 flex-1"
              style={{ maxWidth: colIndex === 0 ? "16rem" : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, description, action, icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="bg-muted text-muted-foreground grid h-12 w-12 place-items-center rounded-2xl">
        {icon ?? <Inbox className="h-5 w-5" />}
      </div>
      <div>
        <p className="font-display text-base font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground mx-auto mt-1 max-w-sm text-sm">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong while loading this data.";
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center"
    >
      <div className="bg-destructive/10 text-destructive grid h-12 w-12 place-items-center rounded-2xl">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-base font-semibold">
          Couldn't load data
        </p>
        <p className="text-muted-foreground mx-auto mt-1 max-w-md text-sm">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="mr-2 h-3.5 w-3.5" /> Try again
        </Button>
      )}
    </div>
  );
}
