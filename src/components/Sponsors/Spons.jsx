import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import sponsers from "../../assets/data/sponsersData.js";
import cardBlue from "../../assets/images/CU9 stuff/blue.jpg";
import cardRed from "../../assets/images/CU9 stuff/red.jpg";
import BDace from "../../assets/images/CU9 stuff/BDace.jpg";
import Bace from "../../assets/images/CU9 stuff/Bace.jpg";
import Dace from "../../assets/images/CU9 stuff/Dace.jpg";
import Hace from "../../assets/images/CU9 stuff/Hace.jpg";
import "./spons.css";

const Spons = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const allSponsors = [
        ...sponsers.platinum,
        ...sponsers.gold,
        ...sponsers.partners,
    ];

    // Create enough duplicates for seamless infinite scroll
    const duplicatedSponsors = [];
    for (let i = 0; i < 5; i++) {
        duplicatedSponsors.push(...allSponsors);
    }

    const getRandomImage = (idx) => {
        const images = [BDace, Bace, Dace, Hace];
        return images[idx % images.length];
    };

    useEffect(() => {
        const track = trackRef.current;
        const cards = track.querySelectorAll('.sponsor-card');

        // Responsive card width based on screen size
        const getCardWidth = () => {
            if (window.innerWidth < 640) return 140; // Mobile: increased spacing
            if (window.innerWidth < 1024) return 180; // Tablet: increased spacing
            return 220; // Desktop: increased spacing
        };

        const cardWidth = getCardWidth();

        // Set initial positions - fill screen width from start
        const screenWidth = window.innerWidth;
        const cardsToShow = Math.ceil(screenWidth / cardWidth) + 2; // Extra cards for seamless scroll

        gsap.set(cards, {
            x: (i) => (i % cardsToShow) * cardWidth - cardWidth, // Start one card width to the left
        });

        // Set initial card rotation (back side visible)
        cards.forEach((card) => {
            const cardInner = card.querySelector('.card-inner');
            gsap.set(cardInner, { rotateY: 0 });
        });

        // Create truly infinite horizontal scroll animation
        const animateCards = () => {
            cards.forEach((card) => {
                gsap.to(card, {
                    x: `-=${cardWidth}`,
                    duration: 2,
                    ease: "none",
                    onComplete: () => {
                        // When a card moves completely off-screen to the left,
                        // move it to the right side to continue the loop
                        const currentX = gsap.getProperty(card, "x");
                        if (currentX <= -cardWidth) {
                            gsap.set(card, { x: currentX + (cardsToShow * cardWidth) });
                        }
                    }
                });
            });
        };

        // Start the animation and repeat continuously
        const interval = setInterval(animateCards, 2000);

        // Card flip animations based on viewport position
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const cardInner = entry.target.querySelector('.card-inner');

                if (entry.isIntersecting) {
                    // Card is in viewport - show front (sponsor logo)
                    gsap.to(cardInner, {
                        rotateY: 180,
                        duration: 0.6,
                        ease: "power2.inOut"
                    });
                } else {
                    // Card is out of viewport - show back
                    gsap.to(cardInner, {
                        rotateY: 0,
                        duration: 0.6,
                        ease: "power2.inOut"
                    });
                }
            });
        }, {
            threshold: 0.5, // Flip when 50% of card is visible
            rootMargin: '0px'
        });

        // Observe all cards
        cards.forEach(card => observer.observe(card));

        // Handle window resize
        const handleResize = () => {
            const newCardWidth = getCardWidth();
            const newCardsToShow = Math.ceil(window.innerWidth / newCardWidth) + 2;

            // Reposition cards based on new dimensions
            gsap.set(cards, {
                x: (i) => (i % newCardsToShow) * newCardWidth - newCardWidth,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            clearInterval(interval);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [allSponsors.length]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen overflow-hidden bg-transparent"
            style={{ zIndex: 5 }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 sm:mb-12 md:mb-16 lg:mb-25 text-center px-4 rye-regular">
                    Our Sponsors
                </h1>

                {/* Infinite scrolling track */}
                <div
                    ref={trackRef}
                    className="relative w-full h-48 sm:h-64 md:h-80 overflow-visible"
                >
                    {duplicatedSponsors.map((sponsor, idx) => (
                        <div
                            key={`${sponsor.alt}-${idx}`}
                            className="sponsor-card absolute w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 shrink-0"
                            style={{
                                perspective: "1000px",
                                top: "50%",
                                transform: "translateY(-50%)"
                            }}
                        >
                            <div
                                className="card-inner relative w-full h-full"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: `rotateZ(${idx % 2 === 0 ? '-10deg' : '20deg'})`
                                }}
                            >
                                {/* Back of card (shows initially) */}
                                <div
                                    className="absolute w-full h-full rounded-xl overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(0deg)"
                                    }}
                                >
                                    <img
                                        src={idx % 2 === 0 ? cardBlue : cardRed}
                                        alt="Card Back"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Front of card (shows sponsor) */}
                                <div
                                    className="absolute w-full h-full rounded-xl flex flex-col items-center justify-center p-3 overflow-hidden"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        backfaceVisibility: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `url(${getRandomImage(idx)})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            margin: "2px",
                                            borderRadius: "0.75rem",
                                        }}
                                    />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <img
                                            src={sponsor.img}
                                            alt={sponsor.alt || `Sponsor ${idx + 1}`}
                                            className="h-8 sm:h-12 md:h-16 object-contain mb-1 sm:mb-2 filter drop-shadow-lg"
                                        />
                                        <p className="text-white text-xs sm:text-sm font-bold text-center drop-shadow-lg">
                                            {sponsor.alt || "Sponsor"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Spons;