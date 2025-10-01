import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sponsers from "../../assets/data/sponsersData.js"; // fixed import path
import bg_video from "../../assets/bg_video.webm";
import bg_image from "../../assets/images/bg.webp";
import BackgroundMedia from "../background/Background.jsx";
import cardBlue from "../../assets/images/CU9 stuff/blue.jpg";
import cardRed from "../../assets/images/CU9 stuff/red.jpg";
import BDace from "../../assets/images/CU9 stuff/BDace.jpg";
import Bace from "../../assets/images/CU9 stuff/Bace.jpg";
import Dace from "../../assets/images/CU9 stuff/Dace.jpg";
import Hace from "../../assets/images/CU9 stuff/Hace.jpg";
import "./spons.css";

const Spons = () => {
    const containerRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false);

    const allSponsors = [
        ...sponsers.platinum,
        ...sponsers.gold,
        ...sponsers.partners,
    ];

    /** ---------- SCROLL PROGRESS ---------- **/
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /** ---------- PHASE 1 : CARD FLIPS ---------- **/
    const flipEnd = 0.4;
    const rotations = allSponsors.map((_, idx) => {
        const start = (idx / allSponsors.length) * flipEnd;
        const end = ((idx + 1) / allSponsors.length) * flipEnd;
        return useTransform(scrollYProgress, [start, end], ["0deg", "180deg"]);
    });

    /** ---------- PHASE 2 : SLIDE LEFT ---------- **/
    const slideX = useTransform(scrollYProgress, [flipEnd, 1], ["0%", "-100%"]);

    /** ---------- PHASE 3 : FADE OUT WHEN NEXT SECTION ARRIVES ---------- **/
    const fadeOut = useTransform(scrollYProgress, [0.95, 1.0], [1, 0]);

    /** ---------- HELPERS ---------- **/
    const getRandomImage = (idx) => {
        const images = [BDace, Bace, Dace, Hace];
        return images[idx % images.length];
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setIsFixed(rect.top <= 0 && rect.bottom > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /** Split sponsors into two halves for mobile rows **/
    const half = Math.ceil(allSponsors.length / 2);
    const firstRow = allSponsors.slice(0, half);
    const secondRow = allSponsors.slice(half);

    return (
        <>
            <section ref={containerRef} className="static h-[300vh] overflow-x-hidden">
                <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />

                <motion.div
                    className={`${isFixed ? "fixed top-0 w-full" : "relative"} h-screen flex flex-col items-center justify-center bg-transparent`}
                    style={{ opacity: fadeOut }}
                >
                    <h1 className="text-6xl text-white mb-25 text-center max-md:mt-5 rye-regular">
                        Our Sponsors
                    </h1>

                    {/* ---------- HORIZONTAL TRACK / MOBILE TWO ROWS ---------- */}
                    <motion.div
                        className="w-full mt-10 px-6 will-change-transform"
                        style={{ x: slideX }}
                    >
                        {/* Mobile view: stacked rows, Desktop: single row */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            {[firstRow, secondRow].map((rowSponsors, rowIdx) => (
                                <div key={rowIdx} className="flex justify-center gap-10 mb-6">
                                    {rowSponsors.map((s, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="w-28 h-40 sm:w-32 sm:h-48 md:w-40 md:h-60 shrink-0"
                                            style={{ perspective: "1000px" }}
                                            initial={{ opacity: 0, y: 80 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 120,
                                                damping: 12,
                                                mass: 0.6,
                                                delay: idx * 0.1,
                                            }}
                                        >
                                            <motion.div
                                                className="relative w-full h-full"
                                                style={{
                                                    transformStyle: "preserve-3d",
                                                    rotateY: rotations[idx],
                                                    rotateZ: idx % 2 === 0 ? "-10deg" : "20deg",
                                                }}
                                            >
                                                {/* Back */}
                                                <div
                                                    className={`absolute w-full h-full ${idx % 2 === 0 ? "mx-2" : "mx-5"
                                                        } rounded-xl overflow-hidden`}
                                                    style={{ backfaceVisibility: "hidden" }}
                                                >
                                                    <img
                                                        src={idx % 2 === 0 ? cardBlue : cardRed}
                                                        alt="Card Back"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Front */}
                                                <div
                                                    className={`absolute w-full h-full ${idx % 2 === 0 ? "mx-2" : "mx-5"
                                                        } rounded-xl flex flex-col items-center justify-center p-3 overflow-hidden`}
                                                    style={{
                                                        transform: "rotateY(180deg)",
                                                        backfaceVisibility: "hidden",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            backgroundImage: `url(${getRandomImage(idx)})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            margin: "2px",
                                                            borderRadius: "0.75rem",
                                                        }}
                                                    />
                                                    <div className="relative z-10">
                                                        <img
                                                            src={s.img}
                                                            alt={s.alt || `Sponsor ${idx + 1}`}
                                                            className="h-12 sm:h-14 md:h-16 object-contain mb-2"
                                                        />
                                                        <p className="text-black text-xs sm:text-sm font-bold text-center">
                                                            {s.alt || "Sponsor"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
};

export default Spons;
