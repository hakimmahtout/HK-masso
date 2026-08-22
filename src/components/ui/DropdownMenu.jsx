import { Check, ChevronRight, Circle } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const DropDownMenuContext = createContext();

function DropDownMenu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <DropDownMenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </DropDownMenuContext.Provider>
  );
}

function Toggle({ id, className = "", inset, children, ...props }) {
  const { openId, close, open, setPosition } = useContext(DropDownMenuContext);

  const insetClass = inset ? "pl-8" : "";

  function handleClick(e) {
    e.stopPropagation();

    const rect =
      e.target.closest("button")?.getBoundingClientRect() ||
      e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${insetClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Menu({ children, ...props }) {
  return (
    <div className="relative inline-block text-left" {...props}>
      {children}
    </div>
  );
}

function List({ id, children, className = "", ...props }) {
  const { openId, position, close } = useContext(DropDownMenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id || !position) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: `${position.y}px`,
        right: `${position.x}px`,
      }}
      className={`z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

function Label({ children, className = "", inset, ...props }) {
  const insetClass = inset ? "pl-8" : "";
  return (
    <div
      className={`px-2 py-1.5 text-sm font-semibold ${insetClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Separator({ className = "", ...props }) {
  return (
    <div
      role="separator"
      className={`-mx-1 my-1 h-px bg-muted ${className}`}
      {...props}
    />
  );
}

function Item({ children, className = "", inset, onClick, ...props }) {
  const { close } = useContext(DropDownMenuContext);

  const insetClass = inset ? "pl-8" : "";

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <div
      role="menuitem"
      className={`relative flex cursor-default hover:bg-accent hover:text-white select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 ${insetClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

DropDownMenu.Toggle = Toggle;
DropDownMenu.Menu = Menu;
DropDownMenu.List = List;
DropDownMenu.Label = Label;
DropDownMenu.Separator = Separator;
DropDownMenu.Item = Item;

export default DropDownMenu;

// export function DropdownMenuGroup({ className = "", ...props }) {
//   return <div className={className} role="group" {...props} />;
// }

// export function DropdownMenuPortal({ children }) {
//   return <>{children}</>;
// }

// export function DropdownMenuSub({ className = "", ...props }) {
//   return <div className={`relative ${className}`} {...props} />;
// }

// export function DropdownMenuRadioGroup({ className = "", ...props }) {
//   return <div className={className} role="radiogroup" {...props} />;
// }

//

// export function DropdownMenuSubContent({ className = "", ...props }) {
//   return (
//     <div
//       className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg ${className}`}
//       {...props}
//     />
//   );
// }

// export function DropdownMenuCheckboxItem({
//   className = "",
//   children,
//   checked,
//   ...props
// }) {
//   return (
//     <div
//       role="menuitemcheckbox"
//       aria-checked={checked}
//       className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
//       {...props}
//     >
//       <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//         {checked && <Check className="h-4 w-4" />}
//       </span>
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuRadioItem({
//   className = "",
//   children,
//   checked,
//   ...props
// }) {
//   return (
//     <div
//       role="menuitemradio"
//       aria-checked={checked}
//       className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
//       {...props}
//     >
//       <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//         {checked && <Circle className="h-2 w-2 fill-current" />}
//       </span>
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuShortcut({ className = "", ...props }) {
//   return (
//     <span
//       className={`ml-auto text-xs tracking-widest opacity-60 ${className}`}
//       {...props}
//     />
//   );
// }
