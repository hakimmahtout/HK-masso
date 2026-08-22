export default function SidebarMenuSubButton({
  size = "md",
  isActive,
  className = "",
  ...props
}) {
  const sizeClass = size === "sm" ? "text-xs" : "text-sm";

  return (
    <a
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden ${sizeClass} ${className}`}
      {...props}
    />
  );
}
