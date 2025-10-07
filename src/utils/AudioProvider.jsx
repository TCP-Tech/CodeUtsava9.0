import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import carnivalIntro from "../assets/audio/carnival_hero.mp3";

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize audio only once
    if (!isInitialized) {
      const audio = new Audio(carnivalIntro);
      audio.loop = true;
      audio.volume = 0.3; // Set a reasonable default volume
      
      audioRef.current = audio;
      setIsInitialized(true);

      // Try to start audio on first user interaction
      const handleFirstInteraction = () => {
        if (!isPlaying && audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log("Autoplay prevented:", error);
          });
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
    }

    return () => {
      // Don't destroy audio on unmount to keep it persistent
    };
  }, [isInitialized]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Play failed:", error);
        // If play fails, try again after a brief delay
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              console.log("Retry play also failed");
            });
          }
        }, 100);
      });
    }
  };

  const play = () => {
    if (!audioRef.current || isPlaying) return;
    
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.log("Play failed:", error);
    });
  };

  const pause = () => {
    if (!audioRef.current || !isPlaying) return;
    
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  const value = {
    isPlaying,
    togglePlay,
    play,
    pause,
    setVolume,
    audioRef
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};