import { React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";

// Pages
import Home from "./pages/Home.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import EventsPage from "./pages/Events.jsx";
import Teams from "./pages/Teams.jsx";

// Global components
import ClickSoundProvider from "./utils/ClickSoundProvider.jsx";
import { AudioProvider } from "./utils/AudioProvider.jsx";
import Player from "./components/audioPlayer/player.jsx";
import CountDown from "./components/CountDown/CountDown.jsx";

export default function App() {
    // smooth scroll using lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,          // slower than before (was ~1.2)
            smooth: true,
            smoothTouch: true,
        });

        // expose globally so Navbar can call scrollTo
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            if (window.lenis === lenis) window.lenis = undefined;
            lenis.destroy();
        };
    }, []);

    return (
        <BrowserRouter>
            <AudioProvider>
                <ClickSoundProvider />
                <Player />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/team" element={<Teams />} />
                    {/* keep any other routes you need */}
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/timer" element={<CountDown />} />
                </Routes>
            </AudioProvider>
        </BrowserRouter>
    );
}
