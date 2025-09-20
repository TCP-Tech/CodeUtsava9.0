import {React,useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Intro from "./components/intro/Intro.jsx";
import Lenis from "lenis"; 
import Home from "./pages/home/Home.jsx"
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Footer from "./components/footer/Footer.jsx";
import BottomCTAs from "./components/hero/BottomCTAs.jsx";
import RightRail from "./components/hero/RightRail.jsx";
import SocialRail from "./components/hero/SocialRail.jsx";


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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
