import React, { useState, useEffect, useRef } from "react";

const SimpleCarnivalCursor = ({ children }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [sparks, setSparks] = useState([]);
    const sparksRef = useRef([]);
    const animationRef = useRef();

    class Spark {
        constructor(x, y) {
            this.id = Math.random();
            this.x = x + (Math.random() - 0.5) * 20;
            this.y = y + (Math.random() - 0.5) * 20;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = (Math.random() - 0.5) * 3;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.02;
            this.size = Math.random() * 3 + 2;
            this.hue = Math.random() * 60 + 15; // Yellow to orange range
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.vx *= 0.99;
            this.vy *= 0.99;
        }
    }

    useEffect(() => {
        // Check if it's a mobile device
        setIsMobile("ontouchstart" in window);

        if (isMobile) return;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Add sparks on mouse move
            if (Math.random() < 0.7) {
                sparksRef.current.push(new Spark(e.clientX, e.clientY));
            }
        };

        const handleMouseOver = (e) => {
            const isInteractive = e.target.closest(
                'button, a, input, textarea, select, [role="button"]'
            );
            setIsHovering(!!isInteractive);
        };

        const handleMouseDown = () => {
            setIsClicking(true);
            // Add more sparks on click
            for (let i = 0; i < 8; i++) {
                sparksRef.current.push(new Spark(mousePos.x, mousePos.y));
            }
        };

        const handleMouseUp = () => setIsClicking(false);

        const animateSparks = () => {
            sparksRef.current = sparksRef.current.filter((spark) => {
                spark.update();
                return spark.life > 0;
            });

            setSparks([...sparksRef.current]);
            animationRef.current = requestAnimationFrame(animateSparks);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        animateSparks();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isMobile, mousePos.x, mousePos.y]);

    if (isMobile) {
        return <div>{children}</div>;
    }

    return (
        <>
            {/* Hide default cursor completely */}
            <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

            <div className="cursor-none">{children}</div>

            {/* Sparks */}
            {sparks.map((spark) => (
                <div
                    key={spark.id}
                    className="fixed pointer-events-none z-[9998] rounded-full"
                    style={{
                        left: spark.x - spark.size / 2,
                        top: spark.y - spark.size / 2,
                        width: spark.size,
                        height: spark.size,
                        opacity: spark.life,
                        background: `hsl(${spark.hue}, 100%, 60%)`,
                        boxShadow: `0 0 ${spark.size * 2}px hsl(${
                            spark.hue
                        }, 100%, 60%)`,
                        transform: `scale(${spark.life})`,
                    }}
                />
            ))}

            {/* Main cursor with glow effect */}
            <div
                className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
                style={{
                    left: mousePos.x - 8,
                    top: mousePos.y - 8,
                    transform: `scale(${
                        isClicking ? 1.5 : isHovering ? 1.2 : 1
                    })`,
                }}
            >
                <div
                    className={`
            w-4 h-4 rounded-full
            transition-all duration-200 ease-out
            ${isHovering ? "animate-pulse" : ""}
            ${isClicking ? "animate-ping" : ""}
          `}
                    style={{
                        background: isClicking
                            ? "radial-gradient(circle, #ffffff 0%, #ffff00 50%, #ff6600 100%)"
                            : isHovering
                            ? "radial-gradient(circle, #ffffff 0%, #ffaa00 70%, #ff4400 100%)"
                            : "radial-gradient(circle, #ffffff 0%, #ffdd00 60%, #ff8800 100%)",
                        boxShadow: `
              0 0 20px rgba(255, 255, 255, 0.8),
              0 0 40px rgba(255, 200, 0, 0.6),
              0 0 60px rgba(255, 100, 0, 0.4)
              ${isClicking ? ", 0 0 80px rgba(255, 255, 255, 0.9)" : ""}
            `,
                    }}
                />
            </div>
        </>
    );
};

export default SimpleCarnivalCursor;
