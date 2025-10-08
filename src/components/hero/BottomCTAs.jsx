import React, { useEffect, useState } from "react";
import RegistrationInstructions from "../../assets/pdfs/ResgistrationInstructions.pdf";

export default function BottomCTAs() {
    const [hidden, setHidden] = useState(false);

    // load Devfolio SDK script when component mounts
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apply.devfolio.co/v2/sdk.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHidden(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-50 
        flex flex-col md:flex-row gap-4 px-4 
        transition-opacity duration-2000 
        z-999
        ${hidden ? "opacity-0" : "opacity-100"}`}
        >
            {/* Devfolio integrate button */}

            <div
                className="apply-button pointer-events-auto"
                data-hackathon-slug="codeutsava-9"
                data-button-theme="light"
            ></div>


            <a
                href={RegistrationInstructions}
                target="_blank"
                rel="noopener noreferrer"
                download="RegistrationInstructions.pdf"
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
