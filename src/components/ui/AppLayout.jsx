import SidebarProvider from "../../hooks/useSidebar";
import AppSidebar from "../layout/AppSidebar";

import Header from "../layout/Header";
import SidebarInset from "../sidebar/SidebarInset";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <Header />
          <main className="animate-in fade-in flex-1 space-y-6 p-4 duration-300 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
