export default function Separator({
  className = "",
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  const orientationClasses =
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]";

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={`shrink-0 bg-border ${orientationClasses} ${className}`}
      {...props}
    />
  );
}
