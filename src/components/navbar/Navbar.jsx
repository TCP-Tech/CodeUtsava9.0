import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/codeutsava.png";
import ImageButton from "../button/TicketButton";

// Define the URLs for page navigation
const FAQ_PAGE_URL = "/faq";
const CONTACT_PAGE_URL = "/contact-us";
const EVENTS_PAGE_URL="/events";

// Define the external form URL (used only for the 'FEEDBACK' button)
const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

/**
 * Helper function for smooth scrolling to a target section.
 * Uses window.lenis if available (for sophisticated smooth scroll).
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
        destinationY = window.scrollY + rect.top - offset - 8; // small padding
    }

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
        // use global (slower) duration from App.jsx
        window.lenis.scrollTo(destinationY, { easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
        window.scrollTo({ top: destinationY, behavior: "smooth" });
    }
}

/**
 * Reusable component for desktop navigation items.
 * Handles both hash anchors (for smooth scrolling) and direct page links.
 */
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
        // Only prevent default and smooth scroll if the link starts with #
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

    // Helper component for mobile links
    const MobileNavLink = ({ href, children, onClick }) => (
        <a 
            href={href}
            // Logic to handle smooth scroll OR standard page navigation
            onClick={href?.startsWith("#") 
                ? (e) => { e.preventDefault(); smoothScrollTo(href); closeMobile(); } 
                : closeMobile
            }
            className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
        >
            {children}
        </a>
    );


    return (
        // The 'fixed' class ensures the navbar is always visible on scroll
        <div className="fixed top-0 inset-x-0 z-[9999]">
            <div className="mx-auto w-full">
                <nav className="bg-[#070f2f]/90 px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]">
                    <div className="flex items-center justify-between px-4 py-3">
                        
                        {/* Left: Logo + Feedback Button */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="font-arcade text-lg drop-shadow"
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollTo("#");
                                }}
                            >
                                <img src={logo} alt="Logo" className="h-12 w-auto" />
                            </a>

                            {isLargeScreen && (
                                <ImageButton
                                    text="FEEDBACK"
                                    onClick={() => window.open(CONTACT_FORM_URL, "_blank")}
                                    style={{ fontSize: "16px" }}
                                />
                            )}
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-6 text-white font-bold">
                            {/* SCROLL LINKS */}
                            <NavItem href="#" delay={0.1}>HOME</NavItem>
                            <NavItem href="#about" delay={0.2}>ABOUT US</NavItem>

                            {/* PAGE NAVIGATION LINKS */}
                            <NavItem href={FAQ_PAGE_URL} delay={0.3}>FAQ</NavItem>
                            <NavItem href={CONTACT_PAGE_URL} delay={0.4}>CONTACT US</NavItem>
                            <NavItem href={EVENTS_PAGE_URL} delay={0.5}>EVENTS</NavItem>
                            
                            {/* DISABLED LINK */}
                            <NavItem disabled delay={0.6}>TEAM</NavItem>
                        </div>

                        {/* Right: Brochure Button */}
                        {isLargeScreen && (
                            <div className="hidden md:flex">
                                <ImageButton
                                    text="BROCHURE"
                                    onClick={() => window.open("/Brochure.pdf", "_blank")}
                                    style={{ fontSize: "16px" }}
                                />
                            </div>
                        )}

                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden text-white text-2xl"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    {/* Mobile Menu (Animated with Framer Motion) */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold"
                            >
                                {/* SCROLL LINKS */}
                                <MobileNavLink href="#">HOME</MobileNavLink>
                                <MobileNavLink href="#about">ABOUT US</MobileNavLink>
                                
                                {/* PAGE NAVIGATION LINKS (Standard link behavior) */}
                                <MobileNavLink href={FAQ_PAGE_URL}>FAQ</MobileNavLink>
                                <MobileNavLink href={CONTACT_PAGE_URL}>CONTACT US</MobileNavLink>
                                
                                {/* DISABLED LINK */}
                                <span className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide opacity-50 cursor-not-allowed">TEAM</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </div>
    );
}