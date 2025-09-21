// AboutUS.jsx
import React, { Suspense, useEffect } from 'react';
import './about.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// A small component to load and display a GLTF model
function CarnivalModel(props) {
  const { scene } = useGLTF('/models/carnival.glb'); // put your model in /public/models/

 useEffect(() => {
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      // ✨ Rich shiny gold
      child.material.color = new THREE.Color('#ffc800'); // bright gold
      child.material.metalness = 0.8;  // higher = more reflective
      child.material.roughness = 0.4;  // lower = shinier surface
    }
  });
}, [scene]);


  return <primitive object={scene} {...props} />;
}

const AboutUS = () => {
  return (
    <div className="about-container mt-10 ">

      {/* 3D Canvas */}
      <div className="about-3d">
        <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[50, 50, 10]} intensity={1.2} />
          <Suspense fallback={null}>
            {/* ✅ CarnivalModel now tints the meshes */}
            <CarnivalModel scale={2.8} />
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>
    <h1 className=' text-white absolute top-0 mt-8 rye-regular text-6xl'>About us</h1>
      <div className="about-content mt-15">
        <p className="about-text text-left max-sm:text-center quicksand-regular border-1 border-[#ffc800] rounded-2xl p-5">
          <strong className='text-[#ffc800] rye-regular'>CODEUTSAVA</strong> is an annual event organized by the Turing
          Club of Programmers. This event brings together like-minded coders
          from across the nation, fostering a coding culture with workshops,
          hackathons, gaming battles, MIC sessions, and much more.
        </p>
        <p className="about-text text-left max-sm:text-center quicksand-regular border-1 border-[#ffc800] rounded-2xl p-5">
          The most anticipated part of <strong className='text-[#ffc800] rye-regular'>CODEUTSAVA</strong> is the 28-hour Hackathon,
          where participants compete to create the best applications with
          innovative ideas. This year, CODEUTSAVA boasts a prize pool of 33
          lakhs, including 1.5–2 lakh cash prizes.
        </p>
      </div>
    </div>
  );
};

export default AboutUS;
