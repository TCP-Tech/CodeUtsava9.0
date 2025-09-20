import React, { useEffect, useRef } from "react";

export default function Fireworks() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = Math.max(1, Math.round(rect.width * DPR));
            canvas.height = Math.max(1, Math.round(rect.height * DPR));
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const rand = (min, max) => Math.random() * (max - min) + min;

        class Particle {
            constructor(x, y, hue) {
                this.x = x;
                this.y = y;
                this.vx = rand(-1.8, 1.8);
                this.vy = rand(-3.2, -0.9);
                this.alpha = 1;
                this.life = rand(80, 130);
                this.age = 0;
                this.hue = hue;
                this.size = rand(1.0, 2.2);
                this.gravity = 0.025;
                this.friction = 0.985;
            }
            step() {
                this.age++;
                this.vx *= this.friction;
                this.vy = this.vy * this.friction + this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.alpha = Math.max(0, 1 - this.age / this.life);
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
                ctx.fill();
            }
            get dead() { return this.alpha <= 0.02; }
        }

        const particles = [];
        const MAX_PARTICLES = 2000;

        const spawnBurst = (cx, cy) => {
            const hue = Math.floor(rand(0, 360));
            const count = 36;
            for (let i = 0; i < count; i++) particles.push(new Particle(cx, cy, hue));
            if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
        };

        const loop = () => {
            rafRef.current = requestAnimationFrame(loop);
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0,0,0,0.40)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "lighter";
            const { width, height } = canvas.getBoundingClientRect();
            if (Math.random() < 0.025) spawnBurst(rand(40, width - 40), rand(40, height * 0.65));
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.step();
                p.draw(ctx);
                if (p.dead) particles.splice(i, 1);
            }
        };
        loop();

        const onClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spawnBurst(x, y);
        };
        window.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("click", onClick);
            ro.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}
