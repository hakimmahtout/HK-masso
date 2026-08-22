import Skeleton from "../ui/skeleton";

export default function SidebarMenuSkeleton({
  className = "",
  showIcon = false,
  ...props
}) {
  return (
    <div
      data-sidebar="menu-skeleton"
      className={`flex h-8 items-center gap-2 rounded-md px-2 ${className}`}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 w-full flex-1"
        data-sidebar="menu-skeleton-text"
      />
    </div>
  );
}
