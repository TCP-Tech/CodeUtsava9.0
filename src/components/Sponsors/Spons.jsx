import React, { useRef, useEffect, useState } from "react"; // <-- added useState
import { motion, useScroll, useTransform } from "framer-motion";
import sponsers from "/src/assets/data/sponsersData.js";
import bg_video from "../../assets/bg_video.webm";
import bg_image from "../../assets/images/bg_image.webp";
import BackgroundMedia from "../background/Background.jsx";
import cardBlue from "/src/assets/images/CU9 stuff/blue.jpg";
import cardRed from "/src/assets/images/CU9 stuff/red.jpg";
import BDace from "/src/assets/images/CU9 stuff/BDace.jpg";
import Bace from "/src/assets/images/CU9 stuff/Bace.jpg";
import Dace from "/src/assets/images/CU9 stuff/Dace.jpg";
import Hace from "/src/assets/images/CU9 stuff/Hace.jpg";
import "./spons.css";

const Spons = () => {
    const containerRef = useRef(null);
    const [isFixed, setIsFixed] = useState(false); // track fixed state

    const allSponsors = [
        ...sponsers.platinum,
        ...sponsers.gold,
        ...sponsers.partners,
    ];

    // Track scroll inside this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"], // pin for full height
    });

    // Each card flips one after another as scroll progresses
    const rotations = allSponsors.map((_, idx) => {
        const start = idx / allSponsors.length;
        const end = (idx + 1) / allSponsors.length;
        return useTransform(scrollYProgress, [start, end], ["0deg", "180deg"]);
    });

    // Randomly assign one of the background images to each card front
    const getRandomImage = (idx) => {
        const images = [BDace, Bace, Dace, Hace];
        // Use a deterministic random selection based on index
        return images[idx % images.length];
    };

    // Listen to window scroll to set fixed class
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const sectionTop = containerRef.current.getBoundingClientRect().top;
            setIsFixed(sectionTop <= 0); // fix when section reaches top
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <section ref={containerRef} className={`static h-[180vh] overflow-x-hidden`}>

                {/* FIXED ANIMATED BACKGROUND */}
                <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />

                {/* Sticky container that locks while flipping */}
 <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-transparent">

                    <h1 className="font-arcade text-5xl text-white mb-25 text-center max-md:mt-70">
                        Our Sponsors
                    </h1>

                    {/* Responsive grid on small screens, flex row on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:flex md:gap-10 h-auto max-sm:-translate-y-18 items-center px-6 mt-10">
                        {allSponsors.map((s, idx) => (
                            <motion.div
                                key={idx}
                                className="w-28 h-40 sm:w-32 sm:h-48 md:w-40 md:h-60 shrink-0 mx-auto"
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
                                        rotateY: rotations[idx], // scroll-driven flip
                                        rotateZ: idx % 2 === 0 ? "-10deg" : "20deg", // static tilt
                                    }}
                                >
                                    {/* Back */}
                                    <div
                                        className={`absolute w-full h-full ${idx % 2 === 0 ? "mx-2" : "mx-5"} rounded-xl overflow-hidden`}
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
                                        className={`absolute w-full h-full ${idx % 2 === 0 ? "mx-2" : "mx-5"} rounded-xl flex flex-col items-center justify-center p-3 overflow-hidden`}
                                        style={{
                                            transform: "rotateY(180deg)",
                                            backfaceVisibility: "hidden",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Background Image Container */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage: `url(${getRandomImage(idx)})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                margin: "8px", // Add margin to create card-like padding
                                                borderRadius: "0.75rem", // Match the parent's rounded corners
                                            }}
                                        />

                                        {/* Content Container */}
                                        <div className="relative z-10"> {/* Ensure content stays above background */}
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
                </div>
            </section>
        </>
    );
};

export default Spons;
