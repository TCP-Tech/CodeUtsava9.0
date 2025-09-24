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

// ——— 3D Model (gold tint + subtle emissive for warmth)
function CarnivalModel(props) {
    const { scene } = useGLTF("/models/carnival.glb");

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const m = child.material;
                m.color = new THREE.Color("#ffc800");     // warm gold
                m.metalness = 0.8;                        // reflective
                m.roughness = 0.35;                       // smooth but not mirror
                m.emissive = new THREE.Color("#2c2000");  // soft warmth
                m.emissiveIntensity = 0.18;
            }
        });
    }, [scene]);

    return <primitive object={scene} {...props} />;
}
useGLTF.preload("/models/carnival.glb");

export default function AboutUS() {
    return (
        <section id="about" className="relative overflow-hidden py-24 md:py-32">
            {/* soft neon wash behind section */}
            <div className="pointer-events-none absolute inset-0">
                <div className="neon-radial absolute -top-40 left-1/2 -translate-x-1/2 -z-10" />
            </div>

            <div className="relative z-0 max-w-7xl mx-auto px-4">
                {/* Heading — Rye to match Sponsors */}
                <header className="text-center">
                    <h2 className="about-heading text-white text-stroke-strong">
                        About&nbsp;Us
                    </h2>
                    <div className="mx-auto mt-4 neon-hr" />
                </header>

                {/* Two-column layout */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: 3D viewer inside neon frame */}
                    <div className="marquee-lights rounded-2xl p-[1px]">
                        <div className="relative rounded-[1rem] bg-black/70 border border-white/12 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,.45)] overflow-hidden">
                            <div className="aspect-[4/3] w-full">
                                <Canvas
                                    dpr={[1, 1.6]}
                                    camera={{ position: [0, 1.35, 4], fov: 45 }}
                                    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                                >
                                    <ambientLight intensity={0.9} />
                                    <directionalLight position={[6, 6, 2]} intensity={1.1} />
                                    <Suspense fallback={null}>
                                        <Float speed={1.15} rotationIntensity={0.4} floatIntensity={0.6}>
                                            <CarnivalModel scale={2.6} />
                                        </Float>
                                        <Environment preset="city" intensity={0.6} />
                                        <ContactShadows
                                            position={[0, -1.1, 0]}
                                            opacity={0.35}
                                            blur={2.8}
                                            far={5}
                                            scale={8}
                                        />
                                    </Suspense>
                                    <OrbitControls autoRotate enablePan={false} enableZoom={false} />
                                </Canvas>
                            </div>

                            <div className="pointer-events-none absolute inset-0 neon-frame-glow" />
                        </div>
                    </div>

                    {/* Right: copy on glass cards */}
                    <div className="space-y-6">
                        <article className="glass-card p-6 md:p-8">
                            <p className="leading-relaxed text-[1.05rem] md:text-lg text-white/95 text-balance">
                                <span
                                    className="font-rye tracking-wide text-outline-soft"
                                    style={{ color: "var(--color-accent-2)", letterSpacing: "0.06em" }}
                                >
                                    CODEUTSAVA
                                </span>{" "}
                                is an annual event organized by the Turing Club of Programmers.
                                It brings together like‑minded coders from across the nation to
                                foster a thriving coding culture with workshops, hackathons,
                                gaming battles, MIC sessions, and more.
                            </p>
                        </article>

                        <article className="glass-card p-6 md:p-8">
                            <p className="leading-relaxed text-[1.05rem] md:text-lg text-white/95 text-balance">
                                The heart of{" "}
                                <b
                                    className="font-rye text-outline-soft"
                                    style={{ color: "var(--color-primary)", letterSpacing: "0.04em" }}
                                >
                                    CODEUTSAVA
                                </b>{" "}
                                is the <b>28‑hour hackathon</b>, where participants build
                                ambitious ideas at speed and scale. This year’s edition features a{" "}
                                <span style={{ color: "var(--color-accent)" }}>33&nbsp;L+</span>{" "}
                                prize pool including{" "}
                                <span style={{ color: "var(--color-accent-2)" }}>1.5–2&nbsp;L</span>{" "}
                                cash prizes.
                            </p>

                            <ul className="neon-bullets mt-5 text-white/95">
                                <li>28‑hour hackathon</li>
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
