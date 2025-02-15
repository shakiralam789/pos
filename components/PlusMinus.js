import React, { use, useEffect, useState } from "react";
import Plus from "./icons/Plus";
import Minus from "./icons/Minus";

export default function PlusMinus({
  initialValue = 0,
  onChange = () => {},
  showValue = true,
}) {
  const [value, setValue] = useState(initialValue);

  const handleIncrease = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(newValue);
  };

  const handleDecrease = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="border h-5 flex items-center rounded">
      <div
        onClick={handleDecrease}
        className={`px-1 border-r ${
          value === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <Minus className="size-3.5 2xl:size-4" />
      </div>

      {showValue && (
        <div className="px-2 text-gray-600 font-medium font-13">{value}</div>
      )}

      <div onClick={handleIncrease} className="px-1 cursor-pointer">
        <Plus className="size-3.5 2xl:size-4" />
      </div>
    </div>
  );
}
