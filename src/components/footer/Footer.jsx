import React from "react";
import { Link } from "react-router-dom";

import NIT from "../../assets/images/NIT.webp";
import tcpName from "../../assets/images/tcpName.png";
import codeutsava from "../../assets/images/codeutsava.png";

// Smooth scroll helper, uses Lenis if available
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

const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

const Footer = () => {
    return (
        <footer className="w-full relative backdrop-blur-lg bg-black/40 text-gray-300 px-6 sm:px-12 lg:px-20 py-12 border-t border-white/10">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Logos */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img
                        src={codeutsava}
                        alt="CodeUtsava Logo"
                        loading="lazy"
                        className="h-14 sm:h-16 object-contain drop-shadow-lg"
                    />
                    <img
                        src={tcpName}
                        alt="TCP Logo"
                        loading="lazy"
                        className="h-10 sm:h-12 object-contain drop-shadow-lg"
                    />
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-4 md:gap-5 flex-wrap justify-center">
                        {/* social icons unchanged */}
                        <a href="https://www.facebook.com/codeutsava/" target="_blank" rel="noreferrer" aria-label="Facebook"
                            className="transition hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]">
                            <i className="fab fa-facebook text-2xl"></i>
                        </a>
                        <a href="https://www.instagram.com/codeutsavanitrr/" target="_blank" rel="noreferrer" aria-label="Instagram"
                            className="transition hover:scale-110 hover:text-pink-400 hover:drop-shadow-[0_0_8px_#ec4899]">
                            <i className="fab fa-instagram text-2xl"></i>
                        </a>
                        <a href="https://github.com/TCP-Tech" target="_blank" rel="noreferrer" aria-label="GitHub"
                            className="transition hover:scale-110 hover:text-gray-300 hover:drop-shadow-[0_0_8px_#d1d5db]">
                            <i className="fab fa-github text-2xl"></i>
                        </a>
                        <a href="https://twitter.com/codeutsavanitrr?lang=en" target="_blank" rel="noreferrer" aria-label="Twitter"
                            className="transition hover:scale-110 hover:text-blue-300 hover:drop-shadow-[0_0_8px_#60a5fa]">
                            <i className="fab fa-twitter text-2xl"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/codeutsava/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                            className="transition hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]">
                            <i className="fab fa-linkedin text-2xl"></i>
                        </a>
                        <a href="https://discord.gg/sxfvDKhEgQ" target="_blank" rel="noreferrer" aria-label="Discord"
                            className="transition hover:scale-110 hover:text-indigo-400 hover:drop-shadow-[0_0_8px_#6366f1]">
                            <i className="fab fa-discord text-2xl"></i>
                        </a>
                    </div>
                    <p className="text-sm font-light text-center mt-1 md:mt-0">
                        Follow us on social media for updates
                    </p>
                </div>
            </div>

            {/* Middle Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* About NIT Raipur */}
                <div className="flex gap-4 items-start">
                    <img
                        src={NIT}
                        alt="NIT Raipur Logo"
                        loading="lazy"
                        className="h-20 w-20 object-contain drop-shadow-lg flex-shrink-0"
                    />
                    <div>
                        <h4 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-rye text-white uppercase tracking-wide">
                            About NIT Raipur
                        </h4>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-1 leading-relaxed ">
                            The institute is committed to the challenging task of developing
                            technical education by preparing seasoned graduates in highly
                            sophisticated fields of engineering and technology. For about five
                            decades, NIT Raipur has been doing this with sincerity and
                            commitment.
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4 md:items-end font-rye text-white">
                    <button
                        onClick={() => smoothScrollTo("#")}
                        className="hover:text-blue-400 transition hover:drop-shadow-[0_0_6px_#3b82f6] text-left"
                    >
                        Home
                    </button>
                    <Link
                        to="/events"
                        className="hover:text-pink-400 transition hover:drop-shadow-[0_0_6px_#ec4899]"
                    >
                        Events
                    </Link>
                    <Link
                        to="/speakers"
                        className="hover:text-green-400 transition hover:drop-shadow-[0_0_6px_#22c55e]"
                    >
                        Speakers
                    </Link>
                    <button
                        onClick={() => smoothScrollTo("#faq")}
                        className="hover:text-blue-300 transition hover:drop-shadow-[0_0_6px_#60a5fa] text-left"
                    >
                        FAQ
                    </button>
                    {/* updated Contact Us */}
                    <a
                        href={CONTACT_FORM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-pink-300 transition hover:drop-shadow-[0_0_6px_#f472b6]"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light">
                <div className="text-center md:text-left">
                    Architected with <span className="text-pink-400">❤️</span> by{" "}
                    <Link
                        to="/team"
                        className="hover:text-green-400 hover:drop-shadow-[0_0_6px_#22c55e] transition"
                    >
                        TCP Team
                    </Link>
                </div>

                <button
                    onClick={() => smoothScrollTo("#")}
                    className="flex items-center justify-center hover:text-blue-400 hover:drop-shadow-[0_0_6px_#3b82f6] transition mt-2 md:mt-0"
                >
                    Back to Top
                    <i className="fas fa-arrow-up ml-2"></i>
                </button>

                <a
                    href="https://www.google.com/maps/place/NIT+Raipur"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center hover:text-green-400 hover:drop-shadow-[0_0_6px_#22c55e] transition mt-2 md:mt-0"
                >
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    View Map Location
                </a>
            </div>
        </footer>
    );
};

export default Footer;
