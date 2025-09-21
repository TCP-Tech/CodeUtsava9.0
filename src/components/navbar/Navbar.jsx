import React from "react";
import { FiDownload as Download, FiMessageSquare as MessageSquare } from "react-icons/fi";
import logo from "../../assets/images/codeutsava.png"; // Ensure proper import path
import ImageButton from "../button/TicketButton"; // Your custom button

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
    <div className="fixed top-0 inset-x-0 z-40">
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
                  className="h-10 w-auto"
                />
              </a>

              {/* center: nav */}
              <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-2 py-1">
                <NavItem to="#hero">HOME</NavItem>
                <NavItem to="#about">ABOUT US</NavItem>
                <NavItem to="#faq">FAQ</NavItem>
                <NavItem to="#events">EVENTS</NavItem>
                <NavItem to="#contact">CONTACT US</NavItem>
                <NavItem to="#team">TEAM</NavItem>
              </div>

              {/* right: actions */}
              <div className="  font-rye  flex items-center gap-3">
                <ImageButton
                  text="FEEDBACK"
                  onClick={() => {
                    // Replace with your actual feedback action
                    alert("Feedback button clicked!");
                  }}
                  style={{
                    width: "160px",       // smaller width
                    height: "50px",       // smaller height
                    fontSize: "15px",     // smaller font
                    color: "#E68B81",     // darker font color
                    
                  }}
                />

                <ImageButton
                  text="BROCHURE"
                  onClick={() => {
                    // Open brochure PDF in new tab
                    window.open("/brochure.pdf", "_blank");
                  }}
                  style={{
                    width: "160px",       // smaller width
                    height: "50px",       // smaller height
                    fontSize: "15px",     // smaller font
                    color: "#E68B81",     // darker font color
                  }}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
