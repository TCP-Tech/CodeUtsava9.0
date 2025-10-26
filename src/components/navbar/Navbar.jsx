import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

    if (
        !targetSelector ||
        targetSelector === "#" ||
        targetSelector === "#hero"
    ) {
        destinationY = 0;
    } else {
        const el = document.querySelector(targetSelector);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        destinationY = window.scrollY + rect.top - offset - 8;
    }

    if (window.lenis && typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(destinationY, {
            easing: (t) => 1 - Math.pow(1 - t, 3),
        });
    } else {
        window.scrollTo({ top: destinationY, behavior: "smooth" });
    }
}

const NavItem = ({
    children,
    href,
    onClick,
    className = "",
    disabled = false,
    delay = 0,
}) => {
    const baseClasses = `px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition-all duration-300 cursor-pointer ${disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:text-[#E4D0B6] hover:scale-105"
        }`;

    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage =
        location.pathname === "/" || location.pathname === "/home";

    const handleClick = (e) => {
        e.preventDefault();
        if (disabled) return;

        if (href?.startsWith("#")) {
            if (isHomePage) smoothScrollTo(href);
            else navigate("/", { state: { scrollTo: href } });
        } else {
            navigate(href);
        }
        if (onClick) onClick(e);
    };

    return (
        <motion.span
            onClick={handleClick}
            initial={{ opacity: 0, y: -30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                y: -3,
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" },
            }}
            className={baseClasses}
        >
            {children}
        </motion.span>
    );
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage =
        location.pathname === "/" || location.pathname === "/home";

    const MobileNavLink = ({ href, children, disabled = false }) => (
        <span
            onClick={() => {
                if (disabled) return;
                if (href?.startsWith("#")) {
                    if (isHomePage) smoothScrollTo(href);
                    else navigate("/", { state: { scrollTo: href } });
                } else {
                    navigate(href);
                }
                setMobileOpen(false);
            }}
            className={`px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition cursor-pointer ${disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-[#E4D0B6]"
                }`}
        >
            {children}
        </span>
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
                                aria-label={
                                    mobileOpen ? "Close menu" : "Open menu"
                                }
                            >
                                {mobileOpen ? <FiX /> : <FiMenu />}
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/"
                                    onClick={() => smoothScrollTo("#hero")}
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-14 w-auto"
                                    />
                                </Link>
                                <ImageButton
                                    text="FEEDBACK"
                                    onClick={() =>
                                        window.open(CONTACT_FORM_URL, "_blank")
                                    }
                                    style={{ fontSize: "16px" }}
                                />
                            </div>
                        )}

                        {/* Center: Main logo on mobile */}
                        {!isLargeScreen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <Link
                                    to="/"
                                    onClick={() => {
                                        smoothScrollTo("#hero");
                                        setMobileOpen(false);
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-14 w-auto"
                                    />
                                </Link>
                            </div>
                        )}

                        {/* Right: Desktop Brochure + Logo2 OR Mobile Logo2 */}
                        <div className="flex items-center gap-4 ml-auto">
                            {isLargeScreen ? (
                                <>
                                    <ImageButton
                                        text="BROCHURE"
                                        onClick={() =>
                                            window.open(
                                                "/Brochure.pdf",
                                                "_blank"
                                            )
                                        }
                                        style={{ fontSize: "16px" }}
                                    />
                                    <Link
                                        to="/"
                                        onClick={() => smoothScrollTo("#hero")}
                                    >
                                        <img
                                            src={logo2}
                                            alt="Logo 2"
                                            className="h-14 w-auto mt-2"
                                        />
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/"
                                    onClick={() => smoothScrollTo("#hero")}
                                >
                                    <img
                                        src={logo2}
                                        alt="Logo 2"
                                        className="h-14 w-auto mt-0"
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Desktop nav links */}
                        {/* {isHomePage && isLargeScreen && (
                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-white font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <NavItem href="#hero" delay={0.1}>
                                    HOME
                                </NavItem>
                                <NavItem href="#about" delay={0.2}>
                                    ABOUT US
                                </NavItem>
                                <NavItem href="#faqs" delay={0.3}>
                                    FAQ
                                </NavItem>
                                <NavItem href="/contact-us" delay={0.4}>
                                    CONTACT US
                                </NavItem>
                                <NavItem href="/teams" delay={0.5}>
                                    TEAM
                                </NavItem>
                            </motion.div>
                        )} */}
                        {/* Desktop nav links or "Back to Home" */}
                        {isLargeScreen &&
                            (isHomePage ? (
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-white font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <NavItem href="#hero" delay={0.1}>
                                        HOME
                                    </NavItem>
                                    <NavItem href="#about" delay={0.2}>
                                        ABOUT US
                                    </NavItem>
                                    <NavItem href="#faqs" delay={0.3}>
                                        FAQ
                                    </NavItem>
                                    <NavItem href="/contact-us" delay={0.4}>
                                        CONTACT US
                                    </NavItem>
                                    <NavItem href="/team" delay={0.5}>
                                        TEAM
                                    </NavItem>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <NavItem href="/" delay={0.2}>
                                        BACK TO HOME
                                    </NavItem>
                                </motion.div>
                            ))}
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {!isLargeScreen && mobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, y: -10 }}
                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.25, 0.3, 0.35, 0.4],
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                }}
                                className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold mt-2"
                            >
                                {isHomePage ? (
                                    <>
                                        <MobileNavLink href="#hero">
                                            HOME
                                        </MobileNavLink>
                                        <MobileNavLink href="#about">
                                            ABOUT US
                                        </MobileNavLink>
                                        <MobileNavLink href="#faqs">
                                            FAQ
                                        </MobileNavLink>
                                        <MobileNavLink href="/contact-us">
                                            CONTACT US
                                        </MobileNavLink>
                                        <MobileNavLink href="/team">
                                            TEAM
                                        </MobileNavLink>
                                    </>
                                ) : (
                                    <MobileNavLink href="/">
                                        GO BACK TO HOME
                                    </MobileNavLink>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </div>
    );
}
