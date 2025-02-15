"use client";

import React, { useState } from "react";
import Preview from "./partials/preview/Preview";
import Button from "@/components/Button";
import MenuControl from "./partials/MenuControl";

export default function CombineSales({className=""}) {
  const [data, setData] = useState({
    company_name: "Luxury Dine",
    company_address: "Jashore Club (Tennis Court)",
    hotline: "01748696963",
    kot: "EGG-6",
    table: "",
    sale_type: "general",
    waiter: "Waiter 1",
    time: "10:00 AM",
    guest: "Guest 1",
    image1: "",
    image2: "",
    products: [],
  });

  function handleOnChange({ fieldName, subFieldName, value, index }) {
    if (subFieldName && index !== undefined) {
      const updatedData = [...data[fieldName]];
      updatedData[index][subFieldName] = value;
      setData({
        ...data,
        [fieldName]: updatedData,
      });
      return;
    }

    setData({
      ...data,
      [fieldName]: value,
    });
  }

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "image1" && key !== "image2") {
        formData.append(key, data[key]);
      }
    });

    if (data.image1.length > 0) {
      formData.append("image1", data.image1[0]);
    }

    if (data.image2.length > 0) {
      formData.append("image2", data.image2[0]);
    }

    // fetch...
  };

  return (
    <div className={`${className} h-full`}>
      <div className="flex flex-wrap gap-4">
        <form onSubmit={submitForm} className="w-full md:w-1/2 xl:w-[500px] 2xl:w-[600px] pt-6 md:h-screen md:overflow-y-scroll">
          <div className="md:px-4 border-r">
            <Preview
              data={data}
              setData={setData}
              handleOnChange={handleOnChange}
              className="bg-white"
            />
          </div>
          <div className="px-4 flex flex-wrap gap-2 py-4 sticky bottom-0.5 bg-gray-100">
            <Button className="bg-warning">Print order</Button>
            <Button>Conform order</Button>
            <Button className="bg-info">Payment</Button>
            <Button className="bg-danger">Cancel</Button>
          </div>
        </form>

        <div className="w-full md:w-1/2 xl:w-auto flex-1 md:h-screen md:overflow-y-scroll">
          <MenuControl data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}
