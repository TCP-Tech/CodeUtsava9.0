// Cursor.jsx
import React, { useState, useEffect } from 'react';
import Candy from "../../assets/images/fireworks.svg";

const SimpleCarnivalCursor = ({ children }) => {
    // Initialize cursor at center of screen
    const [mousePos, setMousePos] = useState({ 
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
    });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Better mobile / coarse pointer detection
        const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        setIsMobile(coarse || ('ontouchstart' in window));
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            // highlight over interactive controls only
            const target = e.target instanceof Element ? e.target : null;
            const isInteractive = target?.closest?.(
                'button, a, input, textarea, select, [role="button"]'
            );
            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
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
        // On touch devices, just render children normally (no custom cursor)
        return <div>{children}</div>;
    }

    return (
        <>
            {/* Hide the default cursor across the app while this component is mounted */}
            <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

            <div className="cursor-none">
                {children}
            </div>

            {/* Custom animated candy cursor */}
            <div
                className="fixed pointer-events-none transition-transform duration-100 ease-out"
                style={{
                    left: mousePos.x - 12, // adjust for pointer tip position
                    top: mousePos.y - 8,   // adjust for pointer tip position
                    transform: `scale(${isClicking ? 0.8 : isHovering ? 1.3 : 1}) rotate(${isClicking ? '15deg' : '0deg'})`,
                    zIndex: 999999999, // Extremely high z-index to ensure it's always on top
                    position: 'fixed', // Ensure it's always in the viewport
                    isolation: 'isolate', // Create new stacking context
                }}
                aria-hidden="true"
            >
                <img
                    src={Candy}
                    alt=""
                    className={`
            w-15 h-15
            transition-all duration-200 ease-out
            ${isHovering ? 'animate-pulse' : 'animate-bounce'}
            cursor-glow
          `}
                    style={{
                        // add state-driven effects on top of the base glow via CSS var
                        ['--cursor-extra']: isClicking
                            ? 'brightness(1.5) drop-shadow(0 0 25px rgba(255, 200, 0, 0.9))'
                            : (isHovering ? 'hue-rotate(30deg) saturate(1.3)' : 'none'),
                    }}
                />
            </div>
        </>
    );
};

export default SimpleCarnivalCursor;
