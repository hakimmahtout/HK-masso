import Input from "../ui/Input";

export default function SidebarInput({ className = "", ...props }) {
  return (
    <Input
      data-sidebar="input"
      className={`h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring ${className}`}
      {...props}
    />
  );
}
