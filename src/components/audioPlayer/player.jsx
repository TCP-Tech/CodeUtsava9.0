import React from "react";
import { createPortal } from "react-dom";
import { useAudio } from "../../utils/AudioProvider.jsx";

const AudioPlayer = () => {
  const { isPlaying, togglePlay } = useAudio();

  const playerUI = (
    <div
      className="fixed bottom-6 right-6"
      style={{ zIndex: 1000 }} // Reduced z-index to allow cursor to appear above
    >
      {/* Glassmorphism container */}
      <div className="relative group">
        {/* Glow effect background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f3a83a] via-[#802b1d] to-[#f3a83a] opacity-75 blur-md group-hover:blur-lg transition-all duration-300 animate-pulse"></div>
        
        {/* Main glassmorphism button */}
        <div className="relative rounded-full backdrop-blur-md bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 shadow-2xl p-1">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center
                       backdrop-blur-sm bg-gradient-to-br from-[#802b1d]/30 via-[#2c2b4c]/20 to-[#f3a83a]/30
                       border border-white/20 shadow-inner
                       transition-all duration-300 transform 
                       hover:scale-110 hover:rotate-12 hover:shadow-2xl
                       active:scale-95 active:rotate-6
                       focus:outline-none focus:ring-2 focus:ring-[#f3a83a]/50"
            style={{ willChange: "transform" }}
          >
            {isPlaying ? (
              // Pause icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 text-[#eadccb] drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(243,168,58,0.5)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 7v10M15 7v10"
                />
              </svg>
            ) : (
              // Play icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-9 h-9 text-[#eadccb] drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(243,168,58,0.5)] ml-1"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(playerUI, document.body);
};

export default AudioPlayer;
