import { useState, useEffect } from "react";
import BackgroundMedia from "../background/Background.jsx";
import bg_image from "../../assets/images/bg-part2.jpg";
import './intro.css';
import cuimg from '../../assets/images/codeutsavaIntroTitle.png';

export default function IntroScreen({ onCurtainProgress }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [curtainState, setCurtainState] = useState('open'); // 'open', 'closing', 'closed', 'revealing'

    useEffect(() => {
        // Signal that intro is ready and website should preload
        if (onCurtainProgress) {
            onCurtainProgress(0.1);
        }
    }, [onCurtainProgress]);

    const handleEnterClick = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        // Fade out intro content and close curtains
        setTimeout(() => {
            setCurtainState('closing');
            
            // Wait for curtains to close completely
            setTimeout(() => {
                setCurtainState('closed');
                
                // Brief dramatic pause with curtains closed
                setTimeout(() => {
                    // Signal to parent that website should be visible behind curtains
                    if (onCurtainProgress) {
                        onCurtainProgress(1);
                    }
                    
                    // Force browser reflow for smooth transition
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            setCurtainState('revealing');
                            
                            // Remove intro after curtains finish opening
                            setTimeout(() => {
                                setShowIntro(false);
                            }, 1800); // Match CSS revealing transition + small buffer
                        });
                    });
                    
                }, 400); // Dramatic pause duration
                
            }, 1200); // Curtain closing duration (matches CSS)
        }, 100); // Small delay for fade-out to start first
    };


    if (!showIntro) {
        return null; // Completely remove intro from DOM when done
    }

    return (
        <div className={`intro-container ${curtainState === 'revealing' ? 'revealing' : ''}`}>
            {/* Background for intro */}
            <div className="intro-background">
                <BackgroundMedia imageSrc={bg_image} darken={0.5} className="bg-right" />
            </div>
            
            {/* Title and Enter Button */}
            <div className={`intro-content ${curtainState === 'closing' || curtainState === 'closed' || curtainState === 'revealing' ? 'fade-out' : ''}`}>
                <img src={cuimg} alt="CodeUtsava" className="intro-title" />
                
                <div
                    onClick={handleEnterClick}
                    className={`intro-button ${isAnimating ? 'disabled' : ''}`}
                >
                    <div className="border">
                        <div className="left-plane"></div>
                        <div className="right-plane"></div>
                    </div>
                    <div className="text">Enter</div>
                </div>
            </div>

            {/* Left Curtain */}
            <div className={`curtain curtain-left ${curtainState}`}>
            </div>

            {/* Right Curtain */}
            <div className={`curtain curtain-right ${curtainState}`}>
            </div>
        </div>
    );
}