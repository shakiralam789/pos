import React, { useState, useEffect } from "react";
import SearchIcon from "./icons/SearchIcon";
import CancelIcon from "./icons/CancelIcon";

export default function SearchInput({
  value: controlledValue,
  onChange,
  onAction,
  placeholder = "Search item...",
  className = "",
  onCancel = () => {},
}) {
  const [value, setValue] = useState(controlledValue || "");

  useEffect(() => {
    setValue(controlledValue || "");
  }, [controlledValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onAction) {
      onAction(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => onAction && onAction(value)}
        className="absolute top-1/2 -translate-y-1/2 left-2"
      >
        <SearchIcon className="text-gray-400" />
      </button>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-8 w-full placeholder:text-xs bg-white border text-sm rounded-md text-gray-800 outline-none block px-2 py-1.5"
      />
      {value && (
        <button
          onClick={() => {
            setValue("");
            onCancel();
          }}
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          <CancelIcon className="text-gray-400" />
        </button>
      )}
    </div>
  );
}
