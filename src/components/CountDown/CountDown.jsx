import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./CountDown.css";
import SparkleLayer from "../overlays/SparkleLayer.jsx";
import Fireworks from "../overlays/Fireworks.jsx";
import Cursor from "../cursor/Cursor.jsx";

// Make jQuery available globally BEFORE importing FlipClock
if (typeof window !== "undefined") {
    window.jQuery = $;
    window.$ = $;
}

// Import FlipClock CSS and JS with correct paths (use the exported path from package.json)
import "flipclock/themes/flipclock";
import { flipClock, elapsedTime, theme, stopWhen } from "flipclock";

const CountDown = () => {
    const messageRef = useRef(null);
    const startButtonRef = useRef(null);
    const flipClockRef = useRef(null);
    const [clock, setClock] = useState(null);
    const [isFlipClockReady, setIsFlipClockReady] = useState(false);
    const baseUrl = "https://codeutsava.nitrr.ac.in/server/";
    const countdownDuration = 28 * 60 * 60 * 1000; // 28 hours

    // Check if FlipClock is available
    useEffect(() => {
        // FlipClock is ready after import
        setIsFlipClockReady(true);
    }, []);

    const fetchCounterData = async () => {
        try {
            const response = await fetch(`${baseUrl}getcounter/`);
            const data = await response.json();
            return data?.data[0] || data.data;
        } catch (error) {
            console.error("Error fetching countdown data:", error);
            return null;
        }
    };

    const setCounterData = async (flag, startTime, endTime) => {
        const csrftoken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
        )?.value;
        try {
            const response = await fetch(`${baseUrl}setcounter/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({ flag, startTime, endTime }),
            });
            return await response.json();
        } catch (error) {
            console.error("Error setting countdown data:", error);
            return null;
        }
    };

    const initializeFlipClock = (remainingTime) => {
        if (!isFlipClockReady) {
            console.warn("FlipClock is not ready yet");
            return;
        }

        if (!flipClockRef.current) {
            console.warn("FlipClock ref is not available");
            return;
        }

        try {
            // Clean up existing clock if any
            if (clock) {
                clock.unmount();
                setClock(null);
            }

            // Clear the container
            flipClockRef.current.innerHTML = "";

            // Calculate start and end dates for countdown
            const now = new Date();
            const endDate = new Date(now.getTime() + remainingTime);

            // Create an elapsed time face for countdown (from now to end date)
            const elapsedTimeFace = elapsedTime({
                from: now,
                to: endDate,
                format: "hh:mm:ss", // lowercase format for hours:minutes:seconds
            });

            // Create the FlipClock with the elapsed time face and theme
            const fc = flipClock({
                face: elapsedTimeFace,
                theme: theme(),
                parent: flipClockRef.current,
                autoStart: true,
            });

            setClock(fc);
        } catch (error) {
            console.error("Error initializing FlipClock:", error);
        }
    };

    const handleStart = async () => {
        const counterData = await fetchCounterData();
        if (counterData && !counterData.flag) {
            const currentTime = Date.now();
            const endTime = currentTime + countdownDuration;
            await setCounterData(true, currentTime, endTime);
            initializeFlipClock(countdownDuration);
            if (startButtonRef.current)
                startButtonRef.current.style.display = "none";
        } else {
            if (messageRef.current) {
                messageRef.current.textContent =
                    "Countdown has already started!";
            }
        }
    };

    useEffect(() => {
        if (!isFlipClockReady) return;

        (async () => {
            const counterData = await fetchCounterData();
            const currentTime = Date.now();
            if (counterData && counterData.flag) {
                const remainingTime = counterData.endTime - currentTime;
                if (remainingTime > 0) {
                    if (startButtonRef.current)
                        startButtonRef.current.style.display = "none";
                    initializeFlipClock(remainingTime);
                } else {
                    if (messageRef.current) {
                        messageRef.current.textContent =
                            "GAME OVER: Hackathon Complete! You've Leveled Up!";
                        messageRef.current.style.fontSize = "1.5rem";
                    }
                    if (startButtonRef.current)
                        startButtonRef.current.style.display = "none";
                }
            } else {
                // Show clock at 00:00:00 when no countdown is active (matching last year's behavior)
                initializeFlipClock(0);
            }
        })();

        // Cleanup on unmount
        return () => {
            if (clock) {
                clock.unmount();
            }
        };
    }, [isFlipClockReady]);

    return (
        <Cursor>
            <div className="codeutsava_countDown-container h-screen">
                <SparkleLayer className="fixed inset-0 z-10 pointer-events-none" />
                <Fireworks className="fixed inset-0 z-20 pointer-events-none" />
                <div className="dark-cover">
                    {/* Back to Home Link */}
                    <a
                        href="/"
                        className="absolute top-6 left-6 text-lg md:text-xl font-rye text-white hover:text-[#F3A83A] transition-all duration-300 hover:scale-105 z-50"
                        style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        ← Back to Home
                    </a>

                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value="{{ csrf_token }}"
                    />

                    {/* Header */}
                    <div className="cu-countDown-header">
                        <h1 className="cu-countDown-header-heading font-rye text-4xl md:text-6xl lg:text-7xl text-[#F3A83A] mb-8">
                            Hackathon CountDown
                        </h1>
                    </div>

                    {/* Countdown Timer Container */}
                    <div className="countdown-timer-wrapper">
                        <div className="countdown-timer">
                            <div id="flipclock" ref={flipClockRef}></div>
                            <div
                                id="countDown-message"
                                ref={messageRef}
                                className="countdown-message font-bebas"
                            ></div>
                            <button
                                id="start-button"
                                className="start-countdown-btn font-rye"
                                ref={startButtonRef}
                                onClick={handleStart}
                            >
                                🎪 Start Countdown 🎪
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Cursor>
    );
};

export default CountDown;
