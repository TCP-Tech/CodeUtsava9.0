import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import About from "./pages/home/AboutUs.jsx";
import FAQ from "./pages/FAQ.jsx";
// import Events from "./pages/events/Events.jsx";
import AnalyticsSection from "./pages/graphs.jsx";
import Participation from "./pages/Participation.jsx";
import Guide from "./components/guidelines/Guide.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Participation/>
      <About />
      <Guide/>
      <FAQ/>
      {/* <Events/> */}
      <AnalyticsSection/>
    </div>
  );
}