"use client";
import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "./ImageUpload";
import PreviewInput from "./PreviewInput";
import CustomSelect from "@/components/CustomSelect";
import ErrorMsg from "@/components/ErrorMsg";
import { Controller } from "react-hook-form";

export default function PreviewBefore({
  setPreview1,
  preview1,
  setPreview2,
  preview2,
  handleOnChange,
  data,
  control,
  register,
  errors,
  watch,
}) {
  return (
    <>
      <div className="text-center">
        <div className="mb-2 relative">
          <PreviewInput
            {...register("company_name", {
              required: "Company name is required",
            })}
            name="company_name"
            val={watch("company_name")}
            placeholder="Enter company name"
            className="font-20 font-semibold"
            plainTagClass="h-8"
            errorsMessage={errors?.company_name?.message}
          >
            {watch("company_name") || ""}
          </PreviewInput>
        </div>
        <div className="relative">
          <PreviewInput
            {...register("company_address", {
              required: "Company name is required",
            })}
            name="company_address"
            val={watch("company_address")}
            placeholder="Enter company address"
            className="font-14 "
            plainTagClass="h-[23px]"
            errorsMessage={errors?.company_address?.message}
          >
            {watch("company_address") || ""}
          </PreviewInput>
        </div>
        <div className="relative">
          <PreviewInput
            {...register("hotline", {
              required: "Hotline is required",
            })}
            name="hotline"
            val={watch("hotline")}
            placeholder="Enter hotline"
            className="font-13 font-semibold"
            plainTagClass="h-[22px]"
            errorsMessage={errors?.hotline?.message}
          >
            Hotline: {watch("hotline") || ""}
          </PreviewInput>
        </div>
        <div>Bill Receipt</div>
        <div className="flex flex-wrap">
          <div className="flex-1">
            <ImageUpload
              setPreview={setPreview1}
              preview={preview1}
              name="image1"
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-end">
            <ImageUpload
              setPreview={setPreview2}
              preview={preview2}
              name="image2"
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
        <div className="font-12 space-y-1.5">
          <div>1738756105</div>
          <div>BIN: 005655037-0901</div>
          <div>Mushok 6.3</div>
        </div>
      </div>
      <div className="pb-2 mb-2 border-b border-gray-400 mt-6 text-left gap-2 grid grid-cols-2 font-13">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">KOT:</span>
            <PreviewInput
              {...register("kot", {
                required: "kot is required",
              })}
              name="kot"
              val={watch("kot")}
              placeholder="Enter kot"
              className="font-14"
              plainTagClass="h-[22px]"
              errorsMessage={errors?.kot?.message}
              inputClassName={'text-left'}
            >
              {watch("kot") || ""}
            </PreviewInput>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Table: </span>
            <CustomSelect
              onChange={(value) =>
                handleOnChange({ fieldName: "table", value: value })
              }
              value={data?.table || ""}
              className="preview-select"
              search={true}
              isClearable={true}
              options={[
                { label: "table 1", value: "table_1" },
                { label: "table 2", value: "table_2" },
                { label: "table 3", value: "table_3" },
                { label: "table 4", value: "table_4" },
                { label: "table 5", value: "table_5" },
                { label: "table 6", value: "table_6" },
                { label: "table 7", value: "table_7" },
                { label: "table 8", value: "table_8" },
                { label: "table 9", value: "table_9" },
                { label: "table 10", value: "table_10" },
              ]}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Sale Type: </span>
            <CustomSelect
              onChange={(e) =>
                handleOnChange({ fieldName: "sale_type", value: e })
              }
              value={data?.sale_type || ""}
              className="preview-select"
              options={[
                { label: "General", value: "general" },
                { label: "Takeaway", value: "takeaway" },
              ]}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold whitespace-nowrap">Waiter: </span>
            <CustomSelect
              onChange={(value) =>
                handleOnChange({ fieldName: "waiter", value: value })
              }
              value={data?.waiter || ""}
              className="preview-select"
              search={true}
              isClearable={true}
              options={[
                { label: "waiter 1", value: "waiter_1" },
                { label: "waiter 2", value: "waiter_2" },
                { label: "waiter 3", value: "waiter_3" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="space-y-1 font-12 pb-2 mb-2 border-b border-gray-400">
        <div>
          <span className="font-semibold">Time</span>: 5th Feb 25 5:48:25 pm
        </div>
        <div>
          <span className="font-semibold">Guest</span> : Guest
        </div>
      </div>
    </>
  );
}
