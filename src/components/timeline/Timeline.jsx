import { useEffect, useRef } from "react";
import hackathonData from "../../assets/data/hackathonData.js";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import bg from "../../assets/images/bg.png";
import rollerCoasterUrl from "../../assets/images/rollercoaster.svg";

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
            const docEl = document.documentElement;
            const scrollMax =
                (docEl.scrollHeight || document.body.scrollHeight);

            // Start when viewport bottom meets rail top
            const start = railTop - (window.innerHeight - TOP_OFFSET);
            // End when the cart would reach the rail bottom, OR page end (whichever comes first)
            const end = Math.min(railTop + railHeight - cartH);

            const raw = (scrollY - start) / Math.max(1, end - start);
            const clamped = Math.max(0, Math.min(1, raw));

            cartRef.current.style.transform = `translate(-50%, ${
                clamped * maxY
            }px)`;
        };

        const io = new IntersectionObserver(
            (entries) => {
                const anyVisible = entries.some((e) => e.isIntersecting);
                active = anyVisible;
                handleScroll()
            },
            { threshold: 0.2 }
        );

        const cards = document.querySelectorAll(".codeutsava__timeline-card");
        cards.forEach((el) => io.observe(el));

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        const img = cartRef.current?.querySelector("img");
        if (img && !img.complete) img.addEventListener("load", handleScroll);

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
            <div
                ref={bgRef}
                className="fixed inset-0 -z-30 will-change-transform"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <div
                ref={overlayRef}
                className="absolute inset-0 -z-30 bg-black/90 will-change-transform"
            />
            <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(30,144,255,0.2) 0%, rgba(255,0,153,0.18) 55%, rgba(0,255,133,0.1) 100%)",
                    mixBlendMode: "overlay",
                }}
            />

            <h2
                className="
          codeutsava__timeline-header
          text-3xl md:text-5xl text-center font-arcade tracking-widest
          mt-10 mb-8
        "
                style={{ color: "var(--color-primary)" }}
            >
                TIMELINE
            </h2>

            {/* Custom RAIL */}
            <div
                ref={lineRef}
                className="codeutsava__timeline-rail absolute left-1/2 -translate-x-1/2 w-[28px] rounded-lg pointer-events-none"
                style={{
                    top: TOP_OFFSET,
                    bottom: 0,
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
            <div
                ref={cartRef}
                className="
          codeutsava__timeline-cart
          absolute left-[790px] -translate-x-1/2 z-10
          transition-transform duration-300 ease-out
          pointer-events-none
        "
                style={{ top: TOP_OFFSET, transform: "translate(-50%, 0px)" }}
            >
                <img
                    src={rollerCoasterUrl}
                    alt="cart"
                    className="h-12 w-12 md:h-14 md:w-14"
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
                        dateClassName="text-white/90 text-[18px] md:text-[20px] tracking-wide font-medium"
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
                                <h3 className="text-[20px] md:text-[22px] font-semibold leading-tight">
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
