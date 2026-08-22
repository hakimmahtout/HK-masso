export default function SidebarMenu({ className = "", ...props }) {
  return (
    <ul
      data-sidebar="menu"
      className={`flex w-full min-w-0 flex-col gap-1 ${className}`}
      {...props}
    />
  );
}
