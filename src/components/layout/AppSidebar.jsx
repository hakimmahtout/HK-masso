import { Link, useLocation } from "react-router-dom";
import {
  CalendarClock,
  CalendarRange,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";
import Sidebar from "../sidebar/Sidebar";
import { useSidebar } from "../../hooks/useSidebar";
import SidebarHeader from "../sidebar/SidebarHeader";
import SidebarContent from "../sidebar/SidebarContent";
import SidebarFooter from "../sidebar/SidebarFooter";
import SidebarGroup from "../sidebar/SidebarGroup";
import SidebarGroupLabel from "../sidebar/SidebarGroupLabel";
import SidebarGroupContent from "../sidebar/SidebarGroupContent";
import SidebarMenu from "../sidebar/SidebarMenu";
import SidebarMenuItem from "../sidebar/SidebarMenuItem";
import SidebarMenuButton from "../sidebar/SidebarMenuButton";

const items = [
  {
    title: "Overview",
    url: "/overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Services",
    url: "/services",
    icon: Sparkles,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: CalendarRange,
  },
  {
    title: "Availability",
    url: "/availability",
    icon: CalendarClock,
  },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (url, exact = false) => {
    return exact
      ? pathname === url
      : pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-sidebar-border/60 border-b px-3 py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/faqc3xml/image/upload/v1787392112/3eb52d3d-a824-42cf-8288-a7cbca931590_removalai_preview_djtzfp.png"
            alt="logo"
            className="h-10 w-10"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-display text-sidebar-accent-foreground truncate text-sm font-semibold">
                HK Masso
              </p>
              <p className="text-sidebar-foreground/60 truncate text-xs">
                Control center
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(
                      item.url,
                      "exact" in item ? item.exact : false,
                    )}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/60 border-t">
        {!collapsed && (
          <p className="text-sidebar-foreground/50 px-2 py-1 text-[11px] leading-relaxed">
            © {new Date().getFullYear()} HK Masso. All rights reserved.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
