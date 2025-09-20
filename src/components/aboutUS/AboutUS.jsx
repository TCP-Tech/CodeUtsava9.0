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
      child.material.color = new THREE.Color('#FFD700'); // bright gold
      child.material.metalness = 0.8;  // higher = more reflective
      child.material.roughness = 0.4;  // lower = shinier surface
    }
  });
}, [scene]);


  return <primitive object={scene} {...props} />;
}

const AboutUS = () => {
  return (
    <div className="about-container mt-10 border-2 border-amber-50 scale-99">
    <h1 className=' text-white absolute top-0 mt-8 rye-regular text-6xl'>About us</h1>
      <div className="about-content">
        <p className="about-text text-left max-sm:text-center">
          <strong className='text-blue-500'>CODEUTSAVA</strong> is an annual event organized by the Turing
          Club of Programmers. This event brings together like-minded coders
          from across the nation, fostering a coding culture with workshops,
          hackathons, gaming battles, MIC sessions, and much more.
        </p>
        <p className="about-text text-left max-sm:text-center">
          The most anticipated part of <strong className='text-blue-400'>CODEUTSAVA</strong> is the 28-hour Hackathon,
          where participants compete to create the best applications with
          innovative ideas. This year, CODEUTSAVA boasts a prize pool of 33
          lakhs, including 1.5–2 lakh cash prizes.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="about-3d">
        <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <Suspense fallback={null}>
            {/* ✅ CarnivalModel now tints the meshes */}
            <CarnivalModel scale={2.8} />
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default AboutUS;
