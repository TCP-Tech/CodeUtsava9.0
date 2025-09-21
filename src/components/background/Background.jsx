import React from "react";
// import bg_image from "./assets/background/bg_image"

/**
 * BackgroundMedia (Image-only version)
 * ------------------------------------
 * Fixed, full-viewport background image with optional dark overlay.
 *
 * Props
 *  - imageSrc: string (required) — background image
 *  - darken: number (0 → 1) — darkening overlay strength (default: 0.45)
 *  - className: string — optional extra classes
 */
export default function BackgroundMedia({ imageSrc, darken = 0.5, className = "" }) {
  return (
    <div
      className={`fixed inset-0 -z-50 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background image */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />

      {/* Darken overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${Number(darken) || 0})` }}
      />
    </div>
  );
}
