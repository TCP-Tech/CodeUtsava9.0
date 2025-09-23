import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";

// Pages
import Home from "./pages/home/Home.jsx";
import FAQ from "./pages/FAQ.jsx";
// import Contact from "./pages/Contact.jsx";
// import Team from "./pages/Team.jsx";

// Components
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";

export default function App() {
  // Smooth scroll using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/team" element={<Team />} /> */}
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}
