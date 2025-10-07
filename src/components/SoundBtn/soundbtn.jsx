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
    <button onClick={enableSound} className="p-2 bg-blue-500 text-white rounded">
      Enable Sound
    </button>
  );
};

export default AutoPlaySound;
