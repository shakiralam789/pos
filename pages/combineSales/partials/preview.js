import React from "react";

export default function Preview({ className }) {
  return (
    <div className={`${className} p-3 border border-gray-400`}>
      <div className="text-center">
        <div className="mb-2">
          <h3 className="font-medium font-20">Luxury Dine</h3>
        </div>
        <div>
          <p className="font-14">Jashore Club (Tennis Court)</p>
        </div>
        <div>
          <p className="font-13 font-medium">Hotline: 01748696963</p>
        </div>
        <div>Bill Receipt</div>
        <div className="flex flex-wrap">
          <div className="flex-1">
            <div className="size-16 bg-gray-200 border border-gray-400"></div>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1">
            <div className="ml-auto size-16 bg-gray-200 border border-gray-400"></div>
          </div>
        </div>
        <div className="font-13 space-y-1.5">
          <div>1738756105</div>
          <div>BIN: 005655037-0901</div>
          <div>Mushok 6.3</div>
        </div>
      </div>
      <div className="pb-2 mb-2 border-b border-gray-400 mt-4 text-left flex flex-wrap font-13">
        <div className="flex-1">
          <div>KOT: EGG-6</div>
          <div>Table : Table 8</div>
        </div>
        <div className="flex-1">
          <div>Sale Type: General</div>
          <div>Waiter : Md farid</div>
        </div>
      </div>
      <div className="font-13 pb-2 mb-2 border-b border-gray-400">
        <div>
          <span className="font-semibold">Time</span>: 5th Feb 25 5:48:25 pm
        </div>
        <div>
          <span className="font-semibold">Guest</span> : Guest
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full font-13 text-left">
          <thead>
            <tr className="*:pb-1 *:border-b *:border-b-gray-400">
              <th>SL</th>
              <th>Code</th>
              <th>Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">Qty</th>
              <th className="text-right w-1/4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="*:py-1 *:border-b *:border-b-gray-400">
              <td>1</td>
              <td>Pro-116</td>
              <td>Coconut Prawn</td>
              <td className="text-right">699</td>
              <td className="text-right">1</td>
              <td className="text-right">699</td>
            </tr>
            <tr className="*:py-1 *:border-b *:border-b-gray-400">
              <td>1</td>
              <td>Pro-112</td>
              <td>Chicken Dopiaza (6p)</td>
              <td className="text-right">549</td>
              <td className="text-right">1</td>
              <td className="text-right">549</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-13 gap-2 mt-2 space-y-1">
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
        <div className="font-18 font-semibold flex flex-wrap justify-end ">
          <div className="capitalize">Total Payable:</div>
          <div className="w-1/4 text-right">3,446.00</div>
        </div>
      </div>
      <p className="border-b border-b-gray-400 text-center font-13 mt-2 mb-2 pb-1">
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
