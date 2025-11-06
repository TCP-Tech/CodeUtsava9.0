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

// Import FlipClock CSS and JS
import "flipclock/themes/flipclock";
import { flipClock, countdown, theme } from "flipclock";

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
        const getCsrfTokenFromCookie = () => {
            const name = "csrftoken";
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                const [key, value] = cookie.trim().split("=");
                if (key === name) {
                    return value;
                }
            }
            return null;
        };

        const csrftoken =
            getCsrfTokenFromCookie() ||
            document.querySelector("[name=csrfmiddlewaretoken]")?.value;

        try {
            const headers = { "Content-Type": "application/json" };
            if (csrftoken) headers["X-CSRFToken"] = csrftoken;

            const response = await fetch(`${baseUrl}setcounter/`, {
                method: "POST",
                headers: headers,
                credentials: "include",
                body: JSON.stringify({ flag, startTime, endTime }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error setting countdown data:", error);
            throw error;
        }
    };

    // ✅ Fixed: Countdown version (28:00:00 → 00:00:00)
    const initializeFlipClock = (startTime, endTime, shouldCount = true) => {
        if (!isFlipClockReady) return;
        if (!flipClockRef.current) return;

        try {
            if (clock) {
                clock.unmount();
                setClock(null);
            }

            flipClockRef.current.innerHTML = "";

            const now = Date.now();
            const remaining = Math.max(0, endTime - now);

            const countdownFace = countdown({
                duration: remaining / 1000, // in seconds
                format: "hh:mm:ss",
                whenEnded: () => {
                    if (messageRef.current) {
                        messageRef.current.textContent =
                            "GAME OVER: Hackathon Complete! You've Leveled Up!";
                        messageRef.current.style.fontSize = "1.5rem";
                    }
                },
            });

            const fc = flipClock({
                face: countdownFace,
                theme: theme(),
                parent: flipClockRef.current,
                autoStart: shouldCount,
            });

            setClock(fc);
        } catch (error) {
            console.error("Error initializing FlipClock:", error);
        }
    };

    const handleStart = async () => {
        try {
            const counterData = await fetchCounterData();
            if (counterData && !counterData.flag) {
                const currentTime = Date.now();
                const endTime = currentTime + countdownDuration;
                await setCounterData(true, currentTime, endTime);
                initializeFlipClock(currentTime, endTime, true);
                if (startButtonRef.current)
                    startButtonRef.current.style.display = "none";
            } else {
                if (messageRef.current) {
                    messageRef.current.textContent =
                        "Countdown has already started!";
                }
            }
        } catch (error) {
            console.error("Failed to start countdown:", error);
            if (messageRef.current) {
                messageRef.current.textContent =
                    "Error starting countdown. Please try again.";
                messageRef.current.style.color = "#ff4444";
            }
        }
    };

    useEffect(() => {
        if (!isFlipClockReady) return;
        let intervalId;

        (async () => {
            const counterData = await fetchCounterData();
            const currentTime = Date.now();

            if (counterData && counterData.flag) {
                const remainingTime = counterData.endTime - currentTime;

                if (remainingTime > 0) {
                    if (startButtonRef.current)
                        startButtonRef.current.style.display = "none";

                    initializeFlipClock(
                        counterData.startTime,
                        counterData.endTime,
                        true
                    );

                    intervalId = setInterval(() => {
                        const now = Date.now();
                        if (now >= counterData.endTime) {
                            if (messageRef.current) {
                                messageRef.current.textContent =
                                    "GAME OVER: Hackathon Complete! You've Leveled Up!";
                                messageRef.current.style.fontSize = "1.5rem";
                            }
                            initializeFlipClock(
                                counterData.startTime,
                                counterData.endTime,
                                false
                            );
                            clearInterval(intervalId);
                        }
                    }, 1000);
                } else {
                    if (messageRef.current) {
                        messageRef.current.textContent =
                            "GAME OVER: Hackathon Complete! You've Leveled Up!";
                        messageRef.current.style.fontSize = "1.5rem";
                    }
                    if (startButtonRef.current)
                        startButtonRef.current.style.display = "none";

                    initializeFlipClock(
                        counterData.startTime,
                        counterData.endTime,
                        false
                    );
                }
            } else {
                if (startButtonRef.current)
                    startButtonRef.current.style.display = "block";
                const now = Date.now();
                initializeFlipClock(now, now + countdownDuration, false);
            }
        })();

        return () => {
            if (clock) clock.unmount();
            if (intervalId) clearInterval(intervalId);
        };
    }, [isFlipClockReady]);

    return (
        <Cursor>
            <div className="codeutsava_countDown-container h-screen">
                <SparkleLayer className="fixed inset-0 z-10 pointer-events-none" />
                <Fireworks className="fixed inset-0 z-20 pointer-events-none" />
                <div className="dark-cover">
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

                    <div className="cu-countDown-header">
                        <h1 className="cu-countDown-header-heading font-rye text-4xl md:text-6xl lg:text-7xl text-[#F3A83A] mb-8">
                            Hackathon CountDown
                        </h1>
                    </div>

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
