import React, { useEffect, useRef, useState } from 'react';

const PermanentFoodSmoke = ({ intensity = 3, position = 'top-center' }) => {
  const [particles, setParticles] = useState([]);
  const intervalRef = useRef(null);
  
  // Initialize and maintain smoke effect
  useEffect(() => {
    // Create initial batch of particles
    createInitialParticles();
    
    // Set up continuous particle generation
    intervalRef.current = setInterval(() => {
      addParticles();
    }, 300); // Create particles frequently for constant effect
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Create initial batch of particles
  const createInitialParticles = () => {
    const initialBatch = [];
    
    // Create a larger initial batch
    for (let i = 0; i < intensity * 5; i++) {
      initialBatch.push(createParticleObject(i < intensity));
    }
    
    setParticles(initialBatch);
  };
  
  // Add new particles periodically
  const addParticles = () => {
    const newParticles = [];
    
    // Regular particles
    for (let i = 0; i < intensity; i++) {
      newParticles.push(createParticleObject(false));
    }
    
    // Central particles less frequently
    if (Math.random() < 0.5) {
      newParticles.push(createParticleObject(true));
    }
    
    setParticles(current => [...current, ...newParticles]);
  };
  
  // Create a single particle object
  const createParticleObject = (isCentral = false) => {
    const id = `smoke-${Date.now()}-${Math.random()}`;
    let particle;
    
    if (isCentral) {
      // Central particles (larger, slower)
      const size = Math.random() * 25 + 15; // 15-40px
      const duration = Math.random() * 2 + 4; // 4-6s
      
      particle = {
        id,
        size,
        left: 45 + Math.random() * 10, // Centered
        duration,
        opacity: 0.7 + Math.random() * 0.3,
        swayDuration: Math.random() * 4 + 3,
        isCentral: true
      };
    } else {
      // Regular particles
      const distanceFromCenter = Math.random();
      const size = Math.random() * 15 + (distanceFromCenter < 0.3 ? 20 : 10);
      const duration = Math.random() * 3 + 3; // 3-6s
      
      // Distribute with concentration in middle
      const spreadFactor = 70 - (Math.random() * 40);
      const centerOffset = 50 - spreadFactor/2;
      
      particle = {
        id,
        size,
        left: centerOffset + Math.random() * spreadFactor,
        duration,
        opacity: 0.5 + Math.random() * 0.5,
        swayDuration: Math.random() * 3 + 2,
        isCentral: false
      };
    }
    
    // Schedule removal after animation completes
    setTimeout(() => {
      setParticles(current => current.filter(p => p.id !== id));
    }, particle.duration * 1000 + 200);
    
    return particle;
  };
  
  // Position styles
  const getPositionStyle = () => {
    switch (position) {
      case 'top-center':
        return { top: '-40px', left: 0, right: 0 };
      case 'top-left':
        return { top: '-40px', left: '-20px' };
      case 'top-right':
        return { top: '-40px', right: '-20px' };
      default:
        return { top: '-40px', left: 0, right: 0 };
    }
  };
  
  return (
    <div className="absolute w-full h-20 flex justify-center pointer-events-none overflow-hidden" style={getPositionStyle()}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            opacity: particle.opacity,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(3px)',
            animation: `float-up ${particle.duration}s ease-out forwards, sway ${particle.swayDuration}s ease-in-out infinite`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: ${props => props.opacity || 0.9};
          }
          25% {
            transform: translateY(-25px) scale(1.1) rotate(5deg);
          }
          50% {
            transform: translateY(-50px) scale(1.2) rotate(-5deg);
            opacity: ${props => (props.opacity || 0.9) * 0.7};
          }
          75% {
            transform: translateY(-75px) scale(1.3) rotate(5deg);
            opacity: ${props => (props.opacity || 0.9) * 0.4};
          }
          100% {
            transform: translateY(-120px) scale(1.5) rotate(0deg);
            opacity: 0;
          }
        }
        
        @keyframes sway {
          0% { transform: translateX(0); }
          25% { transform: translateX(3px); }
          50% { transform: translateX(-3px); }
          75% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// Simple demo component showing just the smoke over a food item
const FoodWithSmoke = () => {
  return (
    <div className="relative w-40 h-40 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
      <span className="text-amber-800 font-medium">Hot Food</span>
      <PermanentFoodSmoke intensity={3} />
    </div>
  );
};

export default PermanentFoodSmoke;