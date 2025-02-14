"use client";

import React, { useState } from "react";
import Preview from "./partials/preview/Preview";
import Button from "@/components/Button";

export default function CombineSales() {
  const [data, setData] = useState({
    company_name: "Luxury Dine",
    company_address: "Jashore Club (Tennis Court)",
    hotline: "01748696963",
    kot: "EGG-6",
    table: "Table 1",
    sale_type: "general",
    waiter: "Waiter 1",
    time: "10:00 AM",
    guest: "Guest 1",
    image1: "",
    image2: "",
    products: [
      {
        code: "Pro-116",
        name: "Coconut Prawn",
        qty: 1,
        price: 699,
      },
    ],
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
    <div className="h-full">
      <div className="flex flex-wrap gap-4">
        <form
          onSubmit={submitForm}
          className="pt-6 h-screen overflow-y-scroll"
        >
          <div className="px-4">
          <Preview
            data={data}
            setData={setData}
            handleOnChange={handleOnChange}
            className="w-[500px]"
          />
          </div>
          <div className="px-4 flex flex-wrap gap-2 py-4 sticky bottom-0.5 bg-white">
            <Button className="bg-warning">Print order</Button>
            <Button>Conform order</Button>
            <Button className="bg-info">Payment</Button>
            <Button className="bg-danger">Cancel</Button>
          </div>
        </form>

        <div className="py-6 flex-1 h-screen overflow-y-scroll">

        </div>
      </div>
    </div>
  );
}
