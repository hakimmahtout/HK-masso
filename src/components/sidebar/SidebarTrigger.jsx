import { PanelLeft } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";
import Button from "../ui/Button";

export default function SidebarTrigger({ className = "", onClick, ...props }) {
  const { toggleSidebar } = useSidebar();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    toggleSidebar();
  };

  return (
    <Button
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={`h-7 w-7 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
