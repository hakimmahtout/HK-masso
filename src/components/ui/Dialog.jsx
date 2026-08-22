import { X } from "lucide-react";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const DialogContext = createContext();

function Dialog({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <DialogContext.Provider value={{ openName, close, open }}>
      {children}
    </DialogContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(DialogContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Overlay({ children, name, className, ...props }) {
  const { openName, close } = useContext(DialogContext);

  if (name !== openName) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className}`}
      onClick={close}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

function Window({ children, className, ...props }) {
  const { close } = useContext(DialogContext);

  // const ref = useOutsideClick(close, {
  //   ignore: [
  //     "[data-radix-popper-content-wrapper]",
  //     "[data-radix-select-content]",
  //   ],
  // });
  return (
    <div
      // ref={ref}
      className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <button
        onClick={close}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </button>
      {children}
    </div>
  );
}

function Header({ children, className, ...props }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Title({ children, className, ...props }) {
  return (
    <h2
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

function Description({ children, className, ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
}

function Body({ children }) {
  const { close } = useContext(DialogContext);

  return <div>{cloneElement(children, { onCloseModal: close })}</div>;
}

function Footer({ children, className, ...props }) {
  const { close } = useContext(DialogContext);

  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2
        ${className}`}
      {...props}
    >
      <Button type="button" variant="outline" onClick={close}>
        Cancel
      </Button>
      {children}
    </div>
  );
}

Dialog.Open = Open;
Dialog.Overlay = Overlay;
Dialog.Window = Window;
Dialog.Header = Header;
Dialog.Title = Title;
Dialog.Description = Description;
Dialog.Body = Body;
Dialog.Footer = Footer;

export default Dialog;
