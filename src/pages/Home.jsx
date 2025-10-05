import React, { useEffect, useRef, useState } from "react";
import Intro from "../components/intro/Intro.jsx";
import Hero from "../components/hero/Hero.jsx";
import Footer from "../components/footer/Footer.jsx";
import Fireworks from "../components/overlays/Fireworks.jsx";
import SparkleLayer from "../components/overlays/SparkleLayer.jsx";
import Sponsors from "../components/Sponsors/Spons.jsx";
import Timeline from "../components/timeline/Timeline.jsx";
import GRandAN from "../components/graphs&Analytics/GRandAN.jsx";
import Guide from "../components/guidelines/Guide.jsx";
import Player from "../components/audioPlayer/player.jsx";
import Cursor from "../components/cursor/Cursor.jsx";
import BackgroundMedia from "../components/background/Background.jsx";
import bg_image from "../assets/images/bg-part2.jpg";

export default function Home({ skipIntro = false }) {
  const [revealed, setRevealed] = useState(skipIntro);
  const [heroAnimationsStarted, setHeroAnimationsStarted] = useState(skipIntro);
  const touchStartYRef = useRef(0);

  const handleCurtainProgress = (progress) => {
    if (progress >= 0.9 && !heroAnimationsStarted) {
      setHeroAnimationsStarted(true);
      setRevealed(true);
    }
  };

  useEffect(() => {
    if (revealed) return;

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      touchStartYRef.current = t ? t.clientY : 0;
    };

    const onTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      const y = t ? t.clientY : touchStartYRef.current;
      const deltaY = touchStartYRef.current - y;
      touchStartYRef.current = y;
      if (deltaY > 50) setRevealed(true);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [revealed]);

  return (
    <>
      {/* Background & overlays */}
      <BackgroundMedia imageSrc={bg_image} darken={0.5} className="bg-right" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-15">
        <SparkleLayer />
        <Fireworks />
      </div>

      {/* Hero always rendered */}
      <Hero animationsStarted={heroAnimationsStarted} />

      {!revealed ? (
        <>
          <Intro onCurtainProgress={handleCurtainProgress} />
          {heroAnimationsStarted && <Cursor />}
        </>
      ) : (
        <>
          <Cursor />

          {/* Sections appear in natural top-to-bottom order */}
          <Sponsors />
          <Timeline />
          <Guide />
          <GRandAN />

          <Footer />

          {/* Floating player */}
          <div className="fixed bottom-4 right-4">
            <Player />
          </div>
        </>
      )}
    </>
  );
}
