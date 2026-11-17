import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export interface SatelliteInfo {
  id: string;
  name: string;
  role: string;
  desc: string;
  color: string;
}

const SATELLITE_DATA: SatelliteInfo[] = [
  {
    id: 'people',
    name: 'PEOPLE',
    role: 'Complementary Minds',
    desc: 'Founders, engineers, and designers finding their people.',
    color: '#9B7BFF',
  },
  {
    id: 'ideas',
    name: 'IDEAS',
    role: 'Vision & Architecture',
    desc: 'Ambitious hypotheses transformed into concrete specs.',
    color: '#B9A6FF',
  },
  {
    id: 'skills',
    name: 'SKILLS',
    role: 'Execution Craft',
    desc: 'Cross-functional abilities turning gaps into strengths.',
    color: '#8BB9FF',
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    role: 'Shipped Artifacts',
    desc: 'Verifiable missions, code repositories, and products.',
    color: '#9AD8B0',
  },
];

export const NightclubUniverse: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSatellite, setActiveSatellite] = useState<SatelliteInfo | null>(null);
  const [hudPosition, setHudPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pulseActive, setPulseActive] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 9.2);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. MASTER GROUPS
    const universeRoot = new THREE.Group();
    scene.add(universeRoot);

    const monolithGroup = new THREE.Group();
    universeRoot.add(monolithGroup);

    const orbitalGroup = new THREE.Group();
    universeRoot.add(orbitalGroup);

    // 4. SHARED MATERIALS
    // A. Black Obsidian (high gloss, deep refraction)
    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0A0B10'),
      emissive: new THREE.Color('#05050A'),
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    // B. Dark Titanium (brushed metallic graphite)
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#191A23'),
      roughness: 0.28,
      metalness: 0.82,
    });

    // C. Smoked Translucent Glass
    const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#161722'),
      emissive: new THREE.Color('#0F101A'),
      roughness: 0.08,
      metalness: 0.2,
      transmission: 0.68,
      thickness: 1.4,
      ior: 1.54,
      transparent: true,
      opacity: 0.85,
    });

    // D. Electric Blue Rim Bevels
    const edgeBlueMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#8BB9FF'),
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });

    // E. Violet Glow Accent
    const edgeVioletMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#9B7BFF'),
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });

    // 5. CONSTRUCTING THE CENTRAL ARCHITECTURAL MONOLITH (SUBTLE GEOMETRIC "N")
    // Left Brutalist Obsidian Pillar
    const leftPillarGeom = new THREE.BoxGeometry(0.55, 3.8, 0.75);
    const leftPillar = new THREE.Mesh(leftPillarGeom, obsidianMaterial);
    leftPillar.position.set(-1.45, 0, 0);
    monolithGroup.add(leftPillar);

    const leftEdges = new THREE.LineSegments(new THREE.EdgesGeometry(leftPillarGeom), edgeBlueMaterial);
    leftPillar.add(leftEdges);

    // Right Stepped Cantilevered Titanium Pillar
    const rightPillarGeom = new THREE.BoxGeometry(0.55, 3.8, 0.75);
    const rightPillar = new THREE.Mesh(rightPillarGeom, titaniumMaterial);
    rightPillar.position.set(1.45, 0, 0);
    monolithGroup.add(rightPillar);

    const rightEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rightPillarGeom), edgeBlueMaterial);
    rightPillar.add(rightEdges);

    // Secondary stepped block on right pillar for brutalist asymmetry
    const stepGeom = new THREE.BoxGeometry(0.4, 1.6, 0.5);
    const stepBlock = new THREE.Mesh(stepGeom, obsidianMaterial);
    stepBlock.position.set(1.7, 0.6, 0.3);
    monolithGroup.add(stepBlock);
    stepBlock.add(new THREE.LineSegments(new THREE.EdgesGeometry(stepGeom), edgeVioletMaterial));

    // The Diagonal Portal Span (Completing the Architectural "N")
    // Angled cantilever connecting top-left to bottom-right across the portal opening
    const diagGeom = new THREE.BoxGeometry(0.52, 4.2, 0.65);
    const diagSpan = new THREE.Mesh(diagGeom, obsidianMaterial);
    diagSpan.rotation.z = -0.66; // angle crossing between the pillars
    diagSpan.position.set(0, 0, 0.08);
    monolithGroup.add(diagSpan);

    const diagEdges = new THREE.LineSegments(new THREE.EdgesGeometry(diagGeom), edgeVioletMaterial);
    diagSpan.add(diagEdges);

    // Architectural Smoked Glass Wing Shroud (floating beside opening)
    const glassShroudGeom = new THREE.BoxGeometry(0.2, 2.8, 1.8);
    const glassShroud = new THREE.Mesh(glassShroudGeom, smokedGlassMaterial);
    glassShroud.position.set(-0.6, 0.2, -0.4);
    glassShroud.rotation.y = 0.25;
    monolithGroup.add(glassShroud);
    glassShroud.add(new THREE.LineSegments(new THREE.EdgesGeometry(glassShroudGeom), edgeBlueMaterial));

    // 6. THE CENTRAL ENERGY CORE (LUMINOUS VIOLET DIMENSIONAL CORE)
    const coreGroup = new THREE.Group();
    monolithGroup.add(coreGroup);

    // A. Inner glowing multifaceted jewel (Icosahedron)
    const coreJewelGeom = new THREE.IcosahedronGeometry(0.48, 1);
    const coreJewelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      emissive: new THREE.Color('#9B7BFF'),
      emissiveIntensity: 4.5,
      roughness: 0.1,
      metalness: 0.2,
    });
    const coreJewel = new THREE.Mesh(coreJewelGeom, coreJewelMat);
    coreGroup.add(coreJewel);

    // B. Concentric wireframe orbital cages
    const cage1Geom = new THREE.IcosahedronGeometry(0.72, 1);
    const cage1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#B9A6FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const cage1 = new THREE.Mesh(cage1Geom, cage1Mat);
    coreGroup.add(cage1);

    const cage2Geom = new THREE.OctahedronGeometry(0.95, 0);
    const cage2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8BB9FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const cage2 = new THREE.Mesh(cage2Geom, cage2Mat);
    coreGroup.add(cage2);

    // C. Point light inside the core casting violet illumination on the monolith
    const coreLight = new THREE.PointLight('#9B7BFF', 8.0, 16);
    coreLight.position.set(0, 0, 0);
    coreGroup.add(coreLight);

    // 7. ORBITAL RINGS
    const createOrbitalRing = (radius: number, tiltX: number, tiltZ: number, color: string) => {
      const ringGeom = new THREE.TorusGeometry(radius, 0.016, 16, 120);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.z = tiltZ;
      return ringMesh;
    };

    const ring1 = createOrbitalRing(3.1, Math.PI / 4, 0.2, '#9B7BFF');
    const ring2 = createOrbitalRing(3.8, -Math.PI / 3, -0.4, '#8BB9FF');
    const ring3 = createOrbitalRing(4.5, Math.PI / 2.6, 0.5, '#B9A6FF');
    orbitalGroup.add(ring1);
    orbitalGroup.add(ring2);
    orbitalGroup.add(ring3);

    // 8. THE FOUR ELEMENTAL ORBITING SATELLITES
    const satellites: {
      mesh: THREE.Group;
      data: SatelliteInfo;
      orbitRadius: number;
      orbitSpeed: number;
      orbitTiltX: number;
      orbitTiltZ: number;
      angle: number;
    }[] = [];

    const clickableMeshes: THREE.Object3D[] = [];

    // Helper to register interactive satellites
    const addSatellite = (
      group: THREE.Group,
      data: SatelliteInfo,
      radius: number,
      speed: number,
      tiltX: number,
      tiltZ: number,
      startAngle: number
    ) => {
      group.userData = { satelliteId: data.id, info: data };
      orbitalGroup.add(group);
      satellites.push({
        mesh: group,
        data,
        orbitRadius: radius,
        orbitSpeed: speed,
        orbitTiltX: tiltX,
        orbitTiltZ: tiltZ,
        angle: startAngle,
      });
      // Add all children meshes for raycasting
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.userData = { parentSatellite: data };
          clickableMeshes.push(child);
        }
      });
    };

    // Satellite 1: "PEOPLE" (Faceted Crystalline Star with Radiant Core)
    const peopleGroup = new THREE.Group();
    const pGeom = new THREE.OctahedronGeometry(0.32, 0);
    const pMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9B7BFF'),
      emissive: new THREE.Color('#9B7BFF'),
      emissiveIntensity: 1.5,
      roughness: 0.15,
      metalness: 0.8,
    });
    const pMesh = new THREE.Mesh(pGeom, pMat);
    peopleGroup.add(pMesh);
    pMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(pGeom), edgeBlueMaterial));
    addSatellite(peopleGroup, SATELLITE_DATA[0], 3.1, 0.24, Math.PI / 4, 0.2, 0);

    // Satellite 2: "IDEAS" (Stella Octangula / Dodecahedron kinetic beacon)
    const ideasGroup = new THREE.Group();
    const iGeom = new THREE.DodecahedronGeometry(0.28, 0);
    const iMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B9A6FF'),
      emissive: new THREE.Color('#B9A6FF'),
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.85,
    });
    const iMesh = new THREE.Mesh(iGeom, iMat);
    ideasGroup.add(iMesh);
    iMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(iGeom), edgeVioletMaterial));
    addSatellite(ideasGroup, SATELLITE_DATA[1], 3.8, -0.19, -Math.PI / 3, -0.4, Math.PI / 2);

    // Satellite 3: "SKILLS" (Precision Interlocking Gyroscopic Rings)
    const skillsGroup = new THREE.Group();
    const sRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.022, 12, 32), obsidianMaterial);
    const sRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.02, 12, 32), titaniumMaterial);
    sRing2.rotation.x = Math.PI / 2;
    skillsGroup.add(sRing1);
    skillsGroup.add(sRing2);
    const sCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.MeshBasicMaterial({ color: '#8BB9FF' })
    );
    skillsGroup.add(sCore);
    addSatellite(skillsGroup, SATELLITE_DATA[2], 3.6, 0.28, Math.PI / 2.6, 0.5, Math.PI);

    // Satellite 4: "PROJECTS" (Architectural Cantilevered Monolith Block)
    const projectsGroup = new THREE.Group();
    const prGeom = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const prMesh = new THREE.Mesh(prGeom, obsidianMaterial);
    projectsGroup.add(prMesh);
    prMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(prGeom), edgeVioletMaterial));
    const prAccent = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.5),
      new THREE.MeshBasicMaterial({ color: '#9AD8B0' })
    );
    projectsGroup.add(prAccent);
    addSatellite(projectsGroup, SATELLITE_DATA[3], 4.5, -0.15, -Math.PI / 4, 0.3, (3 * Math.PI) / 2);

    // 9. DELICATE AMBIENT BUILDER DUST PARTICLES
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cViolet = new THREE.Color('#9B7BFF');
    const cBlue = new THREE.Color('#8BB9FF');

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = Math.random() > 0.5 ? cViolet : cBlue;
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    universeRoot.add(particles);

    // 10. SCENE LIGHTING
    const ambientLight = new THREE.AmbientLight('#111218', 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#F1F0F5', 1.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimBlueLight = new THREE.DirectionalLight('#8BB9FF', 3.2);
    rimBlueLight.position.set(-6, -3, 3);
    scene.add(rimBlueLight);

    const backVioletLight = new THREE.DirectionalLight('#9B7BFF', 2.8);
    backVioletLight.position.set(0, -5, -4);
    scene.add(backVioletLight);

    // 11. INTERACTION & ROTATION DYNAMICS
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    let isPointerDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotStartX = 0;
    let dragRotStartY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2(-999, -999);

    // Pointer move listener
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseCoord.set(x, y);

      if (isPointerDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        targetRotationY = dragRotStartY + deltaX * 0.007;
        targetRotationX = Math.max(-0.6, Math.min(0.6, dragRotStartX + deltaY * 0.007));
      } else {
        // Subtle 3D parallax
        targetRotationY = x * 0.28;
        targetRotationX = -y * 0.22;
      }

      // Raycasting for satellite hover
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(clickableMeshes, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const info = hit.userData.parentSatellite as SatelliteInfo;
        if (info) {
          container.style.cursor = 'pointer';
          setActiveSatellite(info);
          setHudPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          return;
        }
      }
      container.style.cursor = isPointerDragging ? 'grabbing' : 'default';
      setActiveSatellite(null);
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Raycasting check for click
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(clickableMeshes, true);
      if (intersects.length > 0) {
        // Trigger energy pulse toward core
        setPulseActive(true);
        coreLight.intensity = 18.0;
        setTimeout(() => {
          coreLight.intensity = 8.0;
          setPulseActive(false);
        }, 500);
        return;
      }

      isPointerDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragRotStartX = targetRotationX;
      dragRotStartY = targetRotationY;
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      isPointerDragging = false;
      container.style.cursor = 'default';
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 12. RESIZE & VISIBILITY (IntersectionObserver)
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth inertia damping for universe rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      universeRoot.rotation.x = currentRotationX + 0.08;
      universeRoot.rotation.y = currentRotationY + elapsed * 0.12; // slow continuous idle rotation

      // Central core pulsing & rotation
      coreGroup.rotation.y = elapsed * 0.45;
      cage1.rotation.x = elapsed * -0.55;
      cage1.rotation.z = elapsed * 0.35;
      cage2.rotation.y = elapsed * 0.65;
      cage2.rotation.x = elapsed * 0.45;

      const corePulse = 1.0 + Math.sin(elapsed * 2.5) * 0.07;
      coreJewel.scale.set(corePulse, corePulse, corePulse);

      // Orbital rings independent rotation
      ring1.rotation.z = elapsed * 0.08;
      ring2.rotation.y = elapsed * -0.06;
      ring3.rotation.z = elapsed * 0.05;

      // Update 4 Satellites position along their elliptical orbits
      satellites.forEach((sat) => {
        sat.angle += sat.orbitSpeed * 0.02;

        const x = sat.orbitRadius * Math.cos(sat.angle);
        const z = sat.orbitRadius * Math.sin(sat.angle);

        // Compute 3D tilted coordinate
        const pos = new THREE.Vector3(x, 0, z);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), sat.orbitTiltX);
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), sat.orbitTiltZ);

        sat.mesh.position.copy(pos);
        sat.mesh.rotation.y = elapsed * 0.6;
        sat.mesh.rotation.x = elapsed * 0.4;
      });

      // Ambient particles slow swirl
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.08) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 14. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      renderer.dispose();
      leftPillarGeom.dispose();
      rightPillarGeom.dispose();
      stepGeom.dispose();
      diagGeom.dispose();
      glassShroudGeom.dispose();
      coreJewelGeom.dispose();
      cage1Geom.dispose();
      cage2Geom.dispose();
      particleGeom.dispose();

      obsidianMaterial.dispose();
      titaniumMaterial.dispose();
      smokedGlassMaterial.dispose();
      edgeBlueMaterial.dispose();
      edgeVioletMaterial.dispose();
      coreJewelMat.dispose();
      cage1Mat.dispose();
      cage2Mat.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-[420px] h-[420px] rounded-2xl bg-nc-surface-2/60 border border-nc-border p-6 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-nc-violet/20 border border-nc-violet flex items-center justify-center text-nc-violet shadow-glow-violet mb-4">
            <span className="font-display font-bold text-2xl">N</span>
          </div>
          <h4 className="font-display font-bold text-nc-text text-base">The Builder Universe</h4>
          <p className="text-xs text-nc-text-muted mt-2 max-w-xs">
            An architectural sculpture of interconnected builders, skills, ideas, and projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] lg:h-[640px] flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-label="Nightclub 3D Builder Universe Architectural Centerpiece"
    >
      {/* Background radial vignette ensuring seamless integration with #09090D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(155, 123, 255, 0.12) 0%, rgba(139, 185, 255, 0.04) 45%, rgba(9, 9, 13, 0) 72%)',
        }}
      />

      {/* Dynamic HUD Tooltip for hovered Satellite */}
      {activeSatellite && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-12"
          style={{
            left: `${hudPosition.x}px`,
            top: `${hudPosition.y}px`,
          }}
        >
          <div className="px-3.5 py-2 rounded-xl bg-nc-surface-1/90 border border-nc-violet/40 backdrop-blur-md shadow-glass text-left">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: activeSatellite.color, color: activeSatellite.color }}
              />
              <span className="text-xs font-mono font-bold tracking-wider text-nc-text">
                {activeSatellite.name}
              </span>
              <span className="text-[10px] text-nc-violet-soft font-medium">
                · {activeSatellite.role}
              </span>
            </div>
            <p className="text-[11px] text-nc-text-muted mt-0.5 max-w-[200px]">
              {activeSatellite.desc}
            </p>
          </div>
        </div>
      )}

      {/* Subtle interaction tip */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-[10px] font-mono uppercase tracking-widest text-nc-text-subtle opacity-60">
        DRAG TO ROTATE · HOVER NODES
      </div>
    </div>
  );
};
