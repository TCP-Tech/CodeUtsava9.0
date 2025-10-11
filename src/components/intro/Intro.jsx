import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";
import './intro.css'; // Import the new CSS for the button
import cuimg from '../../assets/images/codeutsavaIntroTitle.png';
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
            } 
            else {
                // Phase 2: Curtains open (0 to 1)
                setTimeout(() => {
                    const openDuration = 1000;
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
                }, 1500);
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
        leftPos = -50 + (progress * 50);
        rightPos = 50 - (progress * 50);
    } else {
        // State 0 to 1: Curtains opening from center to off-screen
        leftPos = -(curtain * 100); // 0vw to 50vw
        rightPos = curtain * 100;   // 0vw to 50vw
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
                        <img src={cuimg} alt="CodeUtsava" className="w-64 md:w-96" />

                        {/* Old Website Enter Button */}
                        <div
                            onClick={handleEnterClick}
                            className={`intro-button ${isAnimating ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <div className="border">
                                <div className="left-plane"></div>
                                <div className="right-plane"></div>
                            </div>
                            <div className="text">Enter</div>
                        </div>
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