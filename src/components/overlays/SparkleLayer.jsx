import React, { useEffect, useRef } from "react";

export default function SparkleLayer() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        window.addEventListener("resize", resize);

        const sparkles = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.2 + 0.05
        }));

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sparkles.forEach(s => {
                s.y -= s.speed;
                if (s.y < 0) {
                    s.y = canvas.height;
                    s.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.fill();
            });

            requestAnimationFrame(loop);
        };

        loop();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none -z-5 sparkle-canvas"
        />
    );
}
