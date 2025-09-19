import React from "react";
import { Link } from "react-router-dom";
import FWClickOnly from "/src/components/overlays/FW(ClickOnly).jsx";
import NIT from "../../assets/images/NIT.webp";
import tcpName from "../../assets/images/tcpName.png";
import codeutsava from "../../assets/images/codeutsava.png";

const Footer = () => {
  return (
    
    <footer
      className="w-full relative backdrop-blur-lg bg-black/40 
                 text-gray-300 px-6 sm:px-12 lg:px-20 py-12 
                 border-t border-white/10"
    >
      
      <FWClickOnly/>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logos */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={codeutsava}
            alt="CodeUtsava"
            className="h-14 sm:h-16 object-contain drop-shadow-lg"
          />
          <img
            src={tcpName}
            alt="TCP"
            className="h-10 sm:h-12 object-contain drop-shadow-lg"
          />
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/codeutsava/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/codeutsavanitrr/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:scale-110 hover:text-pink-400 hover:drop-shadow-[0_0_8px_#ec4899]"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/TCP-Tech"
              target="_blank"
              rel="noreferrer"
              className="transition hover:scale-110 hover:text-green-400 hover:drop-shadow-[0_0_8px_#22c55e]"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/codeutsavanitrr?lang=en"
              target="_blank"
              rel="noreferrer"
              className="transition hover:scale-110 hover:text-blue-300 hover:drop-shadow-[0_0_8px_#60a5fa]"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/codeutsava/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:scale-110 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
          <p className="text-sm font-light">
            For more updates, follow us on social media.
          </p>
        </div>
      </div>

      {/* Middle Section */}
     {/* Middle Section */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
  {/* About NIT Raipur */}
  <div className="flex gap-4 items-start">
    <img
      src={NIT}
      alt="NIT Raipur"
      className="h-20 w-20 object-contain drop-shadow-lg"
    />
    <div>
      <h4 className="text-lg font-arcade text-white uppercase tracking-wider">
        About NIT Raipur
      </h4>
      <p className="text-sm text-gray-300 mt-2 leading-relaxed font-sans">
        The institute is committed to the challenging task of development
        of technical education by preparing seasoned graduates in highly
        sophisticated field of engineering and technology. For about five
        decades we have been doing it with sincerity and commitment at NIT
        Raipur.
      </p>
    </div>
  </div>

  {/* Quick Links Vertical (right side naturally) */}
  <div className="flex flex-col gap-4 md:items-end font-arcade text-white">
    <Link
  to="/hero"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="hover:text-blue-400 transition hover:drop-shadow-[0_0_6px_#3b82f6]"
>
  Home
</Link>
    <Link
      to="/events"
      className="hover:text-pink-400 transition hover:drop-shadow-[0_0_6px_#ec4899]"
    >
      Events
    </Link>
    <Link
      to="/speakers"
      className="hover:text-green-400 transition hover:drop-shadow-[0_0_6px_#22c55e]"
    >
      Speakers
    </Link>
    <Link
      to="/faqs"
      className="hover:text-blue-300 transition hover:drop-shadow-[0_0_6px_#60a5fa]"
    >
      FAQ
    </Link>
    <Link
      to="/contactus"
      className="hover:text-pink-300 transition hover:drop-shadow-[0_0_6px_#f472b6]"
    >
      Contact Us
    </Link>
  </div>
</div>


      {/* Bottom Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light">
        {/* TCP Credit */}
        <div>
          Architected with <span className="text-pink-400">❤️</span> by{" "}
          <Link
            to="/team"
            className="hover:text-green-400 hover:drop-shadow-[0_0_6px_#22c55e] transition"
          >
            TCP Team
          </Link>
        </div>

        {/* Back to Top */}
        <a
          href="#home"
          className="flex items-center hover:text-blue-400 hover:drop-shadow-[0_0_6px_#3b82f6] transition"
        >
          Back to Top
          <i className="fas fa-arrow-up ml-2"></i>
        </a>

        {/* Map Link */}
        <a
          href="https://www.google.com/maps/place/National+Institute+of+Technology(NIT),+Raipur..."
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:text-green-400 hover:drop-shadow-[0_0_6px_#22c55e] transition"
        >
          <i className="fas fa-map-marker-alt mr-2"></i>
          View Map Location
        </a>
      </div>
    </footer>
  );
};

export default Footer;
