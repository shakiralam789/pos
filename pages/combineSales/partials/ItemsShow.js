import Plus from "@/components/icons/Plus";
import PlusMinus from "@/components/PlusMinus";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import React, { useState } from "react";

export default function ItemsShow({ setData, data }) {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Burger",
      code: "pro-116",
      price: "599",
      image: "/images/food1.jpeg",
    },
    {
      id: 2,
      name: "Pizza",
      code: "pro-117",
      price: "799",
      image: "/images/food1.jpeg",
    },
    {
      id: 3,
      name: "Pasta",
      code: "pro-118",
      price: "699",
      image: "/images/food1.jpeg",
    },
    {
      id: 4,
      name: "Salad",
      code: "pro-119",
      price: "499",
      image: "/images/food1.jpeg",
    },
  ]);

  function updateItemQuantity(item, newQty) {
    setData((prev) => {
      if (newQty === 0) {
        return {
          ...prev,
          products: prev.products.filter((el) => el.id !== item.id),
        };
      }

      const existingProductIndex = prev.products.findIndex(
        (el) => el.id === item.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = prev.products.map((product, index) =>
          index === existingProductIndex ? { ...product, qty: newQty } : product
        );

        return { ...prev, products: updatedProducts };
      }

      return {
        ...prev,
        products: [...prev.products, { ...item, qty: newQty }],
      };
    });
  }

  return (
    <div>
      <div className="pb-3 sticky top-[84px] bg-gray-100">
        <div className="w-full md:w-1/2">
          <SearchInput />
        </div>
      </div>

      <div className="mt-2">
        <h2 className="font-semibold font-18 mb-3 text-gray-800">
          {items.length} items found
        </h2>
        <div className=" grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className={`${
                  data.products.find((el) => el.id === item.id) ? "active" : ""
                } group overflow-hidden bg-white rounded-md shadow cursor-pointer`}
              >
                <div className="w-full aspect-[100/60] overflow-hidden bg-gray-200">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt="Item"
                      className="w-full h-full object-cover object-center"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
                <div className="px-2 py-3">
                  <div className="font-13 font-medium">{item.name}</div>
                  <div className="flex gap-2 justify-between flex-wrap">
                    <div className="font-14 font-medium text-warning">
                      ${item.price}{" "}
                      {data.products.find((el) => el.id === item.id) && (
                        <span className="font-12 text-gray-400">
                          / {data.products.find((el) => el.id === item.id)?.qty}{" "}
                          pcs
                        </span>
                      )}
                    </div>
                    <div>
                      <PlusMinus
                        showValue={false}
                        initialValue={
                          data.products.find((el) => el.id === item.id)?.qty ||
                          0
                        }
                        onChange={(newQty) => updateItemQuantity(item, newQty)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-24 text-gray-400 font-medium font-20 col-span-2 md:col-span-4 text-center">
              No items found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
