// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Intro from "../components/intro/Intro.jsx";
import Hero from "../components/hero/Hero.jsx";
import Footer from "../components/footer/Footer.jsx";
import Fireworks from "../components/overlays/Fireworks.jsx";
import SparkleLayer from "../components/overlays/SparkleLayer.jsx";
import Lastyear from "../components/LYparticipation/Lastyear.jsx";
import AboutUS from "../components/aboutUS/AboutUS.jsx";
import Sponsors from "../components/Sponsors/Spons.jsx";
import Timeline from "../components/timeline/Timeline.jsx";
import GRandAN from "../components/graphs&Analytics/GRandAN.jsx";
import Guide from "../components/guidelines/Guide.jsx";
import Player from "../components/audioPlayer/player.jsx";
import FAQ from "./FAQ.jsx";
import Cursor from "../components/cursor/Cursor.jsx";
import BackgroundMedia from "../components/background/Background.jsx";
import bg_image from "../assets/images/bg-part2.jpg";

export default function Home({ skipIntro = false }) {
    const location = useLocation();

    // If navigation included a scroll target, treat that as a request to skip the intro
    const navScrollTarget =
        location && location.state && location.state.scrollTo ? location.state.scrollTo : null;
    const initialSkip = Boolean(skipIntro || navScrollTarget);

    // States: when initialSkip=true we want hero animations started and page revealed immediately
    const [revealed, setRevealed] = useState(initialSkip);
    const [curtainProgress, setCurtainProgress] = useState(initialSkip ? 1 : 0);
    const [heroAnimationsStarted, setHeroAnimationsStarted] = useState(initialSkip);
    const MAX = 100;
    const progRef = useRef(initialSkip ? MAX : 0);
    const touchStartYRef = useRef(0);

    // store pending scroll if navigation passed one
    const pendingScrollRef = useRef(navScrollTarget);

    // Smooth scroll helper (keeps same offset logic as navbar/footer)
    function smoothScrollTo(targetSelector) {
        const nav = document.querySelector("nav");
        const offset = nav ? nav.offsetHeight : 0;

        let destinationY = 0;
        if (!targetSelector || targetSelector === "#") {
            destinationY = 0;
        } else {
            const el = document.querySelector(targetSelector);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            destinationY = window.scrollY + rect.top - offset - 8;
        }

        if (window.lenis && typeof window.lenis.scrollTo === "function") {
            window.lenis.scrollTo(destinationY);
        } else {
            window.scrollTo({ top: destinationY, behavior: "smooth" });
        }
    }

    // Handle curtain progress from Intro component
    const handleCurtainProgress = (progress) => {
        setCurtainProgress(progress);
        if (progress >= 0.9 && !heroAnimationsStarted) {
            setHeroAnimationsStarted(true);
            setRevealed(true);
        }
    };

    // If the route included a scrollTo target, and we skipped intro initially,
    // perform the scroll after a tiny delay (so DOM is painted). Also clear history state to avoid repeated scrolling.
    useEffect(() => {
        if (initialSkip && pendingScrollRef.current) {
            // Give the page a short grace period to render everything
            const t = setTimeout(() => {
                smoothScrollTo(pendingScrollRef.current);
                pendingScrollRef.current = null;
                try {
                    // remove scrollTo from history state to avoid re-triggering on back/forward
                    const loc = window.history.state;
                    if (loc && loc.state && loc.state.scrollTo) {
                        const newState = { ...loc.state };
                        delete newState.scrollTo;
                        window.history.replaceState({ ...loc, state: newState }, "");
                    }
                } catch (e) {
                    // ignore replaceState errors (some browsers may block)
                }
            }, 60);
            return () => clearTimeout(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If navigation state changes later (rare), queue scroll and scroll when revealed
    useEffect(() => {
        if (location && location.state && location.state.scrollTo) {
            pendingScrollRef.current = location.state.scrollTo;
        }
        if (revealed && pendingScrollRef.current) {
            setTimeout(() => {
                smoothScrollTo(pendingScrollRef.current);
                pendingScrollRef.current = null;
            }, 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, revealed]);

    // Curtain wheel/touch unlocking behavior (only active if not revealed)
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
            <BackgroundMedia imageSrc={bg_image} darken={0.5} className="bg-right" />

            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
                <SparkleLayer />
                <Fireworks />
            </div>

            {/* Navbar stays but has lower z-index so intro covers it */}
            <Navbar />

            <Hero animationsStarted={heroAnimationsStarted} />

            {!revealed ? (
                <>
                    <Intro onCurtainProgress={handleCurtainProgress} />
                    {heroAnimationsStarted && <Cursor />}
                </>
            ) : (
                <>
                    <Cursor />
                    <Lastyear />
                    <AboutUS />
                    <Sponsors />
                    <Timeline />
                    <Guide />
                    <GRandAN />
                    <FAQ />
                    <Footer />
                    <div className="fixed bottom-4 right-4">
                        <Player />
                    </div>
                </>
            )}
        </>
    );
}
