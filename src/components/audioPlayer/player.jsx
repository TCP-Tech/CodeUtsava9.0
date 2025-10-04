import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import carnivalIntro from "../../assets/audio/carnival_hero.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playerUI = (
    <div
      className="fixed bottom-6 right-6"
      style={{ zIndex: 2147483647 }} // max safe z-index
    >
      {/* Wrapper for gradient and shadow */}
      <div className="rounded-full bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-900 shadow-md p-0.5">
        {/* Actual button without any backdrop-blur or filter */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center
                     transition-transform duration-300 transform hover:scale-105 hover:rotate-6
                     focus:outline-none"
          style={{ willChange: "transform" }} // smooth hover
        >
          {isPlaying ? (
            // Pause icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
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
              className="w-7 h-7 text-white"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      <audio ref={audioRef} src={carnivalIntro} loop autoPlay />
    </div>
  );

  return createPortal(playerUI, document.body);
};

export default AudioPlayer;
