import React from "react";
import { motion } from "framer-motion";

import Navbar from "../navbar/Navbar.jsx";
import BottomCTAs from "./BottomCTAs.jsx";
import SocialRail from "./SocialRail.jsx";
import RightRail from "./RightRail.jsx";
import BackgroundMedia from "../background/Background.jsx";

import bg_image from "../../assets/images/bg-part2.jpg";

export default function Hero({ animationsStarted = false }) {
    // Unified fade + slide down: start above (negative y) and move into place
    const fadeFromAbove = (delay = 0) => ({
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
    });

    return (
        <div className={`${animationsStarted ? "relative" : "fixed inset-0 -z-10"}`}>
            {/* Background */}
            <BackgroundMedia imageSrc={bg_image} darken={0.5} className="bg-right" />

            {animationsStarted && (
                <header
                    className="relative overflow-hidden h-screen select-none hero-animations-active"
                    aria-label="Hero"
                >
                    <div className="relative z-10 pointer-events-auto h-full flex flex-col">
                        {/* Navbar */}
                        <motion.div
                            variants={fadeFromAbove(0)}
                            initial="hidden"
                            animate="visible"
                        >
                            <Navbar />
                        </motion.div>

                        {/* Hero Text */}
                        <div className="flex-1 max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                            <motion.h2
                                variants={fadeFromAbove(0.3)}
                                initial="hidden"
                                animate="visible"
                                className="text-xl sm:text-4xl md:text-6xl lg:text-6xl font-rye tracking-widest text-outline-soft text-primary"
                            >
                                WELCOME TO
                            </motion.h2>

                            <motion.h1
                                variants={fadeFromAbove(0.6)}
                                initial="hidden"
                                animate="visible"
                                className="mt-4 font-rye text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-[#F3A83A] text-stroke-strong break-words px-2"
                            >
                                CODEUTSAVA 9.0
                            </motion.h1>

                            <motion.p
                                variants={fadeFromAbove(0.9)}
                                initial="hidden"
                                animate="visible"
                                className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold tracking-wide text-white text-outline-strong"
                            >
                                CODE. INNOVATE. CELEBRATE.
                            </motion.p>

                            <motion.p
                                variants={fadeFromAbove(1.2)}
                                initial="hidden"
                                animate="visible"
                                className="mt-4 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide text-white text-outline-strong px-2"
                            >
                                CENTRAL INDIA’S{" "}
                                <span className="text-accent-2">LARGEST CODING EVENT.</span> JOIN US ON{" "}
                                <b className="text-primary">10—11 OCTOBER.</b>
                            </motion.p>
                        </div>

                        {/* Bottom CTAs */}
                        <motion.div
                            variants={fadeFromAbove(1.5)}
                            initial="hidden"
                            animate="visible"
                        >
                            <BottomCTAs />
                        </motion.div>

                        {/* Rails */}
                        <motion.div
                            variants={fadeFromAbove(1.8)}
                            initial="hidden"
                            animate="visible"
                        >
                            <SocialRail />
                        </motion.div>

                        <motion.div
                            variants={fadeFromAbove(2.0)}
                            initial="hidden"
                            animate="visible"
                        >
                            <RightRail />
                        </motion.div>
                    </div>
                </header>
            )}
        </div>
    );
}
