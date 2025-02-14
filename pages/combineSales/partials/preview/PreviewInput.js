import cn from "@/utilities/cn";
import React from "react";

export default function PreviewInput({ className = "", ...rest }) {
  return (
    <input
      {...rest}
      className={cn(
        "text-center outline-none focus:border-transparent focus:bg-gray-300 px-2 border border-transparent hover:border-gray-400 rounded",
        className
      )}
    />
  );
}
