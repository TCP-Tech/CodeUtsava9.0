// AboutUS.jsx
import React, { Suspense, useEffect } from "react";
import "./about.css";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Environment,
    ContactShadows,
    Float
} from "@react-three/drei";
import * as THREE from "three";

/* ------------ Motion toggle (persisted) ------------ */
function useMotionSetting() {
    const getInitial = () => {
        if (typeof window === "undefined") return true;
        const stored = localStorage.getItem("cu.motion");
        if (stored === "on" || stored === "off") return stored === "on";
        if ("__CU_MOTION_ENABLED" in window) return !!window.__CU_MOTION_ENABLED;
        return true;
    };
    const [enabled, setEnabled] = React.useState(getInitial);

    React.useEffect(() => {
        window.__CU_MOTION_ENABLED = enabled;
        localStorage.setItem("cu.motion", enabled ? "on" : "off");
    }, [enabled]);

    React.useEffect(() => {
        const handle = (e) => {
            if (e?.detail?.enabled !== undefined) setEnabled(!!e.detail.enabled);
            else setEnabled(!!window.__CU_MOTION_ENABLED);
        };
        window.addEventListener("cu:motion", handle);
        return () => window.removeEventListener("cu:motion", handle);
    }, []);
    return enabled;
}

/* ---------------- 3D Model ---------------- */
function CarnivalModel(props) {
    const { scene } = useGLTF("/models/carnival.glb");
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const m = child.material;
                m.color = new THREE.Color("#ffc800");
                m.metalness = 0.8;
                m.roughness = 0.35;
                m.emissive = new THREE.Color("#2c2000");
                m.emissiveIntensity = 0.18;
            }
        });
    }, [scene]);
    return <primitive object={scene} {...props} />;
}
useGLTF.preload("/models/carnival.glb");

/* --------------- Section ---------------- */
export default function AboutUS() {
    const isSm = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
    const isMd = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    const motionOn = useMotionSetting();

    const modelScale = isSm ? 1.8 : isMd ? 2.2 : 2.6;
    const dpr = isSm ? [1, 1.25] : [1, 1.6];
    const floatIntensity = motionOn ? (isSm ? 0.35 : 0.6) : 0;
    const rotationIntensity = motionOn ? (isSm ? 0.35 : 0.5) : 0;
    const autoRotate = motionOn;
    const autoRotateSpeed = motionOn ? (isSm ? 0.8 : 1.0) : 0;

    return (
        <section id="about" className="relative overflow-hidden py-16 md:py-28">
            {/* soft neon wash */}
            <div className="pointer-events-none absolute inset-0">
                <div className="neon-radial absolute -top-40 left-1/2 -translate-x-1/2 -z-10" />
            </div>

            <div className="relative z-0 max-w-7xl mx-auto px-4">
                <header className="text-center">
                    <h2 className="about-heading te text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)]  text-balance">
                        About&nbsp;Us
                    </h2>
                    <div className="mx-auto mt-3 neon-hr" />
                </header>

                <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Left: 3D viewer with timeline-like card styling */}
                    <div className="about-card p-[1px] rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
                        <div className="about-card__inner rounded-[inherit] ring-1 ring-white/10 overflow-hidden">
                            <div className="w-full aspect-[16/10] sm:aspect-[4/3]">
                                <Canvas
                                    dpr={dpr}
                                    frameloop="always"
                                    camera={{ position: [0, 1.35, 4], fov: 45 }}
                                    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                                >
                                    <ambientLight intensity={0.9} />
                                    <directionalLight position={[6, 6, 2]} intensity={1.1} />
                                    <Suspense fallback={null}>
                                        <Float
                                            speed={1.1}
                                            rotationIntensity={rotationIntensity}
                                            floatIntensity={floatIntensity}
                                        >
                                            <CarnivalModel scale={modelScale} />
                                        </Float>
                                        <Environment preset="city" intensity={0.6} />
                                        <ContactShadows
                                            position={[0, -1.1, 0]}
                                            opacity={0.35}
                                            blur={2.6}
                                            far={5}
                                            scale={8}
                                        />
                                    </Suspense>
                                    <OrbitControls
                                        autoRotate={autoRotate}
                                        autoRotateSpeed={autoRotateSpeed}
                                        enablePan={false}
                                        enableZoom={false}
                                    />
                                </Canvas>
                            </div>
                            <div className="pointer-events-none absolute inset-0 neon-frame-glow" />
                        </div>
                    </div>

                    {/* Right: copy */}
                    <div className="space-y-4 md:space-y-6 max-w-[65ch] mx-auto">
                        <article className="glass-card p-4 sm:p-6 md:p-7">
                            <p className="leading-[1.6] sm:leading-[1.58] md:leading-[1.55] text-[0.95rem] sm:text-base md:text-[1.03rem] text-white/95 text-pretty">
                                <span className="font-rye tracking-wide" style={{ letterSpacing: "0.06em" }}>
                                    <b className="hl-codeutsava">CODEUTSAVA</b>
                                </span>{" "}
                                is an annual event organized by the Turing Club of Programmers. It brings
                                together like-minded coders from across the nation to foster a thriving coding
                                culture with workshops, hackathons, gaming battles, MIC sessions, and more.
                            </p>
                        </article>

                        <article className="glass-card p-4 sm:p-6 md:p-7">
                            <p className="leading-[1.6] sm:leading-[1.58] md:leading-[1.55] text-[0.95rem] sm:text-base md:text-[1.03rem] text-white/95 text-pretty">
                                The heart of <b className="hl-codeutsava">CODEUTSAVA</b> is the{" "}
                                <b className="hl-event">28-hour hackathon</b>, where participants build
                                ambitious ideas at speed and scale. This year’s edition features a{" "}
                                <span className="hl-33l">33&nbsp;L+</span> prize pool including{" "}
                                <span className="hl-amount">1.5–2&nbsp;L</span> cash prizes.
                            </p>

                            <ul className="neon-bullets mt-4 sm:mt-5">
                                <li>28-hour hackathon</li>
                                <li>Workshops, MIC sessions &amp; mentorship</li>
                                <li>Gaming battles &amp; community showcases</li>
                                <li>Big prize pool &amp; industry partners</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
