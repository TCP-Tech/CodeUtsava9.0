import React from "react";
import bg_image from "../../assets/images/bg_image.webp";
import bg_video from "../../assets/bg_video.webm";
import SocialRail from "./SocialRail.jsx";
import RightRail from "./RightRail.jsx";
import BottomCTAs from "./BottomCTAs.jsx";
import Navbar from "../navbar/Navbar.jsx";
import BackgroundMedia from "../background/Background.jsx";

export default function Hero() {
    return (
        <header className="relative isolate overflow-hidden h-screen select-none" aria-label="Hero">
            <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />
            <Navbar />
            <SocialRail />
            <RightRail />
            <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-5xl font-arcade tracking-widest text-outline-soft" style={{ color: "var(--color-primary)" }}>
                    WELCOME TO
                </h2>
                <h1 className="mt-5 font-arcade text-4xl md:text-7xl leading-tight [letter-spacing:4px] text-white text-stroke-strong" style={{ whiteSpace: "nowrap" }}>
                    CODEUTSAVA 9.0
                </h1>
                <p className="mt-8 text-2xl md:text-4xl font-semibold tracking-wide text-white text-outline-strong">
                    CODE. INNOVATE. CELEBRATE.
                </p>
                <p className="mt-4 text-sm md:text-lg tracking-[0.2em] text-white text-outline-strong">
                    CENTRAL INDIA’S <span style={{ color: "var(--color-accent-2)" }}>LARGEST CODING EVENT.</span> JOIN US ON{" "}
                    <b style={{ color: "var(--color-primary)" }}>10—11 OCTOBER.</b>
                </p>
            </div>
            <BottomCTAs />
        </header>
    );
}
