import { useState, useCallback, useEffect, useMemo } from "react";

const SidebarRail = ({ className = "", ...props }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={`
        absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2
        transition-all ease-linear
        after:absolute after:inset-y-0 after:left-1/2
        after:w-[2px] hover:after:bg-sidebar-border

        group-data-[side=left]:-right-4
        group-data-[side=right]:left-0

        sm:flex

        [[data-side=left]_&]:cursor-w-resize
        [[data-side=right]_&]:cursor-e-resize

        [[data-side=left][data-state=collapsed]_&]:cursor-e-resize
        [[data-side=right][data-state=collapsed]_&]:cursor-w-resize

        group-data-[collapsible=offcanvas]:translate-x-0
        group-data-[collapsible=offcanvas]:after:left-full
        group-data-[collapsible=offcanvas]:hover:bg-sidebar

        [[data-side=left][data-collapsible=offcanvas]_&]:-right-2
        [[data-side=right][data-collapsible=offcanvas]_&]:-left-2

        ${className}
      `}
      {...props}
    />
  );
};

const SidebarInput = ({ className = "", ...props }) => {
  return (
    <Input
      data-sidebar="input"
      className={`
        h-8 w-full
        bg-background
        shadow-none
        focus-visible:ring-2
        focus-visible:ring-sidebar-ring
        ${className}
      `}
      {...props}
    />
  );
};

const SidebarSeparator = ({ className = "", ...props }) => {
  return (
    <Separator
      data-sidebar="separator"
      className={`mx-2 w-auto bg-sidebar-border ${className}`}
      {...props}
    />
  );
};

const SidebarGroupAction = ({ className = "", ...props }) => {
  return (
    <button
      data-sidebar="group-action"
      className={`
        absolute right-3 top-3.5
        flex aspect-square w-5 items-center justify-center
        rounded-md p-0
        text-sidebar-foreground
        outline-none ring-sidebar-ring
        cursor-pointer
        transition-transform
        hover:bg-sidebar-accent
        hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        [&>svg]:size-4
        [&>svg]:shrink-0

        after:absolute
        after:-inset-2
        after:md:hidden

        group-data-[collapsible=icon]:hidden

        ${className}
      `}
      {...props}
    />
  );
};

const SidebarMenuAction = ({
  className = "",
  showOnHover = false,
  ...props
}) => {
  return (
    <button
      data-sidebar="menu-action"
      className={`
        absolute right-1 top-1.5
        flex aspect-square w-5 items-center justify-center
        rounded-md p-0
        text-sidebar-foreground
        outline-none
        ring-sidebar-ring
        cursor-pointer
        transition-transform
        hover:bg-sidebar-accent
        hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        peer-hover/menu-button:text-sidebar-accent-foreground
        [&>svg]:size-4
        [&>svg]:shrink-0

        after:absolute
        after:-inset-2
        after:md:hidden

        peer-data-[size=sm]/menu-button:top-1
        peer-data-[size=default]/menu-button:top-1.5
        peer-data-[size=lg]/menu-button:top-2.5

        group-data-[collapsible=icon]:hidden

        ${
          showOnHover
            ? `
              group-focus-within/menu-item:opacity-100
              group-hover/menu-item:opacity-100
              data-[state=open]:opacity-100
              peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
              md:opacity-0
            `
            : ""
        }

        ${className}
      `}
      {...props}
    />
  );
};

const SidebarMenuBadge = ({ className = "", ...props }) => {
  return (
    <div
      data-sidebar="menu-badge"
      className={`
        pointer-events-none
        absolute right-1
        flex h-5 min-w-5
        select-none items-center justify-center
        rounded-md px-1
        text-xs font-medium
        tabular-nums
        text-sidebar-foreground

        peer-hover/menu-button:text-sidebar-accent-foreground
        peer-data-[active=true]/menu-button:text-sidebar-accent-foreground

        peer-data-[size=sm]/menu-button:top-1
        peer-data-[size=default]/menu-button:top-1.5
        peer-data-[size=lg]/menu-button:top-2.5

        group-data-[collapsible=icon]:hidden

        ${className}
      `}
      {...props}
    />
  );
};

const SidebarMenuSkeleton = ({
  className = "",
  showIcon = false,
  ...props
}) => {
  // Random width between 50% and 90%
  const width = `${Math.floor(Math.random() * 40) + 50}%`;

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
        data-sidebar="menu-skeleton-text"
        className="h-4 max-w-(--skeleton-width) flex-1"
        style={{
          "--skeleton-width": width,
        }}
      />
    </div>
  );
};

const SidebarMenuSub = ({ className = "", ...props }) => {
  return (
    <ul
      data-sidebar="menu-sub"
      className={`
        mx-3.5
        flex
        min-w-0
        translate-x-px
        flex-col
        gap-1
        border-l
        border-sidebar-border
        px-2.5
        py-0.5
        group-data-[collapsible=icon]:hidden
        ${className}
      `}
      {...props}
    />
  );
};

const SidebarMenuSubItem = (props) => {
  return <li {...props} />;
};

const SidebarMenuSubButton = ({
  size = "md",
  isActive = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <a
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={`
        flex h-7 min-w-0 -translate-x-px items-center gap-2
        overflow-hidden rounded-md px-2
        text-sidebar-foreground
        outline-none
        ring-sidebar-ring
        cursor-pointer
        hover:bg-sidebar-accent
        hover:text-sidebar-accent-foreground
        focus-visible:ring-2
        active:bg-sidebar-accent
        active:text-sidebar-accent-foreground
        disabled:pointer-events-none
        disabled:opacity-50
        aria-disabled:pointer-events-none
        aria-disabled:opacity-50

        [&>span:last-child]:truncate
        [&>svg]:size-4
        [&>svg]:shrink-0
        [&>svg]:text-sidebar-accent-foreground

        data-[active=true]:bg-sidebar-accent
        data-[active=true]:text-sidebar-accent-foreground

        ${size === "sm" ? "text-xs" : "text-sm"}

        group-data-[collapsible=icon]:hidden

        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};
