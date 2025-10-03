import React, { useRef, useEffect } from "react";
import launchSoundFile from "../../assets/audio/firework-launch.mp3";
import burstSoundFile from "../../assets/audio/firework-burst.mp3";

const Fireworks = ({ autoLaunch = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 🎵 Load sounds
    const launchSound = new Audio(launchSoundFile);
    const burstSound = new Audio(burstSoundFile);

    // prevent overlapping playback (clone for multiple)
    const playSound = (soundFile) => {
      const sound = new Audio(soundFile);
      sound.volume = 0.5; // adjust volume if needed
      sound.play().catch(() => {}); // prevent errors on autoplay restrictions
    };

    // === Firework settings ===
    const FIREWORK_MIN_VY = -12;
    const FIREWORK_RANDOM_VY = 3;
    const FIREWORK_GRAVITY = 0.2;
    const FIREWORK_OSC_AMP = 5;
    const FIREWORK_OSC_FREQ = 2.5;

    const PARTICLE_MIN_COUNT = 21;
    const PARTICLE_RANDOM_COUNT = 7;
    const PARTICLE_MIN_SPEED = 3;
    const PARTICLE_RANDOM_SPEED = 5;

    const PARTICLE_GRAVITY = 0.05;
    const PARTICLE_VEL_DAMP = 0.98;
    const PARTICLE_MIN_DECAY = 0.01;
    const PARTICLE_RANDOM_DECAY = 0.015;

    const FIREWORK_COLOR = "white";
    const FIREWORK_RADIUS = 3;
    const PARTICLE_RADIUS = 3.5;
    const PARTICLE_SAT = 100;
    const PARTICLE_LIGHT = 70;
    const PARTICLE_SHADOW = 25;
    const FIREWORK_SHADOW = 15;

    const AUTO_LAUNCH_INTERVAL = 2000;

    let fireworks = [];
    let particles = [];
    let interval = null;

    class Firework {
      constructor(x) {
        this.xStart = x;
        this.x = x;
        this.y = canvas.height;
        this.vy = FIREWORK_MIN_VY - Math.random() * FIREWORK_RANDOM_VY;
        this.startTime = performance.now();
        this.exploded = false;
        this.targetY =
          Math.random() * (canvas.height * 0.5) + canvas.height * 0.2;

        // 🎵 Play launch sound
        // playSound(launchSoundFile);
      }

      update() {
        this.y += this.vy;
        this.vy += FIREWORK_GRAVITY;

        const t = (performance.now() - this.startTime) / 1000;
        this.x =
          this.xStart +
          Math.sin(t * FIREWORK_OSC_FREQ * Math.PI * 2) * FIREWORK_OSC_AMP;

        if (!this.exploded && (this.y <= this.targetY || this.vy >= 0)) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;

        // 🎵 Play burst sound
        playSound(burstSoundFile);

        const count =
          PARTICLE_MIN_COUNT + Math.random() * PARTICLE_RANDOM_COUNT;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed =
            Math.random() * PARTICLE_RANDOM_SPEED + PARTICLE_MIN_SPEED;
          particles.push(
            new Particle(
              this.x,
              this.y,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed
            )
          );
        }
      }

      draw(ctx) {
        if (!this.exploded) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, FIREWORK_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = FIREWORK_COLOR;
          ctx.shadowBlur = FIREWORK_SHADOW;
          ctx.shadowColor = FIREWORK_COLOR;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    class Particle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 1;
        this.decay =
          PARTICLE_MIN_DECAY + Math.random() * PARTICLE_RANDOM_DECAY;
        this.color = `hsl(${Math.random() * 360}, ${PARTICLE_SAT}%, ${PARTICLE_LIGHT}%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += PARTICLE_GRAVITY;
        this.vx *= PARTICLE_VEL_DAMP;
        this.vy *= PARTICLE_VEL_DAMP;
        this.alpha -= this.decay;
      }

      draw(ctx) {
        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = PARTICLE_SHADOW;
        ctx.shadowColor = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_RADIUS / 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const f = fireworks[i];
        f.update();
        f.draw(ctx);
        if (f.exploded) fireworks.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e) => {
      fireworks.push(new Firework(e.clientX));
    };
    window.addEventListener("click", handleClick);

    if (autoLaunch) {
      interval = setInterval(() => {
        fireworks.push(new Firework(Math.random() * canvas.width));
      }, AUTO_LAUNCH_INTERVAL);
    }

    animate();

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
    };
  }, [autoLaunch]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default Fireworks;
