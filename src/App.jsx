import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
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
