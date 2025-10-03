import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";

export default function FixedScrollSplit({ onCurtainProgress }) {

    // Curtain state: -1 = no curtains (hidden), 0 = closed (covering screen), 1 = open (off-screen)
    const [curtain, setCurtain] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const curtainLocked = useRef(false);

    // Handle responsive sizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Button click handler: bring curtains in to close, then open to reveal hero
    const handleEnterClick = () => {
        if (isAnimating || curtainLocked.current) return;
        
        setIsAnimating(true);
        setShowButton(false);
        
        // Phase 1: Curtains come in and close (-1 to 0)
        const closeDuration = 1000; 
        const closeStartTime = Date.now();
        
        const animateClose = () => {
            const elapsed = Date.now() - closeStartTime;
            const progress = Math.min(elapsed / closeDuration, 1);
            
            setCurtain(-1 + progress); // -1 to 0 (no curtains to closed)
            
            if (progress < 1) {
                requestAnimationFrame(animateClose);
            } else {
                // Phase 2: Curtains open (0 to 1)
                setTimeout(() => {
                    const openDuration = 2000;
                    const openStartTime = Date.now();
                    
                    const animateOpen = () => {
                        const elapsed = Date.now() - openStartTime;
                        const progress = Math.min(elapsed / openDuration, 1);
                        
                        setCurtain(progress); // 0 to 1 (closed to open)
                        
                        if (onCurtainProgress) {
                            onCurtainProgress(progress);
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateOpen);
                        } else {
                            curtainLocked.current = true;
                            setIsAnimating(false);
                        }
                    };
                    
                    requestAnimationFrame(animateOpen);
                }, 200);
            }
        };
        
        requestAnimationFrame(animateClose);
    };



    // Curtain animation with three states:
    // -1: No curtains (hidden off-screen)
    // 0: Curtains closed (at center, covering screen)
    // 1: Curtains open (off-screen on opposite sides)
    
    const swayAmplitude = isMobile ? 24 : 48;
    const swayFrequency = 3;
    
    // Calculate positions based on curtain state
    let leftPos, rightPos;
    
    if (curtain < 0) {
        // State -1 to 0: Curtains coming in from off-screen to center
        const progress = curtain + 1; // 0 to 1
        leftPos = -100 + (progress * 270); 
        rightPos = 100 - (progress * 270);  
    } else {
        // State 0 to 1: Curtains opening from center to off-screen
        leftPos = -(curtain * 100); // 0vw to -100vw
        rightPos = curtain * 100;    // 0vw to 100vw
    }
    
    const sway = Math.sin(Math.abs(curtain) * Math.PI * swayFrequency) * swayAmplitude * (curtain >= 0 ? (1 - curtain) : (curtain + 1));
    
    // Responsive border width and radius
    const borderWidth = isMobile ? "4px" : "8px";
    const borderRadius = isMobile ? "40px" : "80px";

    const leftCurtainSpring = useSpring({
        to: {
            transform: `translateX(${leftPos}vw) skewY(${sway / 16}deg)`
        },
        config: { duration: 1000, easing: t => t },
    });
    const rightCurtainSpring = useSpring({
        to: {
            transform: `translateX(${rightPos}vw) skewY(-${sway / 16}deg)`
        },
        config: { duration: 1000, easing: t => t },
    });

    // Fade title/button - visible only when curtain = -1 (no curtains visible)
    const textSpring = useSpring({
        opacity: (curtain === -1 && showButton) ? 1 : 0,
        transform: `scale(${(curtain === -1 && showButton) ? 1 : 0.9}) translateY(${(curtain === -1 && showButton) ? 0 : -30}px)`,
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
        boxShadow: (curtain >= 0 && curtain < 1) ? "0 0 40px 10px #6a0d0d88 inset, 0 0 32px 0 #7a1a1a" : "none",
        borderTopLeftRadius: `0 0 ${borderRadius} ${borderRadius}`,
        borderBottomLeftRadius: `${borderRadius} ${borderRadius} 0 0`,
        borderTopRightRadius: `0 0 ${borderRadius} ${borderRadius}`,
        borderBottomRightRadius: `${borderRadius} ${borderRadius} 0 0`,
        position: "fixed",
        top: 0,
        height: "100%",
        width: "50vw",
        zIndex: 30,
        overflow: "hidden",
        transition: "box-shadow 0.3s, opacity 0.3s",
        // Hide curtains initially when curtain = -1
        opacity: curtain === -1 ? 0 : 1,
        pointerEvents: curtain === -1 ? 'none' : 'auto',
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
                    <div className="flex flex-col items-center space-y-4 md:space-y-8 z-50">
                        {/* Title */}
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-rye text-white text-center tracking-wide text-stroke-strong px-4">
                            CODEUTSAVA 9.0
                        </h1>
                        
                        {/* Enhanced Carnival Enter Button */}
                        <button
                            onClick={handleEnterClick}
                            disabled={isAnimating}
                            className="relative group px-8 py-4 md:px-12 md:py-6 text-white font-rye text-lg md:text-2xl font-bold rounded-2xl 
                                     transform transition-all duration-500 ease-out
                                     hover:scale-110 hover:rotate-1 active:scale-95
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0
                                     overflow-hidden border-2 md:border-4 border-yellow-400"
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
                                        <span>ENTERING...</span>
                                        <span className="animate-bounce">🎭</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="animate-pulse">🎪</span>
                                        <span>ENTER</span>
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
                    borderRight: `${borderWidth} solid gold`,
                    borderTopLeftRadius: `0 0 ${borderRadius} ${borderRadius}`,
                    borderBottomLeftRadius: `${borderRadius} ${borderRadius} 0 0`,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    boxShadow: (curtain >= 0 && curtain < 1) ? `${isMobile ? "4px" : "8px"} 0 32px 0 #7a1a1a, 0 0 40px 10px #6a0d0d88 inset` : "none",
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
                    borderLeft: `${borderWidth} solid gold`,
                    borderTopRightRadius: `0 0 ${borderRadius} ${borderRadius}`,
                    borderBottomRightRadius: `${borderRadius} ${borderRadius} 0 0`,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: (curtain >= 0 && curtain < 1) ? `${isMobile ? "-4px" : "-8px"} 0 32px 0 #7a1a1a, 0 0 40px 10px #6a0d0d88 inset` : "none",
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