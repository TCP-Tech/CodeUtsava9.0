import React, { useState } from "react";
import { FiDownload as Download, FiMessageSquare as MessageSquare, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/codeutsava.png";
import ImageButton from "../button/TicketButton";

const NavItem = ({ children, to = "#", onClick, delay = 0 }) => (
  <motion.a
    href={to}
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

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="mt-4 p-[1px] rounded-2xl"
          style={{ backgroundImage: "var(--brand-grad)" }}
        >
          <nav className="rounded-[14px] bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between px-4 py-3">
              
              {/* Left: Logo + Feedback */}
              <div className="flex items-center gap-4">
                <a href="#" className="font-arcade text-lg drop-shadow">
                  <img src={logo} alt="Logo" className="h-10 w-auto" />
                </a>

                <ImageButton
                  text="FEEDBACK"
                  onClick={() => alert("Feedback button clicked!")}
                  style={{
                    width: "160px",
                    height: "50px",
                    fontSize: "15px",
                    color: "#E68B81",
                  }}
                />
              </div>

              {/* Center: Nav links */}
              <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-2 py-1">
                <NavItem to="#hero" delay={0.1}>HOME</NavItem>
                <NavItem to="#about" delay={0.2}>ABOUT US</NavItem>
                <NavItem to="#faq" delay={0.3}>FAQ</NavItem>
                <NavItem to="#events" delay={0.4}>EVENTS</NavItem>
                <NavItem to="#contact" delay={0.5}>CONTACT US</NavItem>
                <NavItem to="#team" delay={0.6}>TEAM</NavItem>
              </div>

              {/* Right: Brochure */}
              <ImageButton
                text="BROCHURE"
                onClick={() => window.open("/brochure.pdf", "_blank")}
                style={{
                  width: "160px",
                  height: "50px",
                  fontSize: "15px",
                  color: "#E68B81",
                }}
              />

              {/* Mobile Hamburger */}
              <button
                className="md:hidden text-white text-2xl ml-2"
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
                  className="flex flex-col items-center gap-4 overflow-hidden md:hidden text-white font-semibold px-4 pb-4"
                >
                  <NavItem to="#hero" onClick={() => setMobileOpen(false)}>HOME</NavItem>
                  <NavItem to="#about" onClick={() => setMobileOpen(false)}>ABOUT US</NavItem>
                  <NavItem to="#faq" onClick={() => setMobileOpen(false)}>FAQ</NavItem>
                  <NavItem to="#events" onClick={() => setMobileOpen(false)}>EVENTS</NavItem>
                  <NavItem to="#contact" onClick={() => setMobileOpen(false)}>CONTACT US</NavItem>
                  <NavItem to="#team" onClick={() => setMobileOpen(false)}>TEAM</NavItem>

                  <div className="flex justify-center gap-4 mt-2 w-full px-10">
                    <ImageButton
                      text="FEEDBACK"
                      onClick={() => alert("Feedback button clicked!")}
                      style={{
                        width: "160px",
                        height: "50px",
                        fontSize: "15px",
                        color: "#E68B81",
                      }}
                    />
                    <ImageButton
                      text="BROCHURE"
                      onClick={() => window.open("/brochure.pdf", "_blank")}
                      style={{
                        width: "160px",
                        height: "50px",
                        fontSize: "15px",
                        color: "#E68B81",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
    </div>
  );
}
