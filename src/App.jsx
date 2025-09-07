import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Intro from "./components/intro/Intro.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
<<<<<<< HEAD
import About from "./pages/home/AboutUs.jsx";
import Events from "./pages/events/Events.jsx";
import FAQ from "./pages/FAQ.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section id="home" className="min-h-screen">
        <Hero />
      </section>

      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="faq" className="min-h-screen">
        <FAQ />
      </section>

    <section id="events" className="min-h-screen">
        <Events />
      </section>
    </div>
  );
}
=======
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
>>>>>>> upstream/dev
