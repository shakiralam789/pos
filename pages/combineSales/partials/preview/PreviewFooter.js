import React from "react";
import PreviewInput from "./PreviewInput";

export default function PreviewFooter({
  className = "",
  handleOnChange,
  data,
  setData,
  control,
  register,
  errors,
  watch,
}) {
  return (
    <div className={className}>
      <p className="border-b border-b-gray-400 text-center font-13 mb-2 pb-1">
        (In Words: Three Thousand Four Hundred And Forty-Six Taka Only)
      </p>
      <div className="flex flex-wrap mt-4">
        <div className="flex-col flex-1 flex justify-end">
          <div className="font-13">Admin</div>
          <div className="w-fit font-14 border-t border-t-gray-400 font-semibold">
            Cashier
          </div>
        </div>
        <div className="flex-col flex-1 flex justify-end">
          <div className="font-13"></div>
          <div className="w-fit font-14 border-t border-t-gray-400 font-semibold">
            Guest Signature
          </div>
        </div>
      </div>
      <div className="border-b border-b-gray-400 text-center font-13 mt-2 mb-2 pb-1">
        <PreviewInput
          {...register("gratitude", {
            required: "Gratitude is required",
          })}
          val={watch("gratitude")}
          placeholder="Enter gratitude"
          className="font-14"
          errorsMessage={errors?.gratitude?.message}
          plainTagClass="font-12"
          inputClassName={"font-12"}
        >
          {watch("gratitude") || ""}
        </PreviewInput>
      </div>
      <p className="text-center font-11 mt-2">
        Software developed by- <span className="font-semibold">Zion IT</span>
      </p>
    </div>
  );
}
