import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'flipclock'; // make sure FlipClock JS & CSS are loaded globally in your project
import './CountDown.css';
import SparkleLayer from '../overlays/SparkleLayer.jsx';
import Fireworks from '../overlays/Fireworks.jsx';

const CountDown = () => {
    const messageRef = useRef(null);
    const startButtonRef = useRef(null);
    const flipClockRef = useRef(null);
    const [clock, setClock] = useState(null);
    const baseUrl = 'https://codeutsava.nitrr.ac.in/server/';
    const countdownDuration = 28 * 60 * 60 * 1000; // 28 hours

    const fetchCounterData = async () => {
        try {
            const response = await fetch(`${baseUrl}getcounter/`);
            const data = await response.json();
            return data?.data[0] || data.data;
        } catch (error) {
            console.error('Error fetching countdown data:', error);
            return null;
        }
    };

    const setCounterData = async (flag, startTime, endTime) => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        try {
            const response = await fetch(`${baseUrl}setcounter/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({ flag, startTime, endTime })
            });
            return await response.json();
        } catch (error) {
            console.error('Error setting countdown data:', error);
            return null;
        }
    };

    const initializeFlipClock = (remainingTime) => {
        const countdownSeconds = Math.floor(remainingTime / 1000);
        const fc = $(flipClockRef.current).FlipClock(countdownSeconds, {
            clockFace: 'HourlyCounter',
            countdown: true,
            autoStart: true
        });
        setClock(fc);
    };

    const handleStart = async () => {
        const counterData = await fetchCounterData();
        if (counterData && !counterData.flag) {
            const currentTime = Date.now();
            const endTime = currentTime + countdownDuration;
            await setCounterData(true, currentTime, endTime);
            initializeFlipClock(countdownDuration);
            if (startButtonRef.current) startButtonRef.current.style.display = 'none';
        } else {
            if (messageRef.current) {
                messageRef.current.textContent = 'Countdown has already started!';
            }
        }
    };

    useEffect(() => {
        (async () => {
            const counterData = await fetchCounterData();
            const currentTime = Date.now();
            if (counterData && counterData.flag) {
                const remainingTime = counterData.endTime - currentTime;
                if (remainingTime > 0) {
                    if (startButtonRef.current) startButtonRef.current.style.display = 'none';
                    initializeFlipClock(remainingTime);
                } else {
                    if (messageRef.current) {
                        messageRef.current.textContent = 'GAME OVER: Hackathon Complete! You’ve Leveled Up!';
                        messageRef.current.style.fontSize = '1.5rem';
                    }
                    if (startButtonRef.current) startButtonRef.current.style.display = 'none';
                }
            } else {
                initializeFlipClock(0);
            }
        })();
    }, []);

    return (
        <div className="codeutsava_countDown-container h-screen rye-regular">
            {/* <BackgroundMedia
                imageSrc={bgImage}
                darken={0.4}
                className="fixed inset-0 z-0"
                /> */}
            <SparkleLayer className="fixed inset-0 z-10 pointer-events-none" />
            <Fireworks className="fixed inset-0 z-20" />
            <div className='dark-cover'>
                <div className='absolute top-5 text-2xl'>
                    <a href="/">Back to Home</a>
                </div>
                <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}" />
                <div className="cu-countDown-header">
                    <h1 className="cu-countDown-header-heading text-6xl ">Hackathon CountDown</h1>
                </div>
                <div className="countdown-timer">
                    <div id="flipclock" ref={flipClockRef}></div>
                    <div id="countDown-message" ref={messageRef}></div>
                    <button
                        id="start-button"
                        className="start-countdown button"
                        ref={startButtonRef}
                        onClick={handleStart}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CountDown;
