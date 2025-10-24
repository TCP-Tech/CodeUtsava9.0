import React, { useEffect, useState } from "react";
import RegistrationInstructions from "../../assets/pdfs/ResgistrationInstructions.pdf";

export default function BottomCTAs() {
    const [hidden, setHidden] = useState(false);

    // load Devfolio SDK script when component mounts
   useEffect(() => {
  const loadDevfolio = () => {
    if (window.Devfolio) return;
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Devfolio SDK initializes automatically once loaded
      console.log("Devfolio SDK loaded");
    };
    document.body.appendChild(script);
  };

  loadDevfolio();
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

    // Responsive rendering: only one Discord button at a time
    const isMobile = window.innerWidth < 768;
    return (
        <div
            className={`absolute top-0 bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 transition-opacity duration-2000 ${hidden ? "opacity-0" : "opacity-100"}`}
        >
            <div className={`flex ${isMobile ? "flex-col w-full items-center gap-4" : "flex-row gap-4 items-center justify-center"}`}>
                {/* Devfolio integrate button - single responsive element */}
                <div
                    className="apply-button"
                    data-hackathon-slug="codeutsava-9"
                    data-button-theme="light"
                    style={{height: "44px", width: "312px" }}
                ></div>

                {/* Discord button - square on desktop, full width with text on mobile */}
                <a
                    href="https://discord.gg/mq8PprVHUv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-black/60 border text-[color:var(--color-muted)] rounded-xl shadow-lg transition hover:scale-[1.02] flex items-center justify-center ${isMobile ? "w-full px-5 py-3 gap-3" : ""}`}
                    style={isMobile ? { borderColor: "color-mix(in srgb, var(--color-primary) 60%, white 40%)" } : { borderColor: "color-mix(in srgb, var(--color-accent-2) 60%, white 40%)", width: "44px", height: "44px", minWidth: "44px", minHeight: "44px" }}
                >
                    <svg
                        fill="currentColor"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                    >
                        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                    </svg>
                    {isMobile && <span className="ml-2">Join us on Discord</span>}
                </a>

                {/* Steps to register button - responsive width and wrapping */}
                <a
                    href={RegistrationInstructions}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="RegistrationInstructions.pdf"
                    className={`bg-black/60 border text-[color:var(--color-muted)] px-5 py-3 rounded-xl shadow-lg transition hover:scale-[1.02] text-center whitespace-normal ${isMobile ? "w-full" : ""}`}
                    style={isMobile ? { borderColor: "color-mix(in srgb, var(--color-primary) 60%, white 40%)" } : { borderColor: "color-mix(in srgb, var(--color-primary) 60%, white 40%)", height: "44px", display: "flex", alignItems: "center", minWidth: "180px", maxWidth: "312px", wordBreak: "break-word" }}
                >
                    <span style={{width: "100%", textAlign: "center"}}>STEPS TO REGISTER ON DEVFOLIO</span>
                </a>
            </div>
        </div>
    );
}
