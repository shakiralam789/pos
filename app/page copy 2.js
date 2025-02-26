'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './styles/Home.module.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Home() {
  const [tables, setTables] = useState([]);
  const [draggingTable, setDraggingTable] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const floorPlanRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const tableModelsRef = useRef({});

  // Table templates
  const tableTemplates = {
    'round-4': { 
      width: 100, 
      height: 100, 
      seats: 4, 
      shape: 'circle', 
      color: '#8B4513', 
      chairColor: '#A0522D' 
    },
    'round-6': { 
      width: 120, 
      height: 120, 
      seats: 6, 
      shape: 'circle', 
      color: '#8B4513', 
      chairColor: '#A0522D' 
    },
    'square-4': { 
      width: 100, 
      height: 100, 
      seats: 4, 
      shape: 'square', 
      color: '#8B4513', 
      chairColor: '#A0522D' 
    },
    'rectangle-6': { 
      width: 180, 
      height: 100, 
      seats: 6, 
      shape: 'rectangle', 
      color: '#8B4513', 
      chairColor: '#A0522D' 
    },
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!floorPlanRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf0f2f5);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe6e0c8,
      roughness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -10;
    floor.receiveShadow = true;
    scene.add(floor);

    // Add grid
    const grid = new THREE.GridHelper(2000, 100, 0x888888, 0x888888);
    grid.position.y = -9.9;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 500, 300);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Camera
    const aspect = floorPlanRef.current.clientWidth / floorPlanRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 5000);
    camera.position.set(0, 400, 500);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(floorPlanRef.current.clientWidth, floorPlanRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    floorPlanRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI / 2.1;
    controlsRef.current = controls;

    // Pre-create table models
    createTableModels();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handling resize
    const handleResize = () => {
      if (!floorPlanRef.current) return;
      
      const width = floorPlanRef.current.clientWidth;
      const height = floorPlanRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (rendererRef.current && floorPlanRef.current) {
        floorPlanRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Create reusable table models
  const createTableModels = () => {
    const models = {};

    Object.entries(tableTemplates).forEach(([key, template]) => {
      const { shape, width, height, seats, color, chairColor } = template;
      const group = new THREE.Group();

      // Table
      let tableGeometry;
      if (shape === 'circle') {
        tableGeometry = new THREE.CylinderGeometry(width / 2, width / 2, 5, 32);
      } else if (shape === 'square') {
        tableGeometry = new THREE.BoxGeometry(width, 5, height);
      } else if (shape === 'rectangle') {
        tableGeometry = new THREE.BoxGeometry(width, 5, height);
      }
      
      const tableMaterial = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(color),
        roughness: 0.3,
        metalness: 0.1
      });
      
      const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
      tableMesh.position.y = 30; // Table height
      tableMesh.castShadow = true;
      tableMesh.receiveShadow = true;
      group.add(tableMesh);

      // Table legs
      const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5D4037,
        roughness: 0.5
      });

      if (shape === 'circle') {
        const legGeometry = new THREE.CylinderGeometry(5, 5, 30, 8);
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.y = 15;
        leg.castShadow = true;
        group.add(leg);
      } else {
        const legGeometry = new THREE.BoxGeometry(5, 30, 5);
        
        // Add four legs at the corners
        const legPositions = [
          [-width/2 + 10, 15, -height/2 + 10],
          [width/2 - 10, 15, -height/2 + 10],
          [-width/2 + 10, 15, height/2 - 10],
          [width/2 - 10, 15, height/2 - 10]
        ];
        
        legPositions.forEach(position => {
          const leg = new THREE.Mesh(legGeometry, legMaterial);
          leg.position.set(...position);
          leg.castShadow = true;
          group.add(leg);
        });
      }

      // Add chairs
      const chairPositions = [];
      if (shape === 'circle') {
        // For circular tables, position chairs around in a circle
        const chairCount = seats;
        const radius = width / 2 + 25; // Distance from table center to chair
        
        for (let i = 0; i < chairCount; i++) {
          const angle = (i / chairCount) * Math.PI * 2;
          chairPositions.push({
            x: Math.sin(angle) * radius,
            z: Math.cos(angle) * radius,
            rotation: -angle // Chair faces the table
          });
        }
      } else if (shape === 'square') {
        // For square table - one chair on each side
        chairPositions.push(
          { x: 0, z: -height/2 - 20, rotation: 0 },
          { x: width/2 + 20, z: 0, rotation: -Math.PI/2 },
          { x: 0, z: height/2 + 20, rotation: Math.PI },
          { x: -width/2 - 20, z: 0, rotation: Math.PI/2 }
        );
      } else if (shape === 'rectangle') {
        // For rectangle - two chairs on each long side, one on each short side
        chairPositions.push(
          { x: -width/4, z: -height/2 - 20, rotation: 0 },
          { x: width/4, z: -height/2 - 20, rotation: 0 },
          { x: width/2 + 20, z: 0, rotation: -Math.PI/2 },
          { x: -width/4, z: height/2 + 20, rotation: Math.PI },
          { x: width/4, z: height/2 + 20, rotation: Math.PI },
          { x: -width/2 - 20, z: 0, rotation: Math.PI/2 }
        );
      }
      
      // Create and add the chairs
      chairPositions.forEach(pos => {
        const chair = createChair(chairColor);
        chair.position.set(pos.x, 0, pos.z);
        chair.rotation.y = pos.rotation;
        group.add(chair);
      });

      // Set the model reference
      models[key] = group;
    });

    tableModelsRef.current = models;
  };

  // Create a chair model
  const createChair = (color) => {
    const chairGroup = new THREE.Group();
    
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(30, 5, 30);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(color),
      roughness: 0.5
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 20;
    seat.castShadow = true;
    chairGroup.add(seat);
    
    // Chair back
    const backGeometry = new THREE.BoxGeometry(30, 30, 5);
    const back = new THREE.Mesh(backGeometry, seatMaterial);
    back.position.set(0, 35, 15);
    back.castShadow = true;
    chairGroup.add(back);
    
    // Chair legs
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4E342E,
      roughness: 0.5
    });
    const legGeometry = new THREE.BoxGeometry(3, 20, 3);
    
    const legPositions = [
      [-12, 10, -12],
      [12, 10, -12],
      [-12, 10, 12],
      [12, 10, 12]
    ];
    
    legPositions.forEach(position => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(...position);
      leg.castShadow = true;
      chairGroup.add(leg);
    });
    
    return chairGroup;
  };

  // Add a new table
  const addTable = (type) => {
    if (!floorPlanRef.current || !sceneRef.current) return;
    
    const template = tableTemplates[type];
    
    const newTable = {
      id: `table-${Date.now()}`,
      x: 0,
      z: 0,
      ...template,
      type,
      number: tables.length + 1,
    };
    
    // Check if new table overlaps with existing tables
    if (!checkOverlap(newTable)) {
      // Clone the model from our template
      const model = tableModelsRef.current[type].clone();
      model.userData = { tableId: newTable.id };
      
      // Add table number display with a simple approach
      // Create a canvas for the table number
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      context.fillStyle = 'white';
      context.font = 'Bold 40px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(newTable.number.toString(), 32, 32);
      
      // Use the canvas as a texture
      const numberTexture = new THREE.CanvasTexture(canvas);
      const numberMaterial = new THREE.MeshBasicMaterial({
        map: numberTexture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      // Create a plane for the number
      const numberGeometry = new THREE.PlaneGeometry(20, 20);
      const numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);
      numberMesh.position.set(0, 40, 0);
      numberMesh.rotation.x = -Math.PI / 2; // Lay flat above the table
      model.add(numberMesh);
      
      // Add to scene
      sceneRef.current.add(model);
      newTable.model = model;
      
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
        Math.pow(table1.x - table2.x, 2) +
        Math.pow(table1.z - table2.z, 2)
      );
      return distance < (table1.width/2 + table2.width/2 + 40); // Adding buffer for chairs
    }
    
    // For rectangular tables or mixed shapes
    // Add a buffer (50px) to account for chairs
    const buffer = 50;
    const halfWidth1 = table1.width / 2;
    const halfHeight1 = table1.height / 2;
    const halfWidth2 = table2.width / 2;
    const halfHeight2 = table2.height / 2;
    
    return !(
      table1.x + halfWidth1 + buffer <= table2.x - halfWidth2 ||
      table2.x + halfWidth2 + buffer <= table1.x - halfWidth1 ||
      table1.z + halfHeight1 + buffer <= table2.z - halfHeight2 ||
      table2.z + halfHeight2 + buffer <= table1.z - halfHeight1
    );
  };

  // Handle table dragging in 3D space
  const handleTableDrag = (e, table) => {
    if (!sceneRef.current || !cameraRef.current || !controlsRef.current) return;
    e.preventDefault();
    
    // Disable orbit controls while dragging
    controlsRef.current.enabled = false;
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Plane for dragging
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
    
    // Initial table position
    const tableModel = table.model;
    const initialTablePos = new THREE.Vector3(table.x, 0, table.z);
    
    const onMouseMove = (moveEvent) => {
      // Update mouse position
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouse.x = ((moveEvent.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((moveEvent.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Raycast to ground plane
      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane, intersection);
      
      // Update position temporarily
      const newX = intersection.x;
      const newZ = intersection.z;
      
      // Check for collisions with other tables
      const tempTable = { ...table, x: newX, z: newZ };
      const wouldOverlap = tables.some(otherTable => {
        if (otherTable.id === table.id) return false;
        return isOverlapping(tempTable, otherTable);
      });
      
      if (!wouldOverlap) {
        // Update model position
        tableModel.position.set(newX, 0, newZ);
      }
    };
    
    const onMouseUp = () => {
      // Enable orbit controls
      controlsRef.current.enabled = true;
      
      // Update table position in state
      setTables(currentTables => {
        return currentTables.map(t => {
          if (t.id === table.id) {
            // Get the final position from the model
            const newX = t.model.position.x;
            const newZ = t.model.position.z;
            return { ...t, x: newX, z: newZ };
          }
          return t;
        });
      });
      
      // Remove event listeners
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Make tables selectable with raycasting
  const handleCanvasClick = (e) => {
    if (!sceneRef.current || !cameraRef.current) return;
    
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    
    // Get all objects in the scene that can be intersected
    const objects = [];
    sceneRef.current.traverse((object) => {
      if (object.userData && object.userData.tableId) {
        objects.push(object);
      }
    });
    
    const intersects = raycaster.intersectObjects(objects, true);
    
    if (intersects.length > 0) {
      // Find the parent table model
      let selectedObject = intersects[0].object;
      while (selectedObject && !selectedObject.userData.tableId) {
        selectedObject = selectedObject.parent;
      }
      
      if (selectedObject) {
        const tableId = selectedObject.userData.tableId;
        const selectedTable = tables.find(table => table.id === tableId);
        
        if (selectedTable) {
          // Start dragging the selected table
          handleTableDrag(e, selectedTable);
        }
      }
    }
  };

  // Remove a table
  const removeTable = (id) => {
    const tableToRemove = tables.find(table => table.id === id);
    if (tableToRemove && tableToRemove.model && sceneRef.current) {
      sceneRef.current.remove(tableToRemove.model);
    }
    
    setTables(currentTables => {
      const updatedTables = currentTables.filter(table => table.id !== id);
      // Update table numbers
      return updatedTables.map((table, index) => ({
        ...table,
        number: index + 1
      }));
    });
  };

  // Clear all tables
  const clearTables = () => {
    if (confirm('Are you sure you want to clear all tables?')) {
      tables.forEach(table => {
        if (table.model && sceneRef.current) {
          sceneRef.current.remove(table.model);
        }
      });
      setTables([]);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            3D Restaurant Table Manager
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
                  <li>Click and drag tables to position them</li>
                  <li>Use mouse wheel to zoom in/out</li>
                  <li>Right-click and drag to rotate view</li>
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
            onClick={handleCanvasClick}
          >
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