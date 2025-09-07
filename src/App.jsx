import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";

export default function App() {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <Navbar />
            <Hero />
        </div>
    );
}
