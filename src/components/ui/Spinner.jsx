import { Loader2, ShieldCheck } from "lucide-react";

export default function Spinner({
  title = "Loading page...",
  subtitle = "Please wait while we fetch the content.",
  icon: Icon = ShieldCheck,
}) {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-muted/40 shadow-sm">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
        <div className="bg-primary/10 text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">
          <Icon className="h-3 w-3" />
        </div>
      </div>

      <div className="max-w-md space-y-1">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
