
import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";

export default function FixedScrollSplit() {

  // Curtain state: 0 = fully closed, 1 = fully open
  const [curtain, setCurtain] = useState(0);
  const maxCurtain = 1;
  const minCurtain = 0;
  const curtainStep = 0.04; // how much to open per scroll event
  const touchStartY = useRef(0);
  const curtainLocked = useRef(false); // lock after fully open

  // Handle scroll and touch to open/close curtain
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      setCurtain((prev) => {
        if (curtainLocked.current) return prev;
        let next = prev + (e.deltaY > 0 ? curtainStep : 0); // Only open
        if (next >= maxCurtain) {
          curtainLocked.current = true;
          return maxCurtain;
        }
        return Math.max(minCurtain, Math.min(maxCurtain, next));
      });
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches && e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY.current - touchY;
        touchStartY.current = touchY;
        setCurtain((prev) => {
          if (curtainLocked.current) return prev;
          let next = prev + (deltaY > 0 ? curtainStep : 0); // Only open
          if (next >= maxCurtain) {
            curtainLocked.current = true;
            return maxCurtain;
          }
          return Math.max(minCurtain, Math.min(maxCurtain, next));
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Curtain animation: left and right panels slide out horizontally
  // Sway effect: edge of curtain sways as it opens
  const swayAmplitude = 48; 
  const swayFrequency = 3;  
  const sway = Math.sin(curtain * Math.PI * swayFrequency) * swayAmplitude * (1 - curtain);

  // Uniform speed (linear), curtains move fully off-screen (100vw)
  const leftCurtainSpring = useSpring({
    to: {
      transform: `translateX(-${curtain * 100}vw) skewY(${sway / 16}deg)`
    },
    config: { duration: 1000, easing: t => t }, // linear, slowed by 50%
  });
  const rightCurtainSpring = useSpring({
    to: {
      transform: `translateX(${curtain * 100}vw) skewY(-${sway / 16}deg)`
    },
    config: { duration: 1000, easing: t => t }, // linear, slowed by 50%
  });

  // Fade out intro text as curtain opens
  const textSpring = useSpring({
    opacity: 1 - curtain * 1.2,
    transform: `scale(${1 - curtain * 0.1}) translateY(-${curtain * 30}px)`,
    config: { tension: 120, friction: 20 },
  });

  const curtainBase = {
    background: `
      linear-gradient(90deg, #7a0d0d 0%, #A11515 10%, #7a0d0d 20%, #A11515 30%, #7a0d0d 40%, #A11515 50%, #7a0d0d 60%, #A11515 70%, #7a0d0d 80%, #A11515 90%, #7a0d0d 100%),
      repeating-linear-gradient(90deg, #b92a2a 0 6px, transparent 6px 18px),
      linear-gradient(120deg, #fff3 10%, transparent 60%),
      linear-gradient(60deg, #fff2 5%, transparent 60%)
    `,
    backgroundBlendMode: 'multiply, multiply, lighten, lighten',
    boxShadow: curtain < 1 ? "0 0 40px 10px #6a0d0d88 inset, 0 0 32px 0 #7a1a1a" : "none",
    borderTopLeftRadius: "0 0 80px 80px",
    borderBottomLeftRadius: "80px 80px 0 0",
    borderTopRightRadius: "0 0 80px 80px",
    borderBottomRightRadius: "80px 80px 0 0",
    position: "fixed",
    top: 0,
    height: "100%",
    width: "50vw",
    zIndex: 30,
    overflow: "hidden",
    transition: "box-shadow 0.3s",
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Hero behind */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Hero />
      </div>

      {/* Left Curtain with gold trim and pleats */}
      <animated.div
        className="curtain-left"
        style={{
          ...curtainBase,
          ...leftCurtainSpring,
          left: 0,
          borderRight: "8px solid gold",
          borderTopLeftRadius: "0 0 80px 80px",
          borderBottomLeftRadius: "80px 80px 0 0",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: curtain < 1 ? "8px 0 32px 0 #7a1a1a, 0 0 40px 10px #6a0d0d88 inset" : "none",
          // Sway edge with clip-path
          clipPath: `polygon(0 0, calc(100% - ${Math.abs(sway)}px) 0, 100% 50%, calc(100% - ${Math.abs(sway)}px) 100%, 0 100%)`,
        }}
      >
        {/* Subtle velour/fabric texture overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.10,
          background: `repeating-linear-gradient(90deg, #fff1 0 2px, transparent 2px 12px), repeating-linear-gradient(180deg, #fff1 0 1px, transparent 1px 12px)`,
          pointerEvents: "none"
        }} />
      </animated.div>

      {/* Right Curtain with gold trim and pleats */}
      <animated.div
        className="curtain-right"
        style={{
          ...curtainBase,
          ...rightCurtainSpring,
          right: 0,
          left: "auto",
          borderLeft: "8px solid gold",
          borderTopRightRadius: "0 0 80px 80px",
          borderBottomRightRadius: "80px 80px 0 0",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          boxShadow: curtain < 1 ? "-8px 0 32px 0 #7a1a1a, 0 0 40px 10px #6a0d0d88 inset" : "none",
          // Sway edge with clip-path
          clipPath: `polygon(${Math.abs(sway)}px 0, 100% 0, 100% 100%, ${Math.abs(sway)}px 100%, 0 50%)`,
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.10,
          background: `repeating-linear-gradient(90deg, #fff1 0 2px, transparent 2px 12px), repeating-linear-gradient(180deg, #fff1 0 1px, transparent 1px 12px)`,
          pointerEvents: "none"
        }} />
      </animated.div>
      {/* Stage shadow as curtains open */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: `${Math.max(0, 100 - curtain * 100)}vw`,
          height: "100%",
          transform: "translateX(-50%)",
          zIndex: 29,
          pointerEvents: "none",
          opacity: 0.18 * (1 - curtain),
          background: "radial-gradient(ellipse at center, #000 0%, transparent 80%)"
        }}
      />
      {/* Centered intro text and button */}
      <animated.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-6"
        style={textSpring}
      >
        <div className="flex flex-col items-center">
            <h1 className="text-amber-400 [text-shadow:_2px_2px_0_#000,_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000] text-5xl sm:text-4xl md:text-5xl font-[Great_Vibes] text-center">
                Scroll To Reveal
            </h1>
    </div>
      </animated.div>
    </div>
  );
}
