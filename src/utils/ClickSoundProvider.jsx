import { useEffect, useRef } from "react";

export default function ClickSoundProvider({
    src = "/ClickSound.mp3",
    selector = 'button, a',
    volume = 0.6,
    rate = 1.0,
}) {
    const audioRef = useRef(null);

    useEffect(() => {
        // Preload a base audio; we’ll clone for overlapping clicks
        const a = new Audio(src);
        a.volume = volume;
        a.playbackRate = rate;
        a.preload = "auto";
        audioRef.current = a;

        const onClick = (e) => {
            // Only for real buttons / button-like elements:
            const el = e.target.closest(selector);
            if (!el) return;
            if (el.disabled || el.getAttribute?.("aria-disabled") === "true") return;
            if (el.dataset?.noSfx === "true") return; // opt-out for specific buttons

            // Clone to allow overlapping plays; set currentTime for snappy retrigger
            const sfx = a.cloneNode(true);
            sfx.currentTime = 0;
            // Play returns a Promise in modern browsers
            sfx.play().catch(() => {
                // Most commonly: blocked until user interaction (first click will resolve it)
            });
        };

        // Use capture so we catch clicks before React stops propagation
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [src, volume, rate, selector]);

    return null;
}
