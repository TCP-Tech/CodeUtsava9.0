// src/pages/EventsPage.jsx
import React from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import Events from "../components/events/Events.jsx";
import Footer from "../components/footer/Footer.jsx";
import Fireworks from "../components/overlays/Fireworks.jsx";
import SparkleLayer from "../components/overlays/SparkleLayer.jsx";
import BackgroundMedia from "../components/background/Background.jsx";

import bg_image from "../assets/images/bg-part2.jpg";

export default function EventsPage() {
    return (
        <>
            {/* Global fixed background (same as Home) */}
            <BackgroundMedia
                imageSrc={bg_image}
                darken={0.5}
                className="bg-right"
            />

            {/* Overlay effects */}
            <div
                className="fixed inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 15 }}
            >
                <SparkleLayer />
                <Fireworks />
            </div>

            {/* Foreground content */}
            <main className="relative z-20 pt-32">
                <Events />
            </main>
        </>
    );
}
