import React, { useEffect, useRef, useState } from "react";

export default function BackgroundMedia({ imageSrc, videoSrc, darken = 0.45, className = "" }) {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;
        const handleCanPlayThrough = () => {
            setVideoReady(true);
            vid.play?.().catch(() => { });
        };
        vid.muted = true;
        vid.playsInline = true;
        vid.addEventListener("canplaythrough", handleCanPlayThrough, { once: true });
        return () => vid.removeEventListener("canplaythrough", handleCanPlayThrough);
    }, []);

    return (
        <div className={`fixed inset-0 -z-50 pointer-events-none select-none ${className}`} aria-hidden="true">
            <img
                src={imageSrc}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-0" : "opacity-100"}`}
                draggable="false"
            />
            <video
                ref={videoRef}
                src={videoSrc}
                poster={imageSrc}
                preload="auto"
                loop
                muted
                playsInline
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`}
                style={{ pointerEvents: "none" }}
            />
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${Number(darken) || 0})` }} />
        </div>
    );
}
