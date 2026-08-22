export default function SidebarMenuItem({ className = "", ...props }) {
  return (
    <li
      data-sidebar="menu-item"
      className={`group/menu-item relative ${className}`}
      {...props}
    />
  );
}
