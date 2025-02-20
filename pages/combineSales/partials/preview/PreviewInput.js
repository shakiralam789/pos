import ErrorMsg from "@/components/ErrorMsg";
import cn from "@/utilities/cn";
import React, { useEffect, useRef, useState } from "react";

export default function PreviewInput({
  className = "",
  inputClassName,
  plainTagClass = "",
  children,
  val = "",
  errorsMessage = "",
  ...rest
}) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsInputVisible(false);
      }
    }

    if (isInputVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputVisible]);

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <input
        {...rest}
        className={cn(
          `${
            !isInputVisible && "hidden"
          } text-center w-full outline-none bg-gray-300 px-2 border border-transparent rounded`,
          inputClassName
        )}
      />

      {!isInputVisible && (
        <p
          onClick={() => setIsInputVisible(true)}
          className={cn(
            `${
              val?.toString().trim() == ""
                ? "border-gray-400"
                : "border-transparent"
            } px-2 py-px relative border mx-auto rounded hover:border-gray-400`,
            plainTagClass
          )}
        >
          {children}
          {val?.toString().trim() == "" && (
            <span className="text-gray-400 pointer-events-none">
              {rest?.placeholder || "Enter text"}
            </span>
          )}
        </p>
      )}
      <ErrorMsg isPosition={true} message={errorsMessage} />
    </div>
  );
}
