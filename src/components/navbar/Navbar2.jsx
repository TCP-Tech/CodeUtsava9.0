import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/codeutsava.png";
import ImageButton from "../button/TicketButton";

// External URLs
const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1";

// Smooth scroll (optional, only used if needed)
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
    window.lenis.scrollTo(destinationY, { easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    window.scrollTo({ top: destinationY, behavior: "smooth" });
  }
}

const NavItem = ({ children, href, onClick, delay = 0, className = "" }) => {
  const baseClasses = `px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6] cursor-pointer ${className}`;

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
      className={baseClasses}
    >
      {children}
    </motion.a>
  );
};


export default function NavbarSimple() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const closeMobile = () => setMobileOpen(false);

  const MobileNavLink = ({ href, children }) => (
    <a
      href={href}
      onClick={href?.startsWith("#") ? (e) => { e.preventDefault(); smoothScrollTo(href); closeMobile(); } : closeMobile}
      className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
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
                onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}
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

            {/* Center: Go Back to Home */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <NavItem href="/" className="hover:border-b-2 hover:border-white hover:pb-[3px]">GO BACK TO HOME</NavItem>
            </div>

            {/* Right: Brochure */}
            {isLargeScreen && (
              <div>
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
                <MobileNavLink href="/">GO BACK TO HOME</MobileNavLink>
                <MobileNavLink href="#">{/* Optional feedback/brochure */}</MobileNavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
}
