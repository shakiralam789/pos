import React from "react";
import cn from "@/utilities/cn";

export default function Button({
  className = "",
  href,
  children = "Cancel",
  ...props
}) {
  const Component = href ? "a" : "button";

  return (
    <Component
      className={cn(
        "font-medium hover:brightness-90 flex-1 min-w-fit whitespace-nowrap font-13 bg-success px-3 py-1.5 rounded text-white",
        className
      )}
      {...(href ? { href } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}
