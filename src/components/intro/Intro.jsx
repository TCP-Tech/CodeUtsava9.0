import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Hero from "../hero/Hero.jsx";
import bgImage from "../../assets/images/bg_image.webp";

export default function FixedScrollSplit() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const maxScroll = 100; // maximum scroll controlling the split

  // Handle scroll wheel without moving the page
  useEffect(() => {
  let touchStartY = 0;

  const handleWheel = (e) => {
    e.preventDefault();
    setScrollAmount((prev) =>
      Math.min(Math.max(prev + e.deltaY * 0.5, 0), maxScroll)
    );
  };

  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY; // swipe up = positive
    touchStartY = touchY;

    setScrollAmount((prev) =>
      Math.min(Math.max(prev + deltaY * 0.5, 0), maxScroll)
    );
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, []);


  // Animate top and bottom halves
  const topSpring = useSpring({
    clipPath: `polygon(0 0, 100% 0, 100% ${50 - scrollAmount / 2}%, 0 ${50 - scrollAmount / 2}%)`,
  });

  const bottomSpring = useSpring({
    clipPath: `polygon(0 ${50 + scrollAmount / 2}%, 100% ${50 + scrollAmount / 2}%, 100% 100%, 0 100%)`,
  });

  // Animate text and button opacity/position
  const textSpring = useSpring({
    opacity: 1-(scrollAmount) / (maxScroll/25) ,
    transform: `translateY(-${scrollAmount / 2}px)`, // move up with scroll
    config: { tension: 120, friction: 20 },
  });

  return (
    <div className="relative w-screen h-screen  bg-black">
      {/* Hero behind */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Hero />
      </div>

      {/* Top & Bottom halves with reduced brightness */}
      <div className="absolute top-0 left-0 w-full h-full brightness-75 z-10">
        <animated.img
          src={bgImage}
          alt="top"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={topSpring}
        />

        <animated.img
          src={bgImage}
          alt="bottom"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={bottomSpring}
        />
      </div>

      {/* Text + Scroll Button */}
      <animated.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-6"
        style={textSpring}
      >
        {/* White box for CODEUTSAVA */}
        <div className="bg-white px-6 sm:px-8 py-2 sm:py-4 rounded-xl border-4 border-black shadow-lg flex flex-col items-center">
  <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-arcade uppercase tracking-wider text-center">
    CODEUTSAVA 9.0
  </h1>
</div>


        {/* Scroll down button */}
        <button className="relative px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-arcade uppercase tracking-widest border-2 border-black rounded-xl shadow-lg
          transition-all duration-300 ease-in-out flex items-center space-x-2 animate-bounce">
          <span>Scroll Down</span>
        </button>
      </animated.div>
    </div>
  );
}
