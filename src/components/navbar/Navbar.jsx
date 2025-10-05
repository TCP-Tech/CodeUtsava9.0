import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/2.png";
import ImageButton from "../button/TicketButton";

const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

// Helper: scroll using Lenis if available, offsetting for fixed navbar
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
        destinationY = window.scrollY + rect.top - offset - 8; // small padding
    }

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
        // use global (slower) duration from App.jsx
        window.lenis.scrollTo(destinationY, { easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
        window.scrollTo({ top: destinationY, behavior: "smooth" });
    }
}

const NavItem = ({ children, href, onClick, delay = 0, disabled = false }) => {
    const baseClasses =
        "px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition";
    const enabledClasses = "hover:text-[#E4D0B6] cursor-pointer";
    const disabledClasses = "opacity-50 cursor-not-allowed";

    if (disabled) {
        return (
            <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                aria-disabled="true"
                className={`${baseClasses} ${disabledClasses}`}
            >
                {children}
            </motion.span>
        );
    }

    const handleClick = (e) => {
        if (href?.startsWith("#")) {
            e.preventDefault();
            smoothScrollTo(href);
        }
        if (onClick) onClick(e);
    };

    return (
        <motion.a
            href={href}
            onClick={handleClick}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`${baseClasses} ${enabledClasses}`}
        >
            {children}
        </motion.a>
    );
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // lg
    const closeMobile = () => setMobileOpen(false);

    // Close mobile menu when switching to large screens
    useEffect(() => {
        if (isLargeScreen && mobileOpen) setMobileOpen(false);
    }, [isLargeScreen, mobileOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [mobileOpen]);

    return (
        <nav
            className="fixed top-0 left-0 right-0 bg-[#070f2f]/90 px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="mx-auto w-full">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Left: Logo + Feedback */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="font-arcade text-lg drop-shadow"
                            onClick={(e) => {
                                e.preventDefault();
                                smoothScrollTo("#");
                                // Close mobile if open
                                if (mobileOpen) setMobileOpen(false);
                            }}
                        >
                            <img src={logo} alt="Logo" className="h-12 scale-150 pr-5 w-auto" />
                        </a>

                        {isLargeScreen && (
                            <ImageButton
                                text="FEEDBACK"
                                onClick={() => window.open(CONTACT_FORM_URL, "_blank")}
                                style={{ fontSize: "16px" }}
                            />
                        )}
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-white font-bold">
                        <NavItem href="#" delay={0.1}>HOME</NavItem>
                        <NavItem href="#about" delay={0.2}>ABOUT US</NavItem>
                        <NavItem href="#faq" delay={0.3}>FAQ</NavItem>
                        <motion.a
                            href={CONTACT_FORM_URL}
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(CONTACT_FORM_URL, "_blank", "noopener,noreferrer");
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6] cursor-pointer"
                        >
                            CONTACT US
                        </motion.a>
                        <NavItem disabled delay={0.5}>TEAM</NavItem>
                    </div>

                    {/* Right: Brochure */}
                    {isLargeScreen && (
                        <div className="hidden md:flex">
                            <ImageButton
                                text="BROCHURE"
                                onClick={() => window.open("/Brochure.pdf", "_blank")}
                                style={{ fontSize: "16px" }}
                            />
                        </div>
                    )}

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMobileOpen((s) => !s)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu (drops below the nav) */}
                <AnimatePresence initial={false}>
                    {mobileOpen && (
                        <motion.div
                            id="mobile-menu"
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="md:hidden absolute left-0 right-0 top-full bg-[#070f2f]/95 border-t border-white/10 shadow-lg"
                        >
                            <div className="flex flex-col items-center gap-4 py-4 text-white font-semibold">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#");
                                        closeMobile();
                                    }}
                                    className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                                >
                                    HOME
                                </a>
                                <a
                                    href="#about"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#about");
                                        closeMobile();
                                    }}
                                    className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                                >
                                    ABOUT US
                                </a>
                                <a
                                    href="#faq"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#faq");
                                        closeMobile();
                                    }}
                                    className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                                >
                                    FAQ
                                </a>
                                <a
                                    href={CONTACT_FORM_URL}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(CONTACT_FORM_URL, "_blank", "noopener,noreferrer");
                                        closeMobile();
                                    }}
                                    className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                                >
                                    CONTACT US
                                </a>
                                <span className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide opacity-50 cursor-not-allowed">
                                    TEAM
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
