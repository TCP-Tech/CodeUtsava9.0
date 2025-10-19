import React from "react";
import { motion } from "framer-motion";
import codeutsava from "../../assets/images/codeutsava logo.svg";
import Navbar from "../navbar/Navbar.jsx";
import BottomCTAs from "./BottomCTAs.jsx";
import SocialRail from "./SocialRail.jsx";
import RightRail from "./RightRail.jsx";
import BackgroundMedia from "../background/Background.jsx";

import bg_image from "../../assets/images/bg-part2.jpg";

export default function Hero({ animationsStarted = false }) {
    // Smooth reveal animation with slide down and fade
    const revealAnimation = (delay = 0) => ({
        hidden: { opacity: 0, y: -60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 1.0,
                delay,
                ease: [0.22, 1, 0.36, 1] // Smooth ease-out curve
            } 
        },
    });

    // Enhanced slide-down effect with longer duration
    const slideReveal = (delay = 0) => ({
        hidden: { opacity: 0, y: -40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.9, 
                delay,
                ease: [0.22, 1, 0.36, 1]
            } 
        },
    });

    // MODIFIED: Enhanced slide from left with reveal effect
    const socialRailAnimate = (delay = 0) => ({
        hidden: { opacity: 0, x: -100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: 1.0, 
                delay,
                ease: [0.22, 1, 0.36, 1]
            } 
        },
    });

    // MODIFIED: Enhanced slide from right with reveal and float
    const rightRailAnimate = (delay = 0) => ({
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            y: ["-50%", "-53%", "-50%"],
            transition: {
                delay,
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
                y: {
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: delay + 1.0,
                },
            },
        },
    });

    return (
        <div className={`${animationsStarted ? "relative" : "fixed inset-0 -z-10"}`}>
            <BackgroundMedia imageSrc={bg_image} darken={0.5} className="bg-right" />

            {animationsStarted && (
                <header
                    className="relative overflow-hidden h-screen select-none"
                    aria-label="Hero"
                >
                    <div className="relative z-10 pointer-events-auto h-full flex flex-col">
                        <motion.div
                            variants={revealAnimation(0)}
                            initial="hidden"
                            animate="visible"
                        >
                            <Navbar />
                        </motion.div>

                        <div className="flex-1 max-w-6xl mx-auto my-1.5 px-4 flex flex-col items-center justify-center text-center">
                            <motion.h2
                                variants={revealAnimation(0.15)}
                                initial="hidden"
                                animate="visible"
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-rye tracking-widest text-outline-soft text-primary"
                            >
                                WELCOME TO
                            </motion.h2>
                            <motion.h1
                                variants={revealAnimation(0.3)}
                                initial="hidden"
                                animate="visible"
                                className="-mt-7 w-200 h-40"
                            >
                                <img src={codeutsava} alt="CodeUtsava Logo" className=""/>
                            </motion.h1>

                            <motion.p
                                variants={slideReveal(0.45)}
                                initial="hidden"
                                animate="visible"
                                className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold tracking-wide text-white text-outline-strong"
                            >
                                CODE. INNOVATE. CELEBRATE.
                            </motion.p>

                            <motion.p
                                variants={slideReveal(0.6)}
                                initial="hidden"
                                animate="visible"
                                className="mt-4 text-xs sm:text-sm md:text-base lg:text-lg tracking-wide text-white text-outline-strong px-2"
                            >
                                CENTRAL INDIA'S{" "}
                                <b className="text-primary"><span className="text-accent-2">LARGEST CODING EVENT.</span> </b> JOIN US ON {" "}
                                <b className="text-primary">6<sup>th</sup> - 7<sup>th</sup> NOVEMBER.</b>
                            </motion.p>
                        </div>

                        <motion.div 
                            variants={slideReveal(0.75)}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="relative" style={{top:"-10.25rem"}}>
                            <BottomCTAs />
                            </div>
                        </motion.div>

                        {/* Rails */}
                        <motion.div
                            className="codeutsava__hero-social-rail"
                            variants={socialRailAnimate(0.9)}
                            initial="hidden"
                            animate="visible"
                        >
                            <SocialRail />
                        </motion.div>

                        <motion.div
                            className="scroll-down-section"
                            variants={rightRailAnimate(0.9)}
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