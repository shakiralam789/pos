import TabHeader from "@/components/tab/TabHeader";
import TabHeaders from "@/components/tab/TabHeaders";
import cn from "@/utilities/cn";
import React from "react";

export default function MenuControlTab({ header = "", setHeader,className="" }) {
  return (
    <TabHeaders className={cn("bg-white",className)}>
     <TabHeader
        onClick={() => setHeader("items")}
        className={`${header === "items" && "active"}`}
      >
        Items
      </TabHeader>
      <TabHeader
        onClick={() => setHeader("table")}
        className={`${header === "table" && "active"}`}
      >
        Table List
      </TabHeader>
     
    </TabHeaders>
  );
}
