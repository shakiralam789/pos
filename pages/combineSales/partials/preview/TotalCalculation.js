import React from "react";

export default function TotalCalculation({ className=""}) {
  return (
    <div className={`font-12 gap-2 space-y-1.5 ${className}`}>
      <div className="flex flex-wrap justify-end ">
        <div className="capitalize">Sub total:</div>
        <div className="w-1/4 text-right">3,296.00</div>
      </div>
      <div className="flex flex-wrap justify-end ">
        <div className="capitalize">Discount:</div>
        <div className="w-1/4 text-right">15.00</div>
      </div>
      <div className="flex flex-wrap justify-end ">
        <div className="capitalize">VAT (5)%:</div>
        <div className="w-1/4 text-right">165.00</div>
      </div>
      <div className="flex flex-wrap justify-end ">
        <div className="capitalize">Total:</div>
        <div className="w-1/4 text-right">3,446.00</div>
      </div>
      <div className="sticky bottom-0 font-18 font-semibold flex flex-wrap justify-end ">
        <div className="capitalize">Total Payable:</div>
        <div className="w-1/4 text-right">3,446.00</div>
      </div>
    </div>
  );
}
