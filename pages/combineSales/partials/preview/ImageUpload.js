"use client";

import UploadIcon from "@/components/icons/UploadIcon";
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";

export default function ImageUpload({
  className = "",
  setPreview,
  preview,
  name,
  handleOnChange
}) {
  const inputId = `image-upload-${name}`;
  return (
    <div className={`${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setPreview(URL.createObjectURL(file));
            handleOnChange({fieldName:name, value:file});
          }
        }}
        className="hidden"
        id={inputId}
      />

      <label htmlFor={inputId} className="group size-16 cursor-pointer block">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="cursor-pointer w-full aspect-square font-11 flex items-center justify-center bg-gray-200 ">
          <UploadIcon className="text-gray-500"/>
          </div>
        )}
      </label>
    </div>
  );
}
