// src/App.jsx
import { React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";

// Pages
import Home from "./pages/Home.jsx";
import EventsPage from "./pages/Events.jsx";
import FAQ from "./pages/FAQ.jsx";

import ClickSoundProvider from "./utils/ClickSoundProvider.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

export default function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.8,
            smooth: true,
            smoothTouch: true,
        });
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
            <ScrollToTop />
            <ClickSoundProvider />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
        </BrowserRouter>
    );
}
