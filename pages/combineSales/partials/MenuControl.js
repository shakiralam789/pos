import React, { useState } from "react";
import MenuControlTab from "./MenuControlTab";
import ItemsShow from "./ItemsShow";
import TableList from "./TableList";

export default function MenuControl({setData,data}) {
  const [header, setHeader] = useState("items");
  return (
    <div>
      <div className="pt-6 pb-3 sticky top-0 z-10 bg-gray-100">
        <MenuControlTab header={header} setHeader={setHeader} />
      </div>
      <div className="mb-3">
        {header === "table" && <TableList data={data} setData={setData}/>}
        {header === "items" && <ItemsShow data={data} setData={setData}/>}
      </div>
    </div>
  );
}
