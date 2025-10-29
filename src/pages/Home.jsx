import React, { useEffect, useRef, useState } from "react";

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
import FAQ from "../components/faq/FAQ.jsx";
import Cursor from "../components/cursor/Cursor.jsx";
import BackgroundMedia from "../components/background/Background.jsx";
import bg_image from "../assets/images/bg-part2.jpg";
import Navbar from "../components/navbar/Navbar.jsx";
import PrizesSection from "../components/prizes/Prizes.jsx";
import CountDown from "../components/CountDown/CountDown.jsx";
import ProblemStatements from "../components/problemstatements/ProblemStatements.jsx"
import TeamsShortlisted from "../components/teamsShortlisted/TeamsShortlisted.jsx"

export default function Home({ skipIntro = false }) {
  const [revealed, setRevealed] = useState(skipIntro);
  const [curtainProgress, setCurtainProgress] = useState(0);
  const [heroAnimationsStarted, setHeroAnimationsStarted] = useState(skipIntro);
  const [showHero, setShowHero] = useState(skipIntro); // New state for hero visibility

  // Handle curtain progress from Intro component
  const handleCurtainProgress = (progress) => {
    setCurtainProgress(progress);
    
    // Start preloading hero when intro initializes
    if (progress >= 0.1 && !heroAnimationsStarted) {
      setHeroAnimationsStarted(true);
    }
    
    // Show hero and start animations when curtain starts revealing
    if (progress >= 1.0 && !showHero) {
      setShowHero(true); // Make hero visible immediately
      
      // Delay removing intro until curtains finish opening
      // 1.6s curtain animation + 200ms buffer = 1800ms
      setTimeout(() => {
        setRevealed(true);
      }, 1800);
    }
  };

  return (
    <>
      {/* Global fixed background for entire page */}
      <BackgroundMedia
        imageSrc={bg_image}
        darken={0.5}
        className="bg-right"
      />

      {/* Always render and preload Hero (hidden behind intro until revealed) */}
      <div style={{ 
        opacity: showHero ? 1 : 0, 
        transition: showHero ? 'opacity 0.3s ease-in' : 'none',
        position: revealed ? 'static' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: revealed ? 'auto' : -1
      }}>
        <Hero animationsStarted={showHero} />
      </div>

      {/* Overlays for the whole page */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: !revealed ? 1010 : 15 }}
      >
        <SparkleLayer />
        <Fireworks autoLaunch={!revealed} />
      </div>

      {/* Always render Cursor for custom cursor effect */}
      <Cursor />

      {!revealed ? (
        <Intro onCurtainProgress={handleCurtainProgress} />
      ) : (
        <>
          {/* 🌟 Add vertical spacing between all sections */}
          <div className="flex flex-col space-y-28 md:space-y-36 sm:space-y-40">
            <Lastyear />
            <AboutUS />
            <div className="flex flex-col gap-20 pt-6 pb-12">
            <Sponsors />
            </div>
            <ProblemStatements/>
            <div className="flex flex-col gap-20 pt-6 pb-12">
            <Timeline />
            </div>
            <Guide />
            <PrizesSection />
            <GRandAN />
            <TeamsShortlisted />
            <FAQ />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
