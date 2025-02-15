import React from "react";
import PreviewInput from "./PreviewInput";
import { toNumber } from "@/utilities/helper";
import CircleMinus from "@/components/icons/CircleMinus";

export default function Table({ handleOnChange, data,setData }) {

  function removeProductTableRow(e, index) {
    e.preventDefault();
    let list = { ...data };
    let products = list.products.filter((el, i) => i != index);
    setData({ ...list, products: products });
}

  return (
    <div className="overflow-x-auto">
      <table className="w-full font-12 text-left">
        <thead>
          <tr className="*:py-1 *:border-b *:border-b-gray-400">
            <th className={`${data.products && data.products.length > 0 ? "pl-8":""}`}>SL</th>
            <th>Code</th>
            <th>Name</th>
            <th className="text-left">Qty</th>
            <th className="text-right">Price</th>
            <th className="text-right w-1/4">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.products && data.products.length > 0 ? (
            data.products.map((item, index) => (
              <tr className="*:py-0.5 *:border-b *:border-b-gray-400" key={index}>
                <td>
                  <div className="flex items-center gap-1">
                    <button onClick={(e)=> removeProductTableRow(e, index)} className="size-7 flex items-center justify-center">
                      <CircleMinus />
                    </button>
                    <span>{index + 1}</span>
                  </div>
                </td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td className="text-left">
                  <PreviewInput
                    value={data.products[index].qty}
                    onChange={(e) =>
                      handleOnChange({
                        fieldName: "products",
                        subFieldName: "qty",
                        value: toNumber(e.target.value),
                        index,
                      })
                    }
                    className="w-8 px-1 text-center"
                  />
                </td>
                <td className="text-right">{item.price}</td>
                <td className="text-right">
                  {toNumber(item.price) * toNumber(item.qty)}
                </td>
              </tr>
            ))
          ) : (
            <tr className="*:border-b *:border-b-gray-400">
              <td colSpan={6} className="text-center py-2 text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
