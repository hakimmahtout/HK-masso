const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

export default function SidebarProvider({
  className = "",
  style,
  children,
  ...props
}) {
  return (
    <div
      style={{
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style,
      }}
      className={`group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
