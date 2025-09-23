import React, { useState, useEffect } from 'react';
import Candy from "../../assets/images/fireworks.svg";

const SimpleCarnivalCursor = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    setIsMobile('ontouchstart' in window);
    
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('button, a, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <>
      {/* Hide default cursor completely */}
      <style jsx>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
      
      <div className="cursor-none">
        {children}
      </div>

      {/* Custom animated candy cursor - made bigger */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x - 24, // Center the bigger cursor
          top: mousePos.y - 24,
          transform: `scale(${isClicking ? 0.8 : isHovering ? 1.3 : 1}) rotate(${isClicking ? '15deg' : '0deg'})`,
        }}
      >
        <img
          src={Candy}
          alt=""
          className={`
            w-15 h-15 
            transition-all duration-200 ease-out
            ${isHovering ? 'animate-pulse' : 'animate-bounce'}
            drop-shadow-[0_0_10px_rgba(255,100,255,1.0)]
            drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]
            drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]
            ${isClicking ? 'brightness-150 drop-shadow-[0_0_25px_rgba(255,200,0,0.9)]' : ''}
          `}
          style={{
            filter: `
              drop-shadow(0 0 10px rgba(255, 100, 255, 0.7))
              drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))
              drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))
              ${isClicking ? 'brightness(1.5) drop-shadow(0 0 25px rgba(255, 200, 0, 0.9))' : ''}
              ${isHovering ? 'hue-rotate(30deg) saturate(1.3)' : ''}
            `
          }}
        />
      </div>
    </>
  );
};

export default SimpleCarnivalCursor;