// AboutUS.jsx
import React from "react";
import "./about.css";
import culogo from "../../assets/1.png";

export default function AboutUS() {
    const isSm = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
    const isMd = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    return (
        <section id="about" className="relative overflow-hidden py-16 md:py-28">
            {/* soft neon wash */}
            <div className="pointer-events-none absolute inset-0">
                <div className="neon-radial absolute -top-40 left-1/2 -translate-x-1/2 -z-10" />
            </div>

            <div className="relative z-0 max-w-7xl mx-auto px-4">
                <header className="text-center">
                    <h2 className="about-heading te text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)]  text-balance">
                        About&nbsp;Us
                    </h2>
                    <div className="mx-auto mt-3 neon-hr" />
                </header>

                <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Left: Image instead of 3D viewer */}
                    <div className="about-card p-[1px] rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
                        <div className="about-card__inner rounded-[inherit] ring-1 ring-white/10 overflow-hidden flex items-center justify-center bg-black/40">
                            <img
                                src={culogo}
                                alt="Carnival Logo"
                                className="w-full h-auto max-w-[400px] object-contain mx-auto"
                            />
                            <div className="pointer-events-none absolute inset-0 neon-frame-glow" />
                        </div>
                    </div>

                    {/* Right: copy */}
                    <div className="space-y-4 md:space-y-6 max-w-[65ch] mx-auto">
                        <article className="glass-card p-4 sm:p-6 md:p-7">
                            <p className="leading-[1.6] sm:leading-[1.58] md:leading-[1.55] text-[0.95rem] sm:text-base md:text-[1.03rem] text-white/95 text-pretty">
                                <span className="font-rye tracking-wide" style={{ letterSpacing: "0.06em" }}>
                                    <b className="hl-codeutsava">CODEUTSAVA</b>
                                </span>{" "}
                                is an annual event organized by the Turing Club of Programmers. It brings
                                together like-minded coders from across the nation to foster a thriving coding
                                culture with workshops, hackathons, gaming battles, MIC sessions, and more.
                            </p>
                        </article>

                        <article className="glass-card p-4 sm:p-6 md:p-7">
                            <p className="leading-[1.6] sm:leading-[1.58] md:leading-[1.55] text-[0.95rem] sm:text-base md:text-[1.03rem] text-white/95 text-pretty">
                                The heart of <b className="hl-codeutsava">CODEUTSAVA</b> is the{" "}
                                <b className="hl-event">28-hour hackathon</b>, where participants build
                                ambitious ideas at speed and scale. This year’s edition features a{" "}
                                <span className="hl-33l">33&nbsp;L+</span> prize pool including{" "}
                                <span className="hl-amount">1.5–2&nbsp;L</span> cash prizes.
                            </p>

                            <ul className="neon-bullets mt-4 sm:mt-5">
                                <li>28-hour hackathon</li>
                                <li>Workshops, MIC sessions &amp; mentorship</li>
                                <li>Gaming battles &amp; community showcases</li>
                                <li>Big prize pool &amp; industry partners</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
