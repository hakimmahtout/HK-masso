export default function SidebarInset({ className = "", ...props }) {
  return (
    <main
      className={`
        relative flex w-full flex-1 flex-col bg-background
        md:peer-data-[variant=inset]:m-2
        md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2
        md:peer-data-[variant=inset]:ml-0
        md:peer-data-[variant=inset]:rounded-xl
        md:peer-data-[variant=inset]:shadow
        ${className}
      `}
      {...props}
    />
  );
}
