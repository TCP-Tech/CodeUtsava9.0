import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/codeutsava.png";
import ImageButton from "../button/TicketButton";

const NavItem = ({ children, href = "#", onClick, delay = 0 }) => (
  <motion.a
    href={href}
    onClick={onClick}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="px-4 py-2 text-[1.1rem] rye-regular tracking-wide transition hover:text-[#E4D0B6]"
  >
    {children}
  </motion.a>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // lg breakpoint

  return (
    <div className="fixed top-0 inset-x-0 z-[99999]">
      <div className="mx-auto w-full">
        <nav className="bg-[#070f2f4b] px-4 md:px-20 border-b border-white/40 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.35)]">
          <div className="flex items-center justify-between px-4 py-3">

            {/* Left group: Logo + Feedback button */}
            <div className="flex items-center gap-4">
              <a href="#" className="font-arcade text-lg drop-shadow">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
              </a>

              {/* Ticket Button visible only on large screens */}
              {isLargeScreen && (
                <ImageButton
                  text="FEEDBACK"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSfHv8OJ7jkp9thPyPx1HrWJNPoGZ2z7FaFtIqpz7lO3dIqqgg/viewform?pli=1",
                      "_blank"
                    )
                  }
                  style={{ fontSize: "16px" }}
                />
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 text-white font-bold">
              <NavItem delay={0.1}>HOME</NavItem>
              <NavItem delay={0.2}>ABOUT US</NavItem>
              <NavItem delay={0.3}>FAQ</NavItem>
              <NavItem delay={0.4}>CONTACT US</NavItem>
              <NavItem delay={0.5}>TEAM</NavItem>
            </div>

            {/* Right group: Brochure button */}
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
                <NavItem onClick={() => setMobileOpen(false)}>HOME</NavItem>
                <NavItem onClick={() => setMobileOpen(false)}>ABOUT US</NavItem>
                <NavItem onClick={() => setMobileOpen(false)}>FAQ</NavItem>
                <NavItem onClick={() => setMobileOpen(false)}>CONTACT US</NavItem>
                <NavItem onClick={() => setMobileOpen(false)}>TEAM</NavItem>

                {/* Mobile Feedback / Brochure normal buttons */}
                <div className="flex flex-col gap-3 mt-2 w-full px-10 pb-4">
                  <button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/forms/...",
                        "_blank"
                      )
                    }
                    className="w-full py-2 px-4 rounded bg-[#E68B81] text-white font-rye font-bold"
                  >
                    FEEDBACK
                  </button>
                  <button
                    onClick={() => window.open("/Brochure.pdf", "_blank")}
                    className="w-full py-2 px-4 rounded bg-[#E68B81] text-white font-rye font-bold"
                  >
                    BROCHURE
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
}
