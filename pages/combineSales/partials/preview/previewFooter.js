import React from "react";

export default function PreviewFooter({className=""}) {
  return (
    <div className={className}>
      <p className="border-b border-b-gray-400 text-center font-13 mb-2 pb-1">
        (In Words: Three Thousand Four Hundred And Forty-Six Taka Only)
      </p>
      <div className="flex flex-wrap mt-4">
        <div className="flex-col flex-1 flex justify-end">
          <div className="font-13">Admin</div>
          <div className="w-fit font-14 border-t border-t-gray-400 font-semibold">
            Cashier
          </div>
        </div>
        <div className="flex-col flex-1 flex justify-end">
          <div className="font-13"></div>
          <div className="w-fit font-14 border-t border-t-gray-400 font-semibold">
            Guest Signature
          </div>
        </div>
      </div>
      <p className="border-b border-b-gray-400 text-center font-13 mt-2 mb-2 pb-1">
        Thank You Come Again
      </p>
      <p className="text-center font-11 mt-2">
        Software developed by- <span className="font-semibold">Zion IT</span>
      </p>
    </div>
  );
}
