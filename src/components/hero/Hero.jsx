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
        <header
            className="relative isolate overflow-hidden h-screen select-none"
            aria-label="Hero"
        >
            {/* Background should ignore cursor events */}
            <div className="absolute inset-0 pointer-events-none">
                <BackgroundMedia
                    imageSrc={bg_image}
                    videoSrc={bg_video}
                    darken={0.5}
                />
            </div>

            {/* Foreground gets cursor events */}
            <div className="relative z-10 pointer-events-auto h-full flex flex-col">
                <Navbar />
                <SocialRail />
                <RightRail />

                <div className="flex-1 max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-arcade tracking-widest text-outline-soft text-primary">
                        WELCOME TO
                    </h2>

                    <h1 className="mt-4 font-arcade text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white text-stroke-strong break-words px-2">
                        CODEUTSAVA 9.0
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold tracking-wide text-white text-outline-strong">
                        CODE. INNOVATE. CELEBRATE.
                    </p>

                    <p className="mt-4 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide text-white text-outline-strong px-2">
                        CENTRAL INDIA’S{" "}
                        <span className="text-accent-2">
                            LARGEST CODING EVENT.
                        </span>{" "}
                        JOIN US ON{" "}
                        <b className="text-primary">10—11 OCTOBER.</b>
                    </p>
                </div>

                <BottomCTAs />
            </div>
        </header>
    );
}
