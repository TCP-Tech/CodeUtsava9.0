import { useEffect, useRef, useState } from "react";
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

// Custom hook to detect visibility
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

const Timeline = () => {
  const cartRef = useRef(null);
  const lineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (mobile + tablet up to 1170px vs desktop)
  useEffect(() => {
    const checkBreakpoints = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 1170);
    };

    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints, { passive: true });
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  useEffect(() => {
    let active = false;

    const handleScroll = () => {
      if (!active) return;
      if (!cartRef.current || !lineRef.current) return;

      const railRect = lineRef.current.getBoundingClientRect();
      const railTop = railRect.top + window.scrollY;
      const railHeight = railRect.height;

      const cartH = cartRef.current.offsetHeight || 0;
      const maxY = Math.max(0, railHeight - cartH);

      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // TOP_OFFSET responsive: mobile/tablet vs desktop
      const TOP_OFFSET = isMobile ? 100 : 150;

      const start = railTop - vh + TOP_OFFSET;
      const end = railTop + railHeight - vh + TOP_OFFSET;

      const scrollRange = Math.max(1, end - start);
      const raw = (scrollY - start) / scrollRange;
      const clamped = Math.max(0, Math.min(1, raw));

      // transform only Y (X handled by CSS classes)
      cartRef.current.style.transform = `translateY(${clamped * maxY}px)`;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        active = anyVisible;
        handleScroll();
      },
      { threshold: 0.12 }
    );

    const timelineSection = document.getElementById("timeline");
    if (timelineSection) {
      io.observe(timelineSection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const img = cartRef.current?.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", handleScroll);

    // initial call
    handleScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (img) img.removeEventListener("load", handleScroll);
    };
  }, [isMobile]);

  // Calculate responsive positions
  const getTopOffset = () => {
    return isMobile ? 100 : 150;
  };

  const getCartPositionClass = () => {
    // mobile & tablet: centered on rail at left, desktop: centered on page
    if (isMobile) return "left-[37px] -translate-x-1/2"; // centered on 20px rail with slight right adjustment
    return "left-1/2 -translate-x-1/2";
  };

  const getRailPositionClass = () => {
    if (isMobile) return "left-6";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <section
      id="timeline"
      className="relative w-full min-h-screen pb-12 sm:pb-16 md:pb-20 overflow-hidden"
      aria-label="Timeline"
    >
      {/* Background */}
      <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />

      <h2
       className="text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] p-12"
      >
        TIMELINE
      </h2>

      {/* Custom RAIL - Responsive positioning */}
      <div
        ref={lineRef}
        className={`
          absolute ${getRailPositionClass()} 
          w-[20px] sm:w-[24px] md:w-[28px] 
          rounded-lg pointer-events-none
        `}
        style={{
          top: getTopOffset(),
          bottom: 50,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 28px, rgba(255,255,255,0.18) 28px 32px)",
        }}
      >
        {/* Left neon rail */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 
               w-[4px] sm:w-[5px] md:w-[6px] 
               rounded-full
               bg-gradient-to-b from-[var(--color-primary)]
               via-[var(--color-accent)] to-[var(--color-accent-2)]
               drop-shadow-[0_0_8px_rgba(30,144,255,0.35)]
               md:drop-shadow-[0_0_10px_rgba(30,144,255,0.35)]"
        />
        {/* Right neon rail */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 
               w-[4px] sm:w-[5px] md:w-[6px] 
               rounded-full
               bg-gradient-to-b from-[var(--color-primary)]
               via-[var(--color-accent)] to-[var(--color-accent-2)]
               drop-shadow-[0_0_8px_rgba(255,0,153,0.28)]
               md:drop-shadow-[0_0_10px_rgba(255,0,153,0.28)]"
        />
      </div>

      {/* Cart - Responsive size and position */}
      <div
        ref={cartRef}
        className={`
          absolute ${getCartPositionClass()} 
          z-[2]
          transition-transform duration-75 ease-out
          pointer-events-none
        `}
        style={{
          top: getTopOffset(),
          // Y transform set in scroll handler
          transform: "translateY(0px)",
        }}
      >
        <img
          src={rollerCoasterUrl}
          alt="cart"
          className="
            h-12 w-12 
            xs:h-14 xs:w-14 
            sm:h-16 sm:w-16 
            md:h-20 md:w-20
            drop-shadow-lg
          "
        />
      </div>

      <VerticalTimeline
        className="codeutsava__timeline-container !px-2 sm:!px-4 md:!px-6"
        animate
        lineColor="transparent"
      >
        {hackathonData.map((element, index) => {
          const [cardRef, visible] = useInView({ threshold: 0.15 });

          return (
            <VerticalTimelineElement
              key={index}
              iconStyle={{ display: "none" }}
              contentStyle={{
                background: "transparent",
                boxShadow: "none",
                padding: 0,
                border: "none",
                marginTop: isMobile ? 0 : 70,
              }}
              contentClassName="!p-0 !bg-transparent !shadow-none"
              date={element.date}
              dateClassName="
                !text-white/95 
                !text-base xs:!text-lg sm:!text-xl md:!text-2xl lg:!text-2xl md:text-center
                !font-semibold
                !pl-2 sm:!pl-0
              "
              className="codeutsava__timeline-item"
            >
              <div
                ref={cardRef}
                className={`
                  transition-all duration-700 ease-out transform
                  ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : isMobile
                      ? "opacity-0 translate-x-10"
                      : index % 2 === 0
                      ? "opacity-0 -translate-x-20"
                      : "opacity-0 translate-x-20"
                  }
                `}
              >
                <div
                  className="
                    relative rounded-xl sm:rounded-2xl 
                    p-[1px] 
                    bg-gradient-to-r from-[var(--color-primary)] 
                    via-[var(--color-accent)] to-[var(--color-accent-2)] 
                    shadow-lg sm:shadow-xl md:shadow-[0_10px_28px_rgba(0,0,0,0.45)]
                  "
                >
                  <div
                    className="
                      relative rounded-[inherit] 
                      bg-[color:var(--color-background)]/85 
                      backdrop-blur-md 
                      ring-1 ring-white/10 
                      px-4 py-4 
                      xs:px-5 xs:py-4
                      sm:px-6 sm:py-5 
                      md:px-8 md:py-6 
                      text-white
                    "
                  >
                    <h3
                      className="
                        text-base xs:text-lg sm:text-xl md:text-2xl 
                        font-rye 
                        leading-tight
                        break-words
                      "
                    >
                      {element.id} {element.title}
                    </h3>
                    <h5
                      className="
                        text-white/75 
                        text-xs xs:text-sm sm:text-base 
                        mt-1 sm:mt-1.5
                        break-words
                      "
                    >
                      {element.location}
                    </h5>
                    <p
                      className="
                        text-white/85 
                        mt-3 sm:mt-4 md:mt-6 
                        mb-4 sm:mb-6 md:mb-8 
                        text-xs xs:text-sm sm:text-base 
                        leading-relaxed
                        break-words
                      "
                    >
                      {element.description}
                    </p>
                  </div>
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>

      {/* Add custom styles for mobile/tablet */}
      <style jsx>{`
        @media (max-width: 1170px) {
        .vertical-timeline {
            margin: -2rem auto !important;
            padding: 0 !important;
        }
          .vertical-timeline::before {
            left: 24px !important;
          }
          .vertical-timeline-element-content {
            margin-left: 60px !important;
            margin-top: 10px !important;
            margin-bottom: 10px !important;
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }
          .vertical-timeline-element-date {
            left: auto !important;
            right: auto !important;
            text-align: left !important;
            margin-left: 60px !important;
            margin-top: 0px !important;
            margin-bottom: 0px !important;
            position: relative !important;
          }
        }
        @media (max-width: 640px) {
          .vertical-timeline-element-content {
            margin-left: 40px !important;
            margin-top: 6px !important;
            margin-bottom: 6px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
          .vertical-timeline-element-date {
            margin-left: 40px !important;
            margin-top: 0px !important;
            margin-bottom: 0px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;