"use client";
import React, { useState } from "react";
import Table from "./table";
import TotalCalculation from "./totalCalculation";
import PreviewFooter from "./previewFooter";
import PreviewBefore from "./previewBefore";
import { useForm, Controller } from "react-hook-form";

export default function Preview({ className = "" }) {
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      company_name: "Luxury Dine",
      company_address: "Jashore Club (Tennis Court)",
      hotline: "01748696963",
      kot: "EGG-6",
      table: "Table 1",
      sale_type: "General",
      waiter: "Waiter 1",
      time: "10:00 AM",
      guest: "Guest 1",
      qty: [1, 2, 3],
    },
  });

  const submitForm = (data) => {
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
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`${className} text-gray-800 p-3 border border-gray-400`}
    >
      <PreviewBefore
        setPreview1={setPreview1}
        preview1={preview1}
        setPreview2={setPreview2}
        preview2={preview2}
        control={control}
        register={register}
      />
      <Table />
      <TotalCalculation className="mt-4" />
      <PreviewFooter className="mt-4" />

      <button type="submit">Submit</button>
    </form>
  );
}
