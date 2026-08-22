import { Slot } from "@radix-ui/react-slot";
import { useSidebar } from "../../hooks/useSidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";

export default function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className = "",
  children,
  ...props
}) {
  const { isMobile, state } = useSidebar();

  const Comp = asChild ? Slot : "button";

  const variantClasses = {
    default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",

    outline:
      "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
  };

  const sizeClasses = {
    default: "h-8 text-sm",
    sm: "h-7 text-xs",
    lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
  };

  const button = (
    <Comp
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={`
        peer/menu-button
        flex
        w-full
        items-center
        justify-start
        gap-3

        overflow-hidden
        rounded-lg

        px-2
        py-2

        text-left
        outline-none

        cursor-pointer

        ring-sidebar-ring

        transition-all
        duration-200
        ease-linear

        hover:bg-sidebar-accent
        hover:text-sidebar-accent-foreground

        focus-visible:ring-2

        active:bg-sidebar-accent
        active:text-sidebar-accent-foreground

        disabled:pointer-events-none
        disabled:opacity-50

        aria-disabled:pointer-events-none
        aria-disabled:opacity-50

        group-has-[[data-sidebar=menu-action]]/menu-item:pr-8

        data-[active=true]:bg-sidebar-accent
        data-[active=true]:text-sidebar-accent-foreground
        data-[active=true]:font-medium

        data-[state=open]:hover:bg-sidebar-accent
        data-[state=open]:hover:text-sidebar-accent-foreground

        group-data-[collapsible=icon]:!size-8
        group-data-[collapsible=icon]:!p-2

        [&>span:last-child]:truncate
        [&>svg]:size-4
        [&>svg]:shrink-0

        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Comp>
  );

  if (!tooltip) return button;

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>

      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}
