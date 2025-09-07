import React from "react";
import { FiDownload as Download, FiMessageSquare as MessageSquare } from "react-icons/fi";
import logo from "../../assets/images/codeutsava.png"; // Ensure proper import path

const NavItem = ({ children, to = "#" }) => (
  <a
    href={to}
    className="px-4 py-2 rounded-md text-sm tracking-wide transition hover:opacity-90 cursor-pointer"
  >
    {children}
  </a>
);

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="mt-4 p-[1px] rounded-2xl"
          style={{ backgroundImage: "var(--brand-grad)" }}
        >
          <nav className="rounded-[14px] bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between px-4 py-3">
              {/* left: logo */}
              <a href="#home" className="font-arcade text-lg drop-shadow">
                <span className="bg-black/40 px-3 py-2 rounded-md border border-white/10">
                  CC
                </span>
              </a>
    return (
        // ⬇️ Was: fixed top-0 inset-x-0 z-50
        // Now absolute so it's positioned w.r.t. the Hero (its positioned ancestor)
        <div className="absolute top-0 inset-x-0 z-40">
            <div className="mx-auto max-w-7xl px-4">
                {/* slim gradient hairline + glass body */}
                <div
                    className="mt-4 p-[1px] rounded-2xl"
                    style={{ backgroundImage: "var(--brand-grad)" }}
                >
                    <nav className="rounded-[14px] bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                        <div className="flex items-center justify-between px-4 py-3">
                            {/* left: logo */}
                            <a href="#" className="font-arcade text-lg drop-shadow">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-10 w-auto" // adjust sizing as needed
                                />
                            </a>

              {/* center: nav */}
              <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-2 py-1">
                <NavItem to="#home">HOME</NavItem>
                <NavItem to="#about">ABOUT US</NavItem>
                <NavItem to="#faq">FAQ</NavItem>
                <NavItem to="#events">EVENTS</NavItem>
                <NavItem to="#contact">CONTACT US</NavItem>
                <NavItem to="#team">TEAM</NavItem>
              </div>

              {/* right: actions */}
              <div className="flex items-center gap-3">
                <a
                  href="#feedback"
                  className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-xl transition hover:opacity-90"
                  style={{ background: "var(--color-accent)" }}
                >
                  <MessageSquare className="shrink-0" /> FEEDBACK
                </a>
                <a
                  href="/brochure.pdf"
                  className="flex items-center gap-2 text-black font-semibold px-4 py-2 rounded-xl transition hover:opacity-90"
                  style={{ background: "var(--color-accent-2)" }}
                >
                  <Download className="shrink-0" /> BROCHURE
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
