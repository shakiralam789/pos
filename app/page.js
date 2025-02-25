// pages/index.js
'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import styles from './styles/Home.module.css';

export default function Home() {
  const [tables, setTables] = useState([]);
  const [draggingTable, setDraggingTable] = useState(null);

  const [showSidebar, setShowSidebar] = useState(true);
  const floorPlanRef = useRef(null);

  // Table templates
  const tableTemplates = {
    'square-2': { width: 80, height: 80, seats: 2, shape: 'square', color: '#8884d8' },
    'square-4': { width: 100, height: 100, seats: 4, shape: 'square', color: '#82ca9d' },
    'rectangle-6': { width: 180, height: 100, seats: 6, shape: 'rectangle', color: '#ffc658' },
    'round-4': { width: 100, height: 100, seats: 4, shape: 'circle', color: '#ff8042' },
    'round-8': { width: 140, height: 140, seats: 8, shape: 'circle', color: '#0088fe' },
  };

  // Add a new table
  const addTable = (type) => {
    if (!floorPlanRef.current) return;
    
    const template = tableTemplates[type];
    const floorPlanRect = floorPlanRef.current.getBoundingClientRect();
    
    const newTable = {
      id: `table-${Date.now()}`,
      x: floorPlanRect.width / 2 - template.width / 2,
      y: floorPlanRect.height / 2 - template.height / 2,
      ...template,
      number: tables.length + 1,
    };
    
    // Check if new table overlaps with existing tables
    if (!checkOverlap(newTable)) {
      setTables([...tables, newTable]);
    } else {
      alert('Cannot place table here. It overlaps with an existing table.');
    }
  };

  // Check if a table overlaps with any existing tables
  const checkOverlap = (newTable) => {
    return tables.some(table => isOverlapping(newTable, table));
  };

  // Check if two tables overlap
  const isOverlapping = (table1, table2) => {
    // For circular tables
    if (table1.shape === 'circle' && table2.shape === 'circle') {
      const distance = Math.sqrt(
        Math.pow(table1.x + table1.width/2 - (table2.x + table2.width/2), 2) +
        Math.pow(table1.y + table1.height/2 - (table2.y + table2.height/2), 2)
      );
      return distance < (table1.width/2 + table2.width/2);
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
      
      setTables(currentTables => {
        // Find the table being dragged
        const tableIndex = currentTables.findIndex(t => t.id === tableId);
        if (tableIndex === -1) return currentTables;
        
        const currentTable = currentTables[tableIndex];
        
        // Get floor plan boundaries
        const floorPlanRect = floorPlanRef.current?.getBoundingClientRect();
        if (!floorPlanRect) return currentTables;
        
        // Calculate new position
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;
        
        // Constrain to floor plan boundaries
        const constrainedX = Math.max(0, Math.min(newX, floorPlanRect.width - currentTable.width));
        const constrainedY = Math.max(0, Math.min(newY, floorPlanRect.height - currentTable.height));
        
        // Create updated table object
        const updatedTable = { ...currentTable, x: constrainedX, y: constrainedY };
        
        // Check if the move would cause an overlap
        const wouldOverlap = currentTables.some(otherTable => {
          if (otherTable.id === currentTable.id) return false;
          return isOverlapping(updatedTable, otherTable);
        });
        
        // Only update if it wouldn't overlap
        if (wouldOverlap) return currentTables;
        
        // Create a new tables array with the updated table
        const newTables = [...currentTables];
        newTables[tableIndex] = updatedTable;
        return newTables;
      });
    };
    
    // Define the up handler for this specific drag operation
    const upHandler = () => {
      isDragging = false;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };
    
    // Add the event listeners
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };



  // Remove a table
  const removeTable = (id) => {
    setTables(tables.filter(table => table.id !== id));
  };

  // Clear all tables
  const clearTables = () => {
    if (confirm('Are you sure you want to clear all tables?')) {
      setTables([]);
    }
  };

  // Render table based on its shape
  const renderTable = (table) => {
    const tableStyle = {
      position: 'absolute',
      left: `${table.x}px`,
      top: `${table.y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
      backgroundColor: table.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'move',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.2s ease',
      zIndex: 1,
      userSelect: 'none',
    };
    
    // Additional styles based on shape
    if (table.shape === 'circle') {
      tableStyle.borderRadius = '50%';
    } else if (table.shape === 'square') {
      tableStyle.borderRadius = '8px';
    } else if (table.shape === 'rectangle') {
      tableStyle.borderRadius = '8px';
    }
    
    return (
      <div
        key={table.id}
        style={tableStyle}
        onMouseDown={(e) => handleMouseDown(e, table)}
      >
        <span style={{ 
          color: '#fff', 
          fontWeight: 'bold', 
          fontSize: table.width > 100 ? '18px' : '14px', 
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)' 
        }}>
          {table.number}
        </span>
        
        {/* Remove button */}
        <button
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: '2px solid white',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering table drag
            removeTable(table.id);
          }}
        >
          ×
        </button>
        
        {table.shape !== 'circle' && (
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.8)',
          }}>
            {table.seats} seats
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Restaurant Table Manager</title>
        <meta name="description" content="Drag and drop table management for restaurants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Restaurant Table Manager
          </h1>
          <button 
            className={styles.sidebarToggle}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? '« Hide Controls' : '» Show Controls'}
          </button>
        </div>

        <div className={styles.workArea}>
          {showSidebar && (
            <div className={styles.sidebar}>
              <div className={styles.controlSection}>
                <h2>Add Tables</h2>
                <div className={styles.tableOptions}>
                  {Object.entries(tableTemplates).map(([key, table]) => (
                    <button
                      key={key}
                      className={styles.tableOption}
                      style={{ backgroundColor: table.color }}
                      onClick={() => addTable(key)}
                    >
                      {table.shape === 'circle' ? 'Round' : table.shape === 'square' ? 'Square' : 'Rectangle'} 
                      <br />
                      {table.seats} seats
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.controlSection}>
                <h2>Instructions</h2>
                <ul className={styles.instructions}>
                  <li>Drag tables to position them</li>
                  <li>Click the × button to remove a table</li>
                  <li>Tables automatically prevent overlapping</li>
                </ul>
                <button 
                  className={`${styles.button} ${styles.clearButton}`}
                  onClick={clearTables}
                >
                  Clear All Tables
                </button>
              </div>
              
              <div className={styles.controlSection}>
                <h2>Table Summary</h2>
                <div className={styles.tableSummary}>
                  <p>Total Tables: {tables.length}</p>
                  <p>Total Capacity: {tables.reduce((sum, table) => sum + table.seats, 0)} seats</p>
                </div>
              </div>
            </div>
          )}

          <div 
            ref={floorPlanRef} 
            className={styles.floorPlan}
          >
            {tables.map(table => renderTable(table))}
            {tables.length === 0 && (
              <div className={styles.emptyState}>
                Add tables from the sidebar and drag them into position
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}