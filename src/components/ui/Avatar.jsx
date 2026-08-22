import * as React from "react";

export function Avatar({ className = "", children, ...props }) {
  return (
    <div
      className={`relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({
  className = "",
  src,
  alt = "",
  onError,
  ...props
}) {
  const [hasError, setHasError] = React.useState(false);

  if (!src || hasError) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", children, ...props }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
