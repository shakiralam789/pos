"use client";
import React, { useState } from "react";
import Table from "./Table";
import TotalCalculation from "./TotalCalculation";
import PreviewFooter from "./PreviewFooter";
import PreviewBefore from "./PreviewBefore";

export default function Preview({
  className = "",
  handleOnChange,
  data,
  setData,
  Controller,
  control,
  register,
  errors,
  watch,
}) {
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  return (
    <div
      className={`${className} text-gray-800 p-3 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.2)] mb-1`}
    >
      <PreviewBefore
        setPreview1={setPreview1}
        preview1={preview1}
        setPreview2={setPreview2}
        preview2={preview2}
        handleOnChange={handleOnChange}
        data={data}
        control={control}
        register={register}
        errors={errors}
        watch={watch}
      />
      <Table handleOnChange={handleOnChange} data={data} setData={setData} />
      <TotalCalculation className="mt-4" />
      <PreviewFooter className="mt-4" />
    </div>
  );
}
