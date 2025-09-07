import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundMedia
 * ----------------
 * Fixed, full-viewport background that first shows an image and
 * then fades to a looping video once it's fully bufferable.
 *
 * Props
 *  - imageSrc: string (required) — poster/placeholder image
 *  - videoSrc: string (required) — background video
 *  - darken: number (0 → 1) — single darkening overlay strength (default: 0.45)
 *  - className: string — optional extra classes
 */
export default function BackgroundMedia({ imageSrc, videoSrc, darken = 0.45, className = "" }) {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        const handleCanPlayThrough = () => {
            setVideoReady(true);
            // Autoplay silently once ready
            vid.play?.().catch(() => { });
        };

        // Ensure optimal flags for background video
        vid.muted = true;
        vid.playsInline = true;

        vid.addEventListener("canplaythrough", handleCanPlayThrough, { once: true });
        return () => vid.removeEventListener("canplaythrough", handleCanPlayThrough);
    }, []);

    return (
        <div
            className={`fixed inset-0 -z-50 pointer-events-none select-none ${className}`}
            aria-hidden="true"
        >
            {/* Image shown first */}
            <img
                src={imageSrc}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-0" : "opacity-100"
                    }`}
                draggable="false"
            />

            {/* Video fades in after canplaythrough */}
            <video
                ref={videoRef}
                src={videoSrc}
                poster={imageSrc}
                preload="auto"
                loop
                muted
                playsInline
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"
                    }`}
                style={{ pointerEvents: "none" }}
            />

            {/* Single, controllable darken overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: `rgba(0,0,0,${Number(darken) || 0})` }}
            />
        </div>
    );
}
