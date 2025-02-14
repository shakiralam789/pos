"use client";
import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "./ImageUpload";
import PreviewInput from "./PreviewInput";
import CustomSelect from "@/components/CustomSelect";

export default function PreviewBefore({
  setPreview1,
  preview1,
  setPreview2,
  preview2,
  handleOnChange,
  data,
}) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsInputVisible(false);
      }
    }

    if (isInputVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputVisible]);

  return (
    <>
      <div className="text-center">
        <div className="mb-2 relative">
          <PreviewInput
            onChange={(e) =>
              handleOnChange({
                filedName: "company_name",
                value: e.target.value,
              })
            }
            placeholder="Enter company name"
            className="font-20 font-semibold"
            value={data?.company_name || ""}
          />
        </div>
        <div>
          <PreviewInput
            onChange={(e) =>
              handleOnChange({
                filedName: "company_address",
                value: e.target.value,
              })
            }
            placeholder="Enter company address"
            className="font-13"
            value={data?.company_address || ""}
          />
        </div>
        <div ref={wrapperRef}>
          {isInputVisible && (
            <PreviewInput
              onChange={(e) =>
                handleOnChange({ filedName: "hotline", value: e.target.value })
              }
              autoFocus
              placeholder="Enter hotline"
              className="font-13 font-medium"
              value={data?.hotline || ""}
            />
          )}
          {!isInputVisible && (
            <p
              onClick={() => setIsInputVisible(true)}
              className="h-[24px] border border-transparent min-w-[256px] w-fit mx-auto rounded hover:border-gray-400 font-13 font-medium"
            >
              Hotline: {data?.hotline}
            </p>
          )}
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
              onChange={(e) =>
                handleOnChange({ filedName: "kot", value: e.target.value })
              }
              value={data?.kot || ""}
              placeholder="Enter KOT"
              className="w-full font-13 font-normal text-left"
            />
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
