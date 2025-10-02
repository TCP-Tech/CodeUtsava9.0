import React from "react";

export default function RightRail() {
    return (
        // <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30">
        //     <div className="rail-pill px-3 py-4 rounded-2xl border border-white/15 bg-gradient-to-b from-black/70 via-black/55 to-black/70 backdrop-blur-[2px] shadow-[0_6px_24px_rgba(0,0,0,.35)]">
        //         <div className="vertical-rl tracking-[0.4em] text-white text-outline-soft select-none">SCROLL DOWN</div>
        //         <div className="mx-auto mt-3 h-24 w-[2px] bg-white/45 rounded-full" />
        //     </div>
        // </div>
        <div class="scroll-down-section">
            <a href="#about">
                <span>Scroll Down</span>
            </a>
                <svg
                    fill="var(--color-accent-2)"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                >
                    <path
                        d="M224 402.7V32c0-17.7-14.3-32-32-32s-32 
      14.3-32 32V402.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 
      0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 
      45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
      0L224 402.7z"
                    />
                </svg>
        </div>
    );
}
