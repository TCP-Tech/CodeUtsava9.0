import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Intro from "./components/intro/Intro.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Footer from "./components/footer/Footer.jsx";
import BottomCTAs from "./components/hero/BottomCTAs.jsx";
import RightRail from "./components/hero/RightRail.jsx";
import SocialRail from "./components/hero/SocialRail.jsx";

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
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
