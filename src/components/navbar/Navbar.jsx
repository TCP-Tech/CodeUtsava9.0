// src/components/navbar/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/codeutsava.png";
import ImageButton from "../button/TicketButton";

const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

/**
 * Smooth-scroll helper: uses global Lenis if available; otherwise window.scrollTo.
 * Offsets by the height of the first <nav> element found on the page.
 */
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

const NavItem = ({ children, href, onClick, delay = 0, disabled = false }) => {
    const baseClasses =
        "px-4 py-2 text-[1.0rem] rye-regular tracking-wide transition";
    const enabledClasses = "hover:text-[#E4D0B6] cursor-pointer";
    const disabledClasses = "opacity-50 cursor-not-allowed";

    if (disabled) {
        return (
            <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay }}
                aria-disabled="true"
                className={`${baseClasses} ${disabledClasses}`}
            >
                {children}
            </motion.span>
        );
    }

    const handleClick = (e) => {
        if (onClick) onClick(e);
    };

    return (
        <motion.a
            href={href}
            onClick={handleClick}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay }}
            className={`${baseClasses} ${enabledClasses}`}
        >
            {children}
        </motion.a>
    );
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const navRef = useRef(null);

    // ensure nav is fixed and always visible; add body padding to avoid content overlap
    useEffect(() => {
        function updateBodyPadding() {
            const navEl = navRef.current;
            if (!navEl) return;
            const height = navEl.offsetHeight;
            // set only if different to avoid thrash
            if (document.body.style.paddingTop !== `${height}px`) {
                document.body.style.paddingTop = `${height}px`;
            }
        }

        updateBodyPadding();
        window.addEventListener("resize", updateBodyPadding);
        return () => {
            // cleanup: remove padding we added
            if (document.body.style.paddingTop) {
                document.body.style.paddingTop = "";
            }
            window.removeEventListener("resize", updateBodyPadding);
        };
    }, []);

    const closeMobile = () => setMobileOpen(false);

    /**
     * goToAnchor:
     * - If already on "/", use in-page scroll
     * - Otherwise navigate to "/" and pass state.scrollTo for Home to handle after render
     */
    const goToAnchor = (anchorSelector) => {
        if (currentPath === "/") {
            smoothScrollTo(anchorSelector);
            return;
        }
        navigate("/", { state: { scrollTo: anchorSelector } });
    };

    return (
        // nav is *the* fixed element — no outer 'fixed' wrapper to interfere.
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[500] bg-[#070f2f]/95 px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Logo + Feedback button */}
                <div className="flex items-center gap-4">
                    <a
                        href="/"
                        className="font-arcade text-lg drop-shadow"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPath === "/") {
                                smoothScrollTo("#");
                            } else {
                                navigate("/");
                            }
                        }}
                        aria-label="Go to homepage"
                    >
                        <img src={logo} alt="CodeUtsava logo" className="h-12 w-auto" />
                    </a>

                    {isLargeScreen && (
                        <ImageButton
                            text="FEEDBACK"
                            onClick={() => window.open(CONTACT_FORM_URL, "_blank")}
                            style={{ fontSize: "16px" }}
                        />
                    )}
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-6 text-white font-bold">
                    <NavItem
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPath === "/") smoothScrollTo("#");
                            else navigate("/");
                        }}
                        delay={0.1}
                    >
                        HOME
                    </NavItem>

                    <NavItem
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            goToAnchor("#about");
                        }}
                        delay={0.2}
                    >
                        ABOUT US
                    </NavItem>

                    <NavItem
                        href="#faq"
                        onClick={(e) => {
                            e.preventDefault();
                            goToAnchor("#faq");
                        }}
                        delay={0.3}
                    >
                        FAQ
                    </NavItem>

                    <motion.a
                        href={CONTACT_FORM_URL}
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(CONTACT_FORM_URL, "_blank", "noopener,noreferrer");
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.4 }}
                        className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6] cursor-pointer"
                    >
                        CONTACT US
                    </motion.a>

                    <NavItem disabled delay={0.5}>
                        TEAM
                    </NavItem>
                </div>

                {/* Brochure button on large screens */}
                {isLargeScreen && (
                    <div className="hidden md:flex">
                        <ImageButton
                            text="BROCHURE"
                            onClick={() => window.open("/Brochure.pdf", "_blank")}
                            style={{ fontSize: "16px" }}
                        />
                    </div>
                )}

                {/* Mobile hamburger / close */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile menu (collapsible) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold pb-4"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPath === "/") smoothScrollTo("#");
                                else navigate("/");
                                closeMobile();
                            }}
                            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                        >
                            HOME
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                goToAnchor("#about");
                                closeMobile();
                            }}
                            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                        >
                            ABOUT US
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                goToAnchor("#faq");
                                closeMobile();
                            }}
                            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                        >
                            FAQ
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(CONTACT_FORM_URL, "_blank", "noopener,noreferrer");
                                closeMobile();
                            }}
                            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
                        >
                            CONTACT US
                        </button>

                        <span className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide opacity-50 cursor-not-allowed">
                            TEAM
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
