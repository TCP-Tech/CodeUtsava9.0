import React from "react";

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
        style={{ backgroundColor: `rgba(0, 0, 0, ${Number(darken) || 0})` }}
      />
    </div>
  );
}
