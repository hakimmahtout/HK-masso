export default function SidebarGroupContent({ className = "", ...props }) {
  return (
    <div
      data-sidebar="group-content"
      className={`w-full text-sm ${className}`}
      {...props}
    />
  );
}
