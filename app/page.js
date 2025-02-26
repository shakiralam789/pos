// pages/index.js
"use client";
import { useState, useRef } from "react";
import styles from "./styles/Home.module.css";
import TableSquare from "@/components/icons/TableSquare";
import TableCircle from "@/components/icons/Table";
import InfoIcon from "@/components/icons/Info";

export default function Home() {
  const [tables, setTables] = useState([]);

  const [showSidebar, setShowSidebar] = useState(true);
  const floorPlanRef = useRef(null);

  // Table templates
  const tableTemplates = {
    "square-8": {
      table: <TableSquare />,
      width: 140,
      height: 80,
      seats: 8,
      shape: "square",
      color: "#8884d8",
    },
    "round-4": {
      table: <TableCircle />,
      width: 80,
      height: 80,
      seats: 4,
      shape: "circle",
      color: "#0088fe",
    },
  };

 
  // Check if a table overlaps with any existing tables
  const checkOverlap = (newTable) => {
    return tables.some((table) => isOverlapping(newTable, table));
  };

  // Check if two tables overlap
  const isOverlapping = (table1, table2) => {
    // For circular tables
    if (table1.shape === "circle" && table2.shape === "circle") {
      const distance = Math.sqrt(
        Math.pow(
          table1.x + table1.width / 2 - (table2.x + table2.width / 2),
          2
        ) +
          Math.pow(
            table1.y + table1.height / 2 - (table2.y + table2.height / 2),
            2
          )
      );
      return distance < table1.width / 2 + table2.width / 2;
    }

    // For rectangular tables or mixed shapes
    // Add a small buffer (10px) to prevent tables from being too close
    const buffer = 10;
    return !(
      table1.x + table1.width + buffer <= table2.x ||
      table2.x + table2.width + buffer <= table1.x ||
      table1.y + table1.height + buffer <= table2.y ||
      table2.y + table2.height + buffer <= table1.y
    );
  };

  // The direct event listeners approach without useCallback
  const handleMouseDown = (e, table) => {
    e.preventDefault();
    e.stopPropagation();

    // Keep track of the table and offset directly
    const tableId = table.id;
    const offsetX = e.clientX - table.x;
    const offsetY = e.clientY - table.y;

    // Track if we're currently dragging
    let isDragging = true;

    // Define the move handler for this specific drag operation
    const moveHandler = (moveEvent) => {
      if (!isDragging) return;

      setTables((currentTables) => {
        // Find the table being dragged
        const tableIndex = currentTables.findIndex((t) => t.id === tableId);
        if (tableIndex === -1) return currentTables;

        const currentTable = currentTables[tableIndex];

        // Get floor plan boundaries
        const floorPlanRect = floorPlanRef.current?.getBoundingClientRect();
        if (!floorPlanRect) return currentTables;

        // Calculate new position
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        // Constrain to floor plan boundaries
        const constrainedX = Math.max(
          0,
          Math.min(newX, floorPlanRect.width - currentTable.width)
        );
        const constrainedY = Math.max(
          0,
          Math.min(newY, floorPlanRect.height - currentTable.height)
        );

        // Create updated table object
        const updatedTable = {
          ...currentTable,
          x: constrainedX,
          y: constrainedY,
        };

        // Check if the move would cause an overlap
        const wouldOverlap = currentTables.some((otherTable) => {
          if (otherTable.id === currentTable.id) return false;
          return isOverlapping(updatedTable, otherTable);
        });

        // Only update if it wouldn't overlap
        // if (wouldOverlap) return currentTables;

        // Create a new tables array with the updated table
        const newTables = [...currentTables];
        newTables[tableIndex] = updatedTable;
        return newTables;
      });
    };

    // Define the up handler for this specific drag operation
    const upHandler = () => {
      console.log(tables);
      
      isDragging = false;
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    // Add the event listeners
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  // Remove a table
  const removeTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  // Clear all tables
  const clearTables = () => {
    if (confirm("Are you sure you want to clear all tables?")) {
      setTables([]);
    }
  };

  // Render table based on its shape
  const renderTable = (table) => {
    const tableStyle = {
      left: `${table.x}px`,
      top: `${table.y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
    };

    // Additional styles based on shape
    if (table.shape === "circle") {
      tableStyle.borderRadius = "50%";
    } else if (table.shape === "square") {
      tableStyle.borderRadius = "8px";
    } else if (table.shape === "rectangle") {
      tableStyle.borderRadius = "8px";
    }

    return (
      <div
        key={table.id}
        className={styles.tableStyle}
        style={tableStyle}
        onMouseDown={(e) => handleMouseDown(e, table)}
      >
        
        {table.table}
        <div className={styles.iconsParent}>
          <button
            className={styles.tableCancel}
            onClick={(e) => {
              e.stopPropagation();
              removeTable(table.id);
            }}
          >
            ×
          </button>
          <div className={styles.tableInfo}>
            <InfoIcon />
          </div>
        </div>
        <div className={styles.tablePopUp + " font-13"}>
          <ul className="font-13">
            <li>
              <span>Seat:</span> {table.seats}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Restaurant Table Manager</h1>
        <button
          className={styles.sidebarToggle}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? "« Hide Controls" : "» Show Controls"}
        </button>
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.workArea}>
            {showSidebar && (
              <div className={styles.sidebar}>
                <div className={styles.controlSection}>
                  <h2>Add Tables</h2>
                  <div className={styles.tableOptions}>
                    {Object.entries(tableTemplates).map(([key, table]) => (
                      <div
                        key={key}
                        className={styles.tableOption}
                        draggable={true}
                        onDragStart={(e) => {
                          // Store the table type in the drag data
                          e.dataTransfer.setData("tableType", key);
                        }}
                      >
                        {table.table}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.controlSection}>
                  <h2>Instructions</h2>
                  <ul className={styles.instructions + " font-13"}>
                    <li>Drag tables from sidebar to add them</li>
                    <li>Drag existing tables to reposition them</li>
                    <li>Click the × button to remove a table</li>
                    <li>Tables automatically prevent overlapping</li>
                  </ul>
                  <button
                    className={`${styles.button} ${styles.clearButton} font-13`}
                    onClick={clearTables}
                  >
                    Clear All Tables
                  </button>
                </div>

                <div className={styles.controlSection}>
                  <h2>Table Summary</h2>
                  <div className={styles.tableSummary + " font-13"}>
                    <p>Total Tables: {tables.length}</p>
                    <p>
                      Total Capacity:{" "}
                      {tables.reduce((sum, table) => sum + table.seats, 0)}{" "}
                      seats
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              ref={floorPlanRef}
              className={styles.floorPlan}
              onDragOver={(e) => {
                // Prevent default to allow drop
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();

                // Get the table type from the drag data
                const tableType = e.dataTransfer.getData("tableType");
                if (!tableType) return;

                const template = tableTemplates[tableType];
                if (!template) return;

                // Calculate the position where the table should be created
                const floorPlanRect =
                  floorPlanRef.current.getBoundingClientRect();
                const x = e.clientX - floorPlanRect.left - template.width / 2;
                const y = e.clientY - floorPlanRect.top - template.height / 2;

                // Create a new table at the drop position
                const newTable = {
                  id: `table-${Date.now()}`,
                  x: Math.max(
                    0,
                    Math.min(x, floorPlanRect.width - template.width)
                  ),
                  y: Math.max(
                    0,
                    Math.min(y, floorPlanRect.height - template.height)
                  ),
                  ...template,
                  number: tables.length + 1,
                };

                // Check for overlaps before adding
                if (!checkOverlap(newTable)) {
                  setTables([...tables, newTable]);
                } else {
                  alert(
                    "Cannot place table here. It overlaps with an existing table."
                  );
                }
              }}
            >
              {tables.map((table) => renderTable(table))}
              {tables.length === 0 && (
                <div className={styles.emptyState}>
                  Drag tables from the sidebar and drop them into position
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
