import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Emblem3D: React.FC<{ size?: number; interactive?: boolean; className?: string }> = ({
  size = 280,
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for the geometric 'N' monogram
    const emblemGroup = new THREE.Group();

    // Material: Dark translucent glass with violet specular highlights
    const darkGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#191A23'),
      emissive: new THREE.Color('#111218'),
      roughness: 0.15,
      metalness: 0.85,
      transmission: 0.6,
      thickness: 1.2,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const edgeGlowMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#9B7BFF'),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75,
    });

    // Create the 3 pillars of "N"
    // Left vertical pillar
    const pillarGeom = new THREE.BoxGeometry(0.42, 2.3, 0.42);
    const leftPillar = new THREE.Mesh(pillarGeom, darkGlassMaterial);
    leftPillar.position.x = -0.9;
    emblemGroup.add(leftPillar);

    const leftEdges = new THREE.LineSegments(new THREE.EdgesGeometry(pillarGeom), edgeGlowMaterial);
    leftPillar.add(leftEdges);

    // Right vertical pillar
    const rightPillar = new THREE.Mesh(pillarGeom, darkGlassMaterial);
    rightPillar.position.x = 0.9;
    emblemGroup.add(rightPillar);

    const rightEdges = new THREE.LineSegments(new THREE.EdgesGeometry(pillarGeom), edgeGlowMaterial);
    rightPillar.add(rightEdges);

    // Diagonal connector
    const diagGeom = new THREE.BoxGeometry(0.42, 2.7, 0.42);
    const diagPillar = new THREE.Mesh(diagGeom, darkGlassMaterial);
    diagPillar.rotation.z = -0.74; // angle across
    diagPillar.position.z = 0.05;
    emblemGroup.add(diagPillar);

    const diagEdges = new THREE.LineSegments(new THREE.EdgesGeometry(diagGeom), edgeGlowMaterial);
    diagPillar.add(diagEdges);

    // Surrounding thin orbital ring
    const ringGeom = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#B9A6FF'),
      transparent: true,
      opacity: 0.25,
    });
    const orbitalRing = new THREE.Mesh(ringGeom, ringMaterial);
    orbitalRing.rotation.x = Math.PI / 3;
    emblemGroup.add(orbitalRing);

    scene.add(emblemGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight('#111218', 2.0);
    scene.add(ambientLight);

    // Violet key light
    const violetLight = new THREE.PointLight('#9B7BFF', 5, 10);
    violetLight.position.set(2, 3, 3);
    scene.add(violetLight);

    // Blue fill light
    const blueLight = new THREE.PointLight('#8BB9FF', 3, 10);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Atmospheric slow rotation
      emblemGroup.rotation.y = elapsedTime * 0.25 + mouseX * 0.4;
      emblemGroup.rotation.x = 0.15 + Math.sin(elapsedTime * 0.4) * 0.08 + mouseY * 0.3;
      orbitalRing.rotation.z = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pillarGeom.dispose();
      diagGeom.dispose();
      ringGeom.dispose();
      darkGlassMaterial.dispose();
      edgeGlowMaterial.dispose();
      ringMaterial.dispose();
    };
  }, [size, interactive]);

  if (!hasWebGL) {
    // Static accessible SVG fallback
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        aria-label="Nightclub 3D Brand Emblem"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-nc-violet">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <path
            d="M 30 25 L 30 75 M 30 25 L 70 75 M 70 25 L 70 75"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_12px_#9B7BFF]"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label="Nightclub Signature Geometric 3D Emblem"
    />
  );
};
