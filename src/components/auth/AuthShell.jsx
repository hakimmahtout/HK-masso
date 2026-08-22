import { Sparkles } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function AuthShell({ title, description, children, footer }) {
  return (
    <div className="bg-background relative grid min-h-screen lg:grid-cols-2">
      <div className="bg-sidebar relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="bg-gradient-brand pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full opacity-30 blur-3xl" />
        <div className="bg-gradient-accent pointer-events-none absolute -right-24 -bottom-32 h-96 w-96 rounded-full opacity-25 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/faqc3xml/image/upload/v1787392772/dc12bdae-6f91-436c-8eb5-63b54acbf327_s6vmpz.png"
            alt="logo"
            className="h-20 w-20"
          />
          <span className="font-display text-sidebar-accent-foreground text-lg font-semibold">
            HK Masso
          </span>
        </div>
        <div className="relative max-w-md">
          <h2 className="text-sidebar-accent-foreground text-4xl leading-tight font-bold">
            Run your studio with calm precision.
          </h2>
          <p className="text-sidebar-foreground/70 mt-4 text-sm leading-relaxed">
            Services, bookings, staff availability and clients — one refined
            control center, connected straight to your API.
          </p>
        </div>
        <p className="text-sidebar-foreground/50 relative text-xs">
          © {new Date().getFullYear()} HK Masso. All rights reserved.
        </p>
      </div>

      <div className="relative flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="absolute top-5 right-5 flex items-center gap-1">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="bg-gradient-accent mb-4 grid h-10 w-10 place-items-center rounded-xl">
              <Sparkles className="text-accent-foreground h-5 w-5" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          <div className="mt-8">{children}</div>
          {footer && (
            <div className="text-muted-foreground mt-6 text-sm">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
