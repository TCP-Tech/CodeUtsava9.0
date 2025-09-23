import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";
import ropeImg from "../../assets/images/rope.png";

export default function FixedScrollSplit() {

    // Curtain state: 0 = fully closed, 1 = fully open
    // Curtain state: 0 = fully closed, 1 = fully open
    const [curtain, setCurtain] = useState(0);
    const maxCurtain = 1;
    const minCurtain = 0;
    const curtainLocked = useRef(false); // lock after fully open

    // Rope drag state
    const [ropeY, setRopeY] = useState(0); // px from top
    const ropeStartY = useRef(null);
    const dragStartY = useRef(null);
    const maxRopePull = 300; // px to fully open
    const curtainStep = 0.04; // how much to open per scroll event
    const touchStartY = useRef(0);

    // Drag handlers for the rope
    const handleRopeDragStart = (e) => {
        if (curtainLocked.current) return;
        if (e.type === "touchstart") {
            dragStartY.current = e.touches[0].clientY;
        } else {
            dragStartY.current = e.clientY;
        }
        ropeStartY.current = ropeY;
        document.addEventListener("mousemove", handleRopeDragMove);
        document.addEventListener("mouseup", handleRopeDragEnd);
        document.addEventListener("touchmove", handleRopeDragMove, { passive: false });
        document.addEventListener("touchend", handleRopeDragEnd);
    };

    const handleRopeDragMove = (e) => {
        if (curtainLocked.current) return;
        let clientY;
        if (e.type === "touchmove") {
            clientY = e.touches[0].clientY;
        } else {
            clientY = e.clientY;
        }
        let delta = clientY - dragStartY.current;
        let newY = Math.max(0, Math.min(maxRopePull, ropeStartY.current + delta));
        setRopeY(newY);
        setCurtain(newY / maxRopePull);
        if (newY >= maxRopePull) {
            curtainLocked.current = true;
        }
        e.preventDefault && e.preventDefault();
    };

    const handleRopeDragEnd = () => {
        document.removeEventListener("mousemove", handleRopeDragMove);
        document.removeEventListener("mouseup", handleRopeDragEnd);
        document.removeEventListener("touchmove", handleRopeDragMove);
        document.removeEventListener("touchend", handleRopeDragEnd);
        // Snap rope to bottom if fully open
        if (ropeY >= maxRopePull) setRopeY(maxRopePull);
    };

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

            <animated.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-6"
                style={textSpring}
            >

                {/* Rope puller */}
                <div
                    style={{
                        position: "relative",
                        width: 64,
                        height: maxRopePull + 80,
                        marginTop: -600,
                        userSelect: "none",
                        zIndex: 50,
                    }}
                    className="enable-selection-dragging"
                >
                    <img
                        src={ropeImg}
                        alt="Pull the rope to open the curtain"
                        className="rope-img"
                        draggable={false}
                        style={{
                            position: "absolute",
                            left: "50%",                         // always start in the center
                            transform: "translateX(-50%) scale(8)", // keep scaling here
                            top: ropeY,
                            width: 64,
                            height: 80,
                            cursor: curtainLocked.current ? "default" : "grab",
                            transition: curtainLocked.current ? "top 0.3s" : "none",
                            zIndex: 51,
                            filter: curtainLocked.current ? "grayscale(0.7)" : "none",
                        }}
                        onMouseDown={handleRopeDragStart}
                        onTouchStart={handleRopeDragStart}
                    />

                </div>
                <div
                    className="text-black text-3xl font-arcade italic uppercase tracking-wider select-none text-gradient bg-clip-text text-transparent transition-opacity duration-300 ease-in-out"
                    style={{ opacity: curtainLocked.current ? 0 : 1, WebkitTextStroke: '1px black', position: 'relative', top: '180px', left: '20px' }}
                >
                    Pull the rope to open
                    <style>{`.text-gradient{background-image:linear-gradient(90deg,#FFD54F,#FF8F00);background-size:200% 100%;animation:shimmer 3s linear infinite}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
                </div>

            </animated.div>

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
            <style>{`
        /* 📱 Mobile overrides */
        @media (max-width: 768px) {
            .rope-img {
            left: 50% !important;
            margin-top:90px;
            transform: translateX(-50%) scale(7) !important;
            width: 48px !important;
            height: 64px !important;
            }
            .text-gradient {
            position: relative !important;
            top: 180px !important;
            left: 0 !important;
            text-align: center !important;
            width: 100% !important;
            font-size: 1.25rem !important;
            }
        }

        @media (max-width: 480px) {
            .rope-img {
            top: 80px !important;
            transform: translateX(-50%) scale(3.2) !important;
            width: 40px !important;
            height: 54px !important;
            }
            .text-gradient {
            font-size: 1rem !important;
            top: 150px !important;
            }
        }
        `}</style>
        </div>
    );
}