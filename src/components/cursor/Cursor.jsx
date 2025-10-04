import React, { useEffect, useRef, useState } from 'react';

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = Math.random() * 2 + 1;
    this.alpha = 1;
    this.size = Math.random() * 2 + 2;
    this.hue = Math.random() * 40 + 20;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

const SparkCursor = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const sparksRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add sparks near cursor
      sparksRef.current.push(new Spark(mouseRef.current.x, mouseRef.current.y));

      // Draw main cursor spark
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "yellow";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update & draw sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const spark = sparksRef.current[i];
        spark.update();
        spark.draw(ctx);
        if (spark.alpha <= 0) {
          sparksRef.current.splice(i, 1);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-fullnoverflow-hidden cursor-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      

    </div>
  );
};

export default SparkCursor;