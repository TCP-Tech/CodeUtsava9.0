import React from "react";

export default function RightRail() {
    return (
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30">
            {/* vertical pill with gradient + border so text always readable */}
            <div className="right-rail__pill px-3 py-4 rounded-2xl border border-white/15 bg-gradient-to-b from-black/70 via-black/55 to-black/70 backdrop-blur-[2px] shadow-[0_6px_24px_rgba(0,0,0,.35)]">
                <div className="vertical-rl tracking-[0.4em] text-white text-outline-soft select-none">
                    SCROLL DOWN
                </div>
                <div className="mx-auto mt-3 h-24 w-[2px] bg-white/45 rounded-full" />
            </div>
        </div>
    );
}
