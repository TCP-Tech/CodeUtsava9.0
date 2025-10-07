import React from "react";

export default function RightRail() {
    return (
        // MODIFIED: Removed the className from this div element
        <div>
            <a href="#about">
                <span className="hover:text-amber-300">Scroll Down</span>
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