export default function SidebarHeader({ className = "", ...props }) {
  return (
    <div
      data-sidebar="header"
      className={`flex flex-col gap-2 p-2 ${className}`}
      {...props}
    />
  );
}
