import React, { useEffect, useRef, useState } from "react";
import Intro from "../../components/intro/Intro.jsx";
import Hero from "../../components/hero/Hero.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Fireworks from "../../components/overlays/Fireworks.jsx";
import SparkleLayer from "../../components/overlays/SparkleLayer.jsx";
import Lastyear from "../../components/LYparticipation/Lastyear.jsx";
import AboutUS from "../../components/aboutUS/AboutUS.jsx";
import Sponsors from "../../components/Sponsors/Spons.jsx";
import Timeline from "../../components/timeline/Timeline.jsx";
import GRandAN from "../../components/graphs&Analytics/GRandAN.jsx";
import Guide from "../../components/guidelines/Guide.jsx";
import Player from "../../components/audioPlayer/player.jsx";
import FAQ from "../FAQ.jsx";
import Cursor from "../../components/cursor/Cursor.jsx";
import BackgroundMedia from "../../components/background/Background.jsx";
import bg_image from "../../assets/images/bg-part2.jpg";

export default function Home({ skipIntro = false }) {
    const [revealed, setRevealed] = useState(skipIntro);
    const [curtainProgress, setCurtainProgress] = useState(0);
    const [heroAnimationsStarted, setHeroAnimationsStarted] = useState(skipIntro);
    const MAX = 100;
    const progRef = useRef(0);
    const touchStartYRef = useRef(0);

    // Handle curtain progress from Intro component
    const handleCurtainProgress = (progress) => {
        setCurtainProgress(progress);
        // Start hero animations when curtain is halfway open
        if (progress >= 0.5 && !heroAnimationsStarted) {
            setHeroAnimationsStarted(true);
        }
        // Fully reveal when curtain is completely open
        if (progress >= 1) {
            setRevealed(true);
        }
    };

    useEffect(() => {
        if (revealed) return;

        const onWheel = (e) => {
            const next = Math.min(Math.max(progRef.current + e.deltaY * 0.5, 0), MAX);
            progRef.current = next;
            if (next >= MAX) setRevealed(true);
        };
        const onTouchStart = (e) => {
            const t = e.touches && e.touches[0];
            touchStartYRef.current = t ? t.clientY : 0;
        };
        const onTouchMove = (e) => {
            const t = e.touches && e.touches[0];
            const y = t ? t.clientY : touchStartYRef.current;
            const deltaY = touchStartYRef.current - y;
            touchStartYRef.current = y;
            const next = Math.min(Math.max(progRef.current + deltaY * 0.5, 0), MAX);
            progRef.current = next;
            if (next >= MAX) setRevealed(true);
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [revealed]);

    return (
        <>
            {/* Global fixed background for entire page */}
            <BackgroundMedia
                imageSrc={bg_image}
                darken={0.5}
                className="bg-right"
            />
            
            {/* Overlays for the whole page; below text (z-20), above backdrops/halves */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
                <SparkleLayer />
                <Fireworks />
                {/* to enable autolaunch for fireworks uncomment the below*/}
                {/* <Fireworks autoLaunch/>   */}
            </div>

            {!revealed ? (
                <>
                    <Intro onCurtainProgress={handleCurtainProgress} />
                    {/* Load cursor and start hero animations when curtain is halfway open */}
                    {heroAnimationsStarted && <Cursor/>}
                </>
            ) : (
                <>
                   <Cursor/>
                    <Hero animationsStarted={heroAnimationsStarted} />
                    <Lastyear />
                    <AboutUS />
                    <Sponsors />
                    <Timeline />
                    <Guide />
                    <GRandAN />
                    <FAQ/>
                    <Footer />
                    <div className="fixed bottom-4 right-4">
                        <Player />
                    </div>
                </>
            )}
        </>
    );
}
