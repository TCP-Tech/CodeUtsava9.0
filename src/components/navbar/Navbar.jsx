import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/2.png";
import logo2 from "../../assets/1.png";
import ImageButton from "../button/TicketButton";

const CONTACT_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

function smoothScrollTo(targetSelector) {
    const nav = document.querySelector("nav");
    const offset = nav ? nav.offsetHeight : 0;
    let destinationY = 0;

    if (!targetSelector || targetSelector === "#" || targetSelector === "#hero") {
        destinationY = 0;
    } else {
        const el = document.querySelector(targetSelector);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        destinationY = window.scrollY + rect.top - offset - 8;
    }

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(destinationY, { easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
        window.scrollTo({ top: destinationY, behavior: "smooth" });
    }
}

const NavItem = ({ children, href, onClick, className = "", disabled = false, delay = 0 }) => {
    const baseClasses = `px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:text-[#E4D0B6]"
    }`;

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === "/" || currentPath === "/home";

    const handleClick = (e) => {
        if (!disabled && href?.startsWith("#")) {
            e.preventDefault();
            if (isHomePage) smoothScrollTo(href);
            else window.location.href = "/";
        }
        if (onClick) onClick(e);
    };

    return (
        <motion.a
            href={href}
            onClick={handleClick}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
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
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === "/" || currentPath === "/home";

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
                              setMobileOpen(false);
                          }
                        : () => setMobileOpen(false)
                    : undefined
            }
            className={`px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition cursor-pointer ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:text-[#E4D0B6]"
            }`}
        >
            {children}
        </a>
    );

    return (
        <div className="fixed top-0 inset-x-0 z-[9999]">
            <div className="mx-auto w-full">
                <nav className="bg-[#070f2f]/90 px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]">
                    <div className="flex items-center justify-between relative py-3">
                        {/* Left: Hamburger on mobile or Main logo on desktop */}
                        {!isLargeScreen ? (
                            <button
                                className="text-white text-4xl"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            >
                                {mobileOpen ? <FiX /> : <FiMenu />}
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <a
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#hero");
                                    }}
                                >
                                    <img src={logo} alt="Logo" className="h-22 w-auto" />
                                </a>
                                <ImageButton
                                    text="FEEDBACK"
                                    onClick={() => window.open(CONTACT_FORM_URL, "_blank")}
                                    style={{ fontSize: "16px" }}
                                />
                            </div>
                        )}

                        {/* Center: Main logo on mobile */}
                        {!isLargeScreen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <a
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#hero");
                                        setMobileOpen(false);
                                    }}
                                >
                                    <img src={logo} alt="Logo" className="h-22 w-auto" />
                                </a>
                            </div>
                        )}

                        {/* Right: Desktop Brochure + Logo2 OR Mobile Logo2 */}
                        <div className="flex items-center gap-4 ml-auto">
                            {isLargeScreen ? (
                                <>
                                    <ImageButton
                                        text="BROCHURE"
                                        onClick={() => window.open("/Brochure.pdf", "_blank")}
                                        style={{ fontSize: "16px" }}
                                    />
                                    <a
                                        href="/"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            smoothScrollTo("#hero");
                                        }}
                                    >
                                        <img src={logo2} alt="Logo 2" className="h-20 w-auto mt-2" />
                                    </a>
                                </>
                            ) : (
                                <a
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo("#hero");
                                    }}
                                >
                                    <img src={logo2} alt="Logo 2" className="h-18 w-auto mt-0" />
                                </a>
                            )}
                        </div>

                        {/* Desktop nav links */}
                        {isHomePage && isLargeScreen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-white font-bold">
                                <NavItem href="#hero" delay={0.0}>
                                    HOME
                                </NavItem>
                                <NavItem href="#about" delay={0.3}>
                                    ABOUT US
                                </NavItem>
                                <NavItem href="#faqs" delay={0.6}>
                                    FAQ
                                </NavItem>
                                <NavItem href="/contact-us" delay={0.9}>
                                    CONTACT US
                                </NavItem>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {!isLargeScreen && mobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold mt-2"
                            >
                                {isHomePage ? (
                                    <>
                                        <MobileNavLink href="#hero">HOME</MobileNavLink>
                                        <MobileNavLink href="#about">ABOUT US</MobileNavLink>
                                        <MobileNavLink href="#faqs">FAQ</MobileNavLink>
                                        <MobileNavLink href="/contact-us">CONTACT US</MobileNavLink>
                                    </>
                                ) : (
                                    <MobileNavLink href="/">GO BACK TO HOME</MobileNavLink>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </div>
    );
}
