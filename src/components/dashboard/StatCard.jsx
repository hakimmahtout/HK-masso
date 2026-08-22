import * as Icons from "lucide-react";
export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
  className,
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    success: "bg-success/15 text-success",
    info: "bg-info/15 text-info",
  };

  return (
    <div
      className={`surface-card hover:shadow-lift group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            {label}
          </p>
          <p className="font-display mt-2 truncate text-3xl font-bold">
            {value}
          </p>
          {hint && (
            <p className="text-muted-foreground mt-1 truncate text-xs">
              {hint}
            </p>
          )}
        </div>
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
