export default function SidebarFooter({ className = "", ...props }) {
  return (
    <div
      data-sidebar="footer"
      className={`flex flex-col gap-2 p-2 ${className}`}
      {...props}
    />
  );
}
