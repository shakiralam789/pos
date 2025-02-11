"use client";
import React from "react";
import ImageUpload from "./imageUpload";
import PreviewInput from "./previewInput";

export default function PreviewBefore({
  register,
  control,
  setPreview1,
  preview1,
  setPreview2,
  preview2,
}) {
  return (
    <>
      <div className="text-center">
        <div className="mb-2 relative">
          <PreviewInput
            {...register("company_name", {
              required: "Company name is required",
            })}
            placeholder="Enter company name"
            className="font-20 font-semibold"
          />
        </div>
        <div>
          <PreviewInput
            {...register("company_address", {
              required: "Company name is required",
            })}
            placeholder="Enter company address"
            className="font-13"
          />
        </div>
        <div>
          <p className="font-13 font-medium">Hotline: 01748696963</p>
        </div>
        <div>Bill Receipt</div>
        <div className="flex flex-wrap">
          <div className="flex-1">
            <ImageUpload
              control={control}
              setPreview={setPreview1}
              preview={preview1}
              name="image1"
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-end">
            <ImageUpload
              control={control}
              setPreview={setPreview2}
              preview={preview2}
              name="image2"
            />
          </div>
        </div>
        <div className="font-12 space-y-1.5">
          <div>1738756105</div>
          <div>BIN: 005655037-0901</div>
          <div>Mushok 6.3</div>
        </div>
      </div>
      <div className="pb-2 mb-2 border-b border-gray-400 mt-4 text-left gap-2 grid grid-cols-2 font-13">
        <div>
          <div className="flex items-center gap-1">
            <span>KOT:</span>{" "}
            <PreviewInput
              {...register("company_name", {
                required: "KOT is required",
              })}
              placeholder="Enter KOT"
              className="w-full font-13 font-normal text-left"
            />
          </div>
          <div>Table : Table 8</div>
        </div>
        <div>
          <div>Sale Type: General</div>
          <div>Waiter : Md farid</div>
        </div>
      </div>
      <div className="font-12 pb-2 mb-2 border-b border-gray-400">
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
