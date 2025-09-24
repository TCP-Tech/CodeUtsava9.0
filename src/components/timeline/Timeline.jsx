import { useEffect, useRef } from "react";
import hackathonData from "../../assets/data/hackathonData.js";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import bg_image from "../../assets/images/bg.webp";
import bg_video from "../../assets/bg_video.webm";
import rollerCoasterUrl from "../../assets/images/rollercoaster.svg";
import BackgroundMedia from "../background/Background.jsx";

let TOP_OFFSET = 150;

const Timeline = () => {
    const cartRef = useRef(null);
    const lineRef = useRef(null);
    const bgRef = useRef(null);
    const overlayRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        let active = false;

        const handleScroll = () => {
            if (!active) return;
            if (!cartRef.current || !lineRef.current) return;

            const railRect = lineRef.current.getBoundingClientRect();
            const railTop = railRect.top + window.scrollY; // document coords
            const railHeight = railRect.height;

            const cartH = cartRef.current.offsetHeight || 0;
            const maxY = Math.max(0, railHeight - cartH);

            const vh = window.innerHeight;
            const scrollY = window.scrollY;

            // Start when viewport bottom meets rail top
            const start = railTop - vh + TOP_OFFSET;
            // End when we've scrolled enough for the cart to reach the bottom
            const end = railTop + railHeight - vh + TOP_OFFSET;

            // Calculate progress based on scroll position
            const scrollRange = Math.max(1, end - start);
            const raw = (scrollY - start) / scrollRange;
            const clamped = Math.max(0, Math.min(1, raw));

            // Apply the transform
            cartRef.current.style.transform = `translate(-50%, ${clamped * maxY
                }px)`;
        };

        const io = new IntersectionObserver(
            (entries) => {
                const anyVisible = entries.some((e) => e.isIntersecting);
                active = anyVisible;
                handleScroll()
            },
            { threshold: 0.1 }
        );

        // Observe the timeline section instead of individual cards for better performance
        const timelineSection = document.getElementById('timeline');
        if (timelineSection) {
            io.observe(timelineSection);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        const img = cartRef.current?.querySelector("img");
        if (img && !img.complete) img.addEventListener("load", handleScroll);

        // Initial call
        handleScroll();

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (img) img.removeEventListener("load", handleScroll);
        };
    }, []);

    return (
        <section
            id="timeline"
            className="relative w-full min-h-screen -mt-px pt-0 md:pt-0 pb-0 overflow-hidden"
            aria-label="Timeline"
        >
            {/* Background */}
            <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />
            <h2
                className="
          codeutsava__timeline-header
          text-3xl sm:texxt-4xl md:text-5xl lg:text-6xl text-center font-rye tracking-widest
          mt-10 mb-8
        "
                style={{ color: "white" }}
            >
                TIMELINE
            </h2>

            {/* Custom RAIL - Responsive positioning */}
            <div
                ref={lineRef}
                className="codeutsava__timeline-rail absolute left-8 md:left-1/2 md:-translate-x-1/2 w-[28px] rounded-lg pointer-events-none"
                style={{
                    top: TOP_OFFSET,
                    bottom: 50,
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0 28px, rgba(255,255,255,0.18) 28px 32px)",
                }}
            >
                {/* left neon rail */}
                <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[6px] rounded-full
               bg-gradient-to-b from-[var(--color-primary)]
               via-[var(--color-accent)] to-[var(--color-accent-2)]
               drop-shadow-[0_0_10px_rgba(30,144,255,0.35)]"
                />
                {/* right neon rail */}
                <span
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 w-[6px] rounded-full
               bg-gradient-to-b from-[var(--color-primary)]
               via-[var(--color-accent)] to-[var(--color-accent-2)]
               drop-shadow-[0_0_10px_rgba(255,0,153,0.28)]"
                />
            </div>

            {/* Cart - Responsive positioning */}
            <div
                ref={cartRef}
                className="
          codeutsava__timeline-cart
          absolute left-22 md:left-[808px] -translate-x-1/2 z-10
          transition-transform duration-75 ease-out
          pointer-events-none
        "
                style={{ top: TOP_OFFSET, transform: "translate(-50%, 0px)" }}
            >
                <img
                    src={rollerCoasterUrl}
                    alt="cart"
                    className="h-20 w-20 md:h-20 md:w-20"
                />
            </div>

            <VerticalTimeline
                className="codeutsava__timeline-container"
                animate
                lineColor="transparent"
            >
                {hackathonData.map((element, index) => (
                    <VerticalTimelineElement
                        key={index}
                        iconStyle={{ display: "none" }}
                        icon={<span />}
                        contentStyle={{
                            background: "transparent",
                            boxShadow: "none",
                            padding: 0,
                            border: "none",
                            marginTop: 70,
                        }}
                        contentClassName="!p-0 !bg-transparent !shadow-none"
                        date={element.date}
                        dateClassName="!text-white/95 !text-[16px] md:!text-[18px] lg:!text-[20px] !leading-tight tracking-wide font-semibold"
                        className="codeutsava__timeline-item"
                    >
                        <div className="codeutsava__timeline-card relative rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-accent-2)] shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
                            <div className="relative rounded-[inherit] bg-[color:var(--color-background)]/85 backdrop-blur-md ring-1 ring-white/10 px-6 py-5 md:px-8 md:py-6 text-white overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
                                <span
                                    aria-hidden="true"
                                    className="absolute left-[-12px] top-4 bottom-4 w-[6px] rounded-full
                             bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-accent-2)]
                             opacity-90 drop-shadow-[0_0_6px_rgba(30,144,255,0.35)]"
                                />
                                <h3 className="text-[20px] md:text-[22px] font-rye leading-tight">
                                    {element.id} {element.title}
                                </h3>
                                <h5 className="text-white/75 text-[14px] md:text-[16px] mt-1">
                                    {element.location}
                                </h5>
                                <p className="text-white/85 mt-4 md:mt-6 mb-6 md:mb-8 text-[15px] md:text-[16px] leading-relaxed">
                                    {element.description}
                                </p>
                            </div>
                        </div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </section>
    );
};

export default Timeline;