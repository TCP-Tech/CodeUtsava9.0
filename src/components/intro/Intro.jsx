import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";

export default function FixedScrollSplit({ onCurtainProgress }) {

    // Curtain state: 0 = fully closed, 1 = fully open
    const [curtain, setCurtain] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const curtainLocked = useRef(false); // lock after fully open

    // Button click handler to start curtain animation
    const handleEnterClick = () => {
        if (isAnimating || curtainLocked.current) return;
        
        setIsAnimating(true);
        setShowButton(false);
        
        // Animate curtain opening over 2 seconds
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setCurtain(progress);
            
            // Call progress callback
            if (onCurtainProgress) {
                onCurtainProgress(progress);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                curtainLocked.current = true;
                setIsAnimating(false);
            }
        };
        
        requestAnimationFrame(animate);
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
        <div className="relative w-screen h-screen overflow-hidden bg-black z-[1000]">
            {/* Hero behind */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Hero />
            </div>

            <animated.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-6"
                style={textSpring}
            >

                {/* Title and Enter Button */}
                {showButton && (
                    <div className="flex flex-col items-center space-y-8 z-50">
                        {/* Title */}
                        <h1 className="text-6xl md:text-8xl font-rye text-white text-center tracking-wide text-stroke-strong">
                            CODEUTSAVA 9.0
                        </h1>
                        
                        {/* Enhanced Carnival Enter Button */}
                        <button
                            onClick={handleEnterClick}
                            disabled={isAnimating}
                            className="relative group px-12 py-6 text-white font-rye text-2xl font-bold rounded-2xl 
                                     transform transition-all duration-500 ease-out
                                     hover:scale-110 hover:rotate-1 active:scale-95
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0
                                     overflow-hidden border-4 border-yellow-400"
                            style={{
                                background: `linear-gradient(135deg, 
                                    #ff6b35 0%, #ff8c42 15%, #ff6b35 30%, 
                                    #e74c3c 45%, #d63031 60%, #ff6b35 75%, 
                                    #ff8c42 90%, #ff6b35 100%)`,
                                backgroundSize: '300% 300%',
                                animation: isAnimating ? 'carnivalShimmer 2s ease-in-out infinite' : 'carnivalShimmer 4s ease-in-out infinite',
                                boxShadow: `
                                    0 0 30px rgba(255, 107, 53, 0.6),
                                    0 0 60px rgba(255, 140, 66, 0.4),
                                    inset 0 2px 0 rgba(255, 255, 255, 0.3),
                                    inset 0 -2px 0 rgba(0, 0, 0, 0.3)
                                `,
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            {/* Ticket perforations effect */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-repeat-x opacity-30"
                                 style={{
                                     backgroundImage: `radial-gradient(circle, transparent 2px, rgba(255,255,255,0.3) 2px)`,
                                     backgroundSize: '8px 8px'
                                 }} />
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-repeat-x opacity-30"
                                 style={{
                                     backgroundImage: `radial-gradient(circle, transparent 2px, rgba(255,255,255,0.3) 2px)`,
                                     backgroundSize: '8px 8px'
                                 }} />
                            
                            {/* Sparkle effects */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                                <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full animate-ping" />
                                <div className="absolute bottom-3 left-8 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse" 
                                     style={{ animationDelay: '1s' }} />
                                <div className="absolute bottom-4 right-4 w-1 h-1 bg-orange-200 rounded-full animate-ping" 
                                     style={{ animationDelay: '0.5s' }} />
                            </div>
                            
                            {/* Button text with carnival styling */}
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                {isAnimating ? (
                                    <>
                                        <span className="animate-spin">🎪</span>
                                        <span>ENTERING THE CARNIVAL...</span>
                                        <span className="animate-bounce">🎭</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="animate-pulse">🎪</span>
                                        <span>ENTER THE CARNIVAL</span>
                                        <span className="animate-bounce">🎭</span>
                                    </>
                                )}
                            </span>
                            
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 
                                          group-hover:opacity-20 group-hover:animate-sweep transition-opacity duration-300" />
                        </button>
                    </div>
                )}

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

        </div>
    );
}