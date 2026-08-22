import { LogOut, UserCog } from "lucide-react";

import SidebarInset from "../sidebar/SidebarInset";
import SidebarTrigger from "../sidebar/SidebarTrigger";

import { ThemeToggle } from "../ui/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { Avatar, AvatarFallback } from "../ui/Avatar";

import DropDownMenu from "../ui/DropdownMenu";
import { useUser } from "../../features/authentication/useUser";
import { useLogout } from "../../features/authentication/useLogout";

export default function Header() {
  const { user = {} } = useUser();
  const { logout, isLoggingOut } = useLogout();

  const location = useLocation();
  const page = location.pathname.slice(1);
  const title = page.charAt(0).toUpperCase() + page.slice(1);

  // Safe fallback to empty string before splitting
  const initials = (user?.name ?? user?.email ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
      <SidebarTrigger className="shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground hidden truncate text-xs sm:block">
          {user?.email || ""}
        </p>
      </div>
      <ThemeToggle />

      <DropDownMenu>
        <DropDownMenu.Menu>
          <DropDownMenu.Toggle id="account">
            <Button
              variant="ghost"
              className="h-9.5 w-9.5 shrink-0 gap-2 rounded-full px-1.5 hover:rounded-full"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropDownMenu.Toggle>

          <DropDownMenu.List id="account" className="w-56">
            <DropDownMenu.Label className="truncate">
              My account
            </DropDownMenu.Label>

            <DropDownMenu.Separator />

            <DropDownMenu.Item>
              <Link to="/profile" className="flex items-center w-full">
                <UserCog className="mr-2 h-4 w-4" /> My profile
              </Link>
            </DropDownMenu.Item>

            <DropDownMenu.Separator />

            <DropDownMenu.Item onClick={() => logout()} disabled={isLoggingOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
            </DropDownMenu.Item>
          </DropDownMenu.List>
        </DropDownMenu.Menu>
      </DropDownMenu>
    </header>
  );
}
