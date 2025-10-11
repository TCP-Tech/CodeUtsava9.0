import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/2.png";
import ImageButton from "../button/TicketButton";

const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

// Corrected Smooth scroll function for robustness
function smoothScrollTo(targetSelector) {
    const nav = document.querySelector("nav");
    const offset = nav ? nav.offsetHeight : 0;

    let destinationY = 0;

    // Rule 1: Always scroll to the top for the root, #, or #hero selectors
    if (!targetSelector || targetSelector === "#" || targetSelector === "#hero") {
        destinationY = 0;
    } else {
        // Rule 2: Find the target element for specific anchors (like #about)
        const el = document.querySelector(targetSelector);
        if (!el) {
            console.error(`Scroll target not found: ${targetSelector}. Ensure the component is rendered and has the correct ID.`);
            return;
        }

        const rect = el.getBoundingClientRect();

        // Calculate the absolute scroll position, then subtract navbar height and small padding
        // window.scrollY + rect.top gives the element's top position from document start
        destinationY = window.scrollY + rect.top - offset - 8;
    }

    // Use lenis if available, otherwise use native smooth scroll
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(destinationY, {
            easing: (t) => 1 - Math.pow(1 - t, 3)
        });
    } else {
        window.scrollTo({ top: destinationY, behavior: "smooth" });
    }
}

// NavItem component (using Framer Motion for smooth delayed entrance)
const NavItem = ({ children, href, onClick, className = "", disabled = false, delay = 0 }) => {
    const baseClasses = `px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition cursor-pointer ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-[#E4D0B6]"
        }`;

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === "/" || currentPath === "/home";

    const handleClick = (e) => {
        if (!disabled && href?.startsWith("#")) {
            e.preventDefault();
            if (isHomePage) {
                // Correctly initiates smooth scroll
                smoothScrollTo(href);
            } else {
                window.location.href = "/";
            }
        }
        if (onClick) onClick(e);
    };

    return (
        // Reverted back to motion.a to enable entrance animation
        <motion.a
            href={href}
            onClick={handleClick}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }} // Apply sequential delay and smooth transition
            className={baseClasses}
            aria-disabled={disabled}
        >
            {children}
        </motion.a>
    );
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });
    const closeMobile = () => setMobileOpen(false);

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === "/" || currentPath === "/home";

    // Mobile link helper
    const MobileNavLink = ({ href, children, disabled = false }) => (
        <a
            href={href}
            onClick={
                !disabled
                    ? href?.startsWith("#")
                        ? (e) => {
                            e.preventDefault();
                            if (isHomePage) smoothScrollTo(href);
                            else window.location.href = "/";
                            closeMobile();
                        }
                        : closeMobile
                    : undefined
            }
            className={`px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-[#E4D0B6]"
                }`}
        >
            {children}
        </a>
    );

    return (
        <div className="fixed top-0 inset-x-0 z-[9999]">
            <div className="mx-auto w-full">
                <nav className="bg-[#070f2f]/90 px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]">
                    <div className="flex items-center justify-between px-4 py-3 relative">
                        {/* Left: Logo + Feedback */}
                        <div className="flex items-center gap-4">
                            <a
                                href="/"
                                className="font-arcade text-lg drop-shadow"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isHomePage) {
                                        smoothScrollTo("#hero"); // Scroll to top
                                    } else {
                                        window.location.href = "/";
                                    }
                                }}
                            >
                                <img src={logo} alt="Logo" className="h-22 w-auto" />
                            </a>
                            {isLargeScreen && (
                                <ImageButton
                                    text="FEEDBACK"
                                    onClick={() => window.open(CONTACT_FORM_URL, "_blank")}
                                    style={{ fontSize: "16px" }}
                                />
                            )}
                        </div>

                        {/* Center: only for non-home pages */}
                        {!isHomePage && (
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <NavItem href="/" className="hover:border-b-2 hover:border-white hover:pb-[3px]">
                                    GO BACK TO HOME
                                </NavItem>
                            </div>
                        )}

                        {/* Desktop links for homepage */}
                        {isHomePage && isLargeScreen && (
                            <div className="hidden md:flex items-center gap-6 text-white font-bold">
                                {/* Applied sequential delay of 0.4 seconds between each item */}
                                <NavItem href="#hero" delay={0.0}>HOME</NavItem>
                                <NavItem href="#about" delay={0.3}>ABOUT US</NavItem>
                                <NavItem href="#faqs" delay={0.6}>FAQ</NavItem>
                                <NavItem href="/contact-us" delay={0.9}>CONTACT US</NavItem>
                                {/* <NavItem href="/events" delay={1.2}>EVENTS</NavItem>
                                <NavItem href="/teams" delay={1.5}>TEAM</NavItem> */}
                            </div>
                        )}

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
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold"
                            >
                                {isHomePage ? (
                                    <>
                                        <MobileNavLink href="#hero">HOME</MobileNavLink>
                                        <MobileNavLink href="#about">ABOUT US</MobileNavLink>
                                        <MobileNavLink href="/faq">FAQ</MobileNavLink>
                                        <MobileNavLink href="/contact-us">CONTACT US</MobileNavLink>
                                        {/* <MobileNavLink href="/events">EVENTS</MobileNavLink>
                                        <MobileNavLink href="/teams">TEAM</MobileNavLink> */}
                                    </>
                                ) : (
                                    <>
                                        <MobileNavLink href="/">GO BACK TO HOME</MobileNavLink>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </div>
    );
}
