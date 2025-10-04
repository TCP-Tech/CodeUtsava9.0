import React, { useEffect, useRef } from "react";
import clickSoundFile from "../../assets/audio/coin.mp3";

const AutoPlaySound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(clickSoundFile);
    audioRef.current.loop = true; // optional
    audioRef.current.muted = true; // trick browsers into allowing autoplay
    audioRef.current.play().then(() => {
      console.log("Autoplay started (muted)");
    }).catch(err => {
      console.log("Autoplay blocked:", err);
    });
  }, []);

  const enableSound = () => {
    if (audioRef.current) {
      audioRef.current.muted = false; // unmute after first click
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <button 
      onClick={enableSound} 
      className="relative group p-3 rounded-full backdrop-blur-md bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/30 shadow-lg text-[#eadccb] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f3a83a]/50"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f3a83a] to-[#802b1d] opacity-50 blur-sm group-hover:blur-md transition-all duration-300"></div>
      <span className="relative font-medium">Enable Sound</span>
    </button>
  );
};

export default AutoPlaySound;
