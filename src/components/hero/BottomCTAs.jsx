import React, { useEffect, useState } from "react";

export default function BottomCTAs() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer"); // adjust selector if needed
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting); // hide CTAs if footer visible
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-40 
                  flex flex-col md:flex-row gap-4 px-4 
                  transition-opacity duration-500 
                  ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <a
        href="#"
        className="pointer-events-auto px-5 py-3 rounded-xl shadow-lg font-semibold transition hover:opacity-95 animate-soft-pulse"
        style={{
          background: "var(--color-muted)",
          color: "var(--color-background)",
        }}
      >
        Apply with Devfolio
      </a>

      <a
        href="#"
        className="pointer-events-auto bg-black/60 border text-[color:var(--color-muted)] px-5 py-3 rounded-xl shadow-lg transition hover:scale-[1.02]"
        style={{
          borderColor:
            "color-mix(in srgb, var(--color-primary) 60%, white 40%)",
        }}
      >
        STEPS TO REGISTER ON DEVFOLIO
      </a>
    </div>
  );
}
