import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Intro from "./components/intro/Intro.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Contact from "./components/contact/Contact.jsx";
import Sponsors from "./components/sponsors/Spons.jsx";
import Footer from "./components/footer/Footer.jsx";
import BottomCTAs from "./components/hero/BottomCTAs.jsx";
import RightRail from "./components/hero/RightRail.jsx";
import SocialRail from "./components/hero/SocialRail.jsx";
import Lenis from "@studio-freight/lenis";   //Lenis for smooth scrolling



function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {location.pathname !== "/" && <Navbar />}

      {/* Main content grows to fill space */}
      <main className="flex-grow overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/spons" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add other routes here */}
        </Routes>
      </main>

      {/* Footer */}
      {location.pathname !== "/" && <Footer />}

      {/* Floating overlays */}
      {location.pathname !== "/" && <BottomCTAs />}
      {location.pathname !== "/" && <RightRail />}
      {location.pathname !== "/" && <SocialRail />}
    </div>
  );
}

export default function App() {


  //smooth scroll using lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true, // enable smooth scroll on touchpads/laptops
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
      <Layout />
    </BrowserRouter>
  );
}