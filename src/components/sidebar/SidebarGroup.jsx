export default function SidebarGroup({ className = "", ...props }) {
  return (
    <div
      data-sidebar="group"
      className={`relative flex w-full min-w-0 flex-col p-2 ${className}`}
      {...props}
    />
  );
}
