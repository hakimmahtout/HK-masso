import Separator from "../ui/Separator";

export default function SidebarSeparator({ className = "", ...props }) {
  return (
    <Separator
      data-sidebar="separator"
      className={`mx-2 w-auto bg-sidebar-border ${className}`}
      {...props}
    />
  );
}
