import React from "react";
import clickSoundFile from "../../assets/audio/coin.mp3"; // adjust path

const SoundButton = ({ children, onClick, className }) => {
  const clickSound = new Audio(clickSoundFile);

  const handleClick = (e) => {
    clickSound.currentTime = 0; // restart sound if clicked multiple times
    clickSound.play();
    
    if (onClick) onClick(e); // preserve any custom click behavior
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default SoundButton;
