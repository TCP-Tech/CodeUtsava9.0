import React, { useEffect, useRef } from "react";
import bg from "../../assets/images/bg.png";
import SocialRail from "../overlays/SocialRail.jsx";
import RightRail from "../overlays/RightRail.jsx";
import BottomCTAs from "../overlays/BottomCTAs.jsx";
import Fireworks from "../overlays/Fireworks.jsx";
import SparkleLayer from "../overlays/SparkleLayer.jsx";

export default function Hero() {
    const bgRef = useRef(null);
    const overlayRef = useRef(null);

    // Smooth parallax
    useEffect(() => {
        let raf = 0;
        const speed = 0.2;
        const overlaySpeed = 0.1;

        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (bgRef.current) {
                    bgRef.current.style.transform = `translate3d(0, ${-scrollY * speed}px, 0)`;
                }
                if (overlayRef.current) {
                    overlayRef.current.style.transform = `translate3d(0, ${-scrollY * overlaySpeed}px, 0)`;
                }
                raf = 0;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        // select-none prevents any text selection inside the hero
        <header className="relative overflow-hidden h-screen select-none" aria-label="Hero">
            {/* === Background === */}
            <div
                ref={bgRef}
                className="absolute inset-0 -z-30 will-change-transform"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            />

            {/* === Overlay darkener === */}
            <div ref={overlayRef} className="absolute inset-0 -z-20 bg-black/60 will-change-transform" />

            {/* === Neon gradient overlay === */}
            <div
                className="absolute inset-0 -z-20 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(30,144,255,0.2) 0%, rgba(255,0,153,0.18) 55%, rgba(0,255,133,0.1) 100%)",
                    mixBlendMode: "overlay"
                }}
            />

            {/* === Bottom scrim === */}
            <div className="scrim-bottom absolute inset-x-0 bottom-0 h-[70%] pointer-events-none -z-10" />

            {/* === FX === */}
            <Fireworks />
            <SparkleLayer />
            <SocialRail />
            <RightRail />

            {/* === Hero Content (no box) === */}
            <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                <h2
                    className="text-3xl md:text-5xl font-arcade tracking-widest text-outline-soft"
                    style={{ color: "var(--color-primary)" }}
                >
                    WELCOME TO
                </h2>

                <h1
                    className="mt-5 font-arcade text-4xl md:text-7xl leading-tight [letter-spacing:4px] text-white text-stroke-strong"
                    style={{ whiteSpace: "nowrap" }}
                >
                    CODEUTSAVA 9.0
                </h1>

                <p className="mt-8 text-2xl md:text-4xl font-semibold tracking-wide text-white text-outline-strong">
                    CODE. INNOVATE. CELEBRATE.
                </p>

                <p className="mt-4 text-sm md:text-lg tracking-[0.2em] text-white text-outline-strong">
                    CENTRAL INDIA’S <span style={{ color: "var(--color-accent-2)" }}>LARGEST CODING EVENT.</span>{" "}
                    JOIN US ON <b style={{ color: "var(--color-primary)" }}>10—11 OCTOBER.</b>
                </p>
            </div>

            <BottomCTAs />
        </header>
    );
}
