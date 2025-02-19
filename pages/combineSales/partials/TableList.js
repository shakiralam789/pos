import React, { useState } from "react";

export default function TableList({ data, setData }) {
  const [tableList, setTableList] = useState([
    { id: 1, name: "Table 1", value: "table_1" },
    { id: 2, name: "Table 2", value: "table_2" },
    { id: 3, name: "Table 3", value: "table_3" },
    { id: 4, name: "Table 4", value: "table_4" },
    { id: 5, name: "Table 5", value: "table_5" },
    { id: 6, name: "Table 6", value: "table_6" },
    { id: 7, name: "Table 7", value: "table_7" },
    { id: 8, name: "Table 8", value: "table_8" },
    { id: 9, name: "Table 9", value: "table_9" },
    { id: 10, name: "Table 10", value: "table_10" },
  ]);

  const handleTableClick = (value) => {
    if (data.table === value) {
      return;
    }
    setData("table", value);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        Select a Table
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
        {tableList.map((table) => {
          const isActive = data.table === table.value;

          return (
            <div
              key={table.id}
              className={`p-6 rounded-md border text-center font-medium cursor-pointer transition-all shadow-lg 
                ${
                  isActive
                    ? "bg-success text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                }
              `}
              onClick={() => handleTableClick(table.value)}
            >
              <span className="block font-16">{table.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
