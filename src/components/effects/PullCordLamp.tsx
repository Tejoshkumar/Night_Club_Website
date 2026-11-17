import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export interface PullCordLampProps {
  isLampOn: boolean;
  onToggle: (newState: boolean) => void;
  className?: string;
  lightIntensity?: number; // 0 to 1
}

// Synthesize a subtle mechanical switch click using Web Audio API
function playSwitchSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // AudioContext might be restricted until user gesture; safe to ignore
  }
}

export const PullCordLamp: React.FC<PullCordLampProps> = ({
  isLampOn,
  onToggle,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const dragStartY = useRef(0);
  const currentPull = useRef(0);

  // Motion value for pull cord extension
  const pullY = useMotionValue(0);
  const smoothPullY = useSpring(pullY, { stiffness: 450, damping: 22, mass: 0.8 });

  const PULL_THRESHOLD = 45; // pixels to trigger toggle
  const MAX_PULL = 90;

  // Handle pointer down on bead
  const handlePointerDown = (e: React.PointerEvent<SVGGElement>) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartY.current = e.clientY;
    currentPull.current = 0;
  };

  // Handle pointer move
  const handlePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY > 0) {
      // Elastic resistance formula
      const damped = deltaY * (1 / (1 + deltaY * 0.006));
      const clamped = Math.min(MAX_PULL, damped);
      currentPull.current = clamped;
      pullY.set(clamped);
    } else {
      currentPull.current = 0;
      pullY.set(0);
    }
  };

  // Handle pointer release
  const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    if (!isDragging) return;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);

    if (currentPull.current >= PULL_THRESHOLD) {
      triggerToggle();
    }

    // Spring snap back to 0
    pullY.set(0);
    currentPull.current = 0;
  };

  const triggerToggle = useCallback(() => {
    playSwitchSound();
    if (navigator.vibrate) {
      try { navigator.vibrate(20); } catch {}
    }
    const nextState = !isLampOn;
    if (nextState) {
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 350);
    }
    onToggle(nextState);
  }, [isLampOn, onToggle]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Animate cord bounce on keypress
      pullY.set(50);
      setTimeout(() => pullY.set(0), 120);
      triggerToggle();
    }
  };

  // Resting coordinates for the lamp assembly
  // Lamp Center X = 160
  // Cord anchor offset X = 200 (to the right of bulb)
  const cordOriginX = 202;
  const cordOriginY = 175; // underneath shade rim
  const restingBeadY = 285;

  const cordEndY = useTransform(smoothPullY, (val) => restingBeadY + val);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Interactive instruction pill above the lamp */}
      <div className="mb-2 text-center transition-all duration-300">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-300 ${
            isLampOn
              ? 'text-nc-violet-soft bg-nc-violet/10 border border-nc-violet/30 shadow-glow-subtle'
              : 'text-nc-text-muted bg-nc-surface-2 border border-nc-border animate-pulse'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLampOn ? 'bg-nc-violet shadow-[0_0_8px_#9B7BFF]' : 'bg-nc-text-subtle'
            }`}
          />
          {isLampOn ? 'PULL CORD TO DIM ROOM' : 'PULL STRING TO TURN ON LIGHT'}
        </span>
      </div>

      {/* SVG Canvas for Lamp, Cord, Bead, and Light effects */}
      <div className="relative w-[340px] h-[440px] pointer-events-auto">
        {/* Background Spotlight Radial Glow when Lamp is ON */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isLampOn
              ? isFlickering
                ? 'opacity-40'
                : 'opacity-100'
              : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(circle at 160px 185px, rgba(155, 123, 255, 0.45) 0%, rgba(139, 185, 255, 0.18) 35%, rgba(9, 9, 13, 0) 70%)',
            filter: 'blur(16px)',
          }}
        />

        <svg
          viewBox="0 0 320 400"
          className="w-full h-full overflow-visible"
          aria-hidden="false"
        >
          <defs>
            {/* Metallic Linear Gradient for Rod & Sockets */}
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1F2B" />
              <stop offset="35%" stopColor="#353648" />
              <stop offset="70%" stopColor="#191A23" />
              <stop offset="100%" stopColor="#0E0F14" />
            </linearGradient>

            {/* Lamp Shade Exterior Gradient */}
            <linearGradient id="shadeExterior" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#151620" />
              <stop offset="25%" stopColor="#252636" />
              <stop offset="50%" stopColor="#2E3044" />
              <stop offset="75%" stopColor="#1A1B26" />
              <stop offset="100%" stopColor="#101118" />
            </linearGradient>

            {/* Bulb Glow Interior Gradient */}
            <radialGradient id="bulbGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#E2D9FF" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#9B7BFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8BB9FF" stopOpacity="0.3" />
            </radialGradient>

            {/* Rim Highlight Gradient */}
            <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9B7BFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8BB9FF" stopOpacity="0.8" />
            </linearGradient>

            {/* Bead Metallic Sphere Gradient */}
            <radialGradient id="beadMetal" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E0DBF8" />
              <stop offset="40%" stopColor="#9B7BFF" />
              <stop offset="85%" stopColor="#2F2552" />
              <stop offset="100%" stopColor="#141024" />
            </radialGradient>

            {/* Glow Filter */}
            <filter id="lampGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Ceiling Mount / Flange */}
          <ellipse cx="160" cy="4" rx="22" ry="5" fill="url(#darkMetal)" stroke="#292A36" strokeWidth="1" />

          {/* 2. Hanging Cable / Rod */}
          <line
            x1="160"
            y1="4"
            x2="160"
            y2="105"
            stroke="url(#darkMetal)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* 3. Upper Socket Ring */}
          <rect x="150" y="102" width="20" height="12" rx="2" fill="url(#darkMetal)" stroke="#292A36" strokeWidth="1" />

          {/* 4. Main Lamp Shade (Trapezoid Flare) */}
          <path
            d="M 142 114 L 178 114 L 235 174 L 85 174 Z"
            fill="url(#shadeExterior)"
            stroke="#292A36"
            strokeWidth="1.2"
          />

          {/* 5. Underside / Inner Rim of Shade */}
          <ellipse
            cx="160"
            cy="174"
            rx="75"
            ry="14"
            fill={isLampOn ? '#281F4A' : '#111218'}
            stroke={isLampOn ? 'url(#rimGlow)' : '#292A36'}
            strokeWidth={isLampOn ? '2' : '1.2'}
            className="transition-colors duration-300"
          />

          {/* 6. Illuminated Light Cone from underneath shade (SVG Beam) */}
          {isLampOn && (
            <g
              className={`transition-opacity duration-300 ${
                isFlickering ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <polygon
                points="85,176 235,176 360,400 -40,400"
                fill="url(#bulbGlowGrad)"
                opacity="0.16"
                filter="url(#lampGlowFilter)"
              />
            </g>
          )}

          {/* 7. Light Bulb */}
          <g>
            {/* Halo behind bulb when ON */}
            {isLampOn && (
              <circle
                cx="160"
                cy="184"
                r={isFlickering ? 24 : 32}
                fill="#9B7BFF"
                opacity={isFlickering ? 0.35 : 0.6}
                filter="url(#lampGlowFilter)"
                className="transition-all duration-150"
              />
            )}

            {/* Physical Bulb Sphere */}
            <circle
              cx="160"
              cy="184"
              r="14"
              fill={isLampOn ? (isFlickering ? '#DCD2FF' : '#FFFFFF') : '#1E1F29'}
              stroke={isLampOn ? '#B9A6FF' : '#353648'}
              strokeWidth="1.5"
              className="transition-colors duration-200"
            />

            {/* Glowing Filament inside bulb when ON */}
            {isLampOn ? (
              <path
                d="M 155 186 Q 160 178 165 186"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_6px_#FFFFFF]"
              />
            ) : (
              <path
                d="M 156 185 Q 160 180 164 185"
                fill="none"
                stroke="#48495C"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* 8. Pull Cord & Bead (Interactive Spring) */}
          <g>
            {/* Cord Socket Outlet */}
            <rect x={cordOriginX - 3} y={cordOriginY - 2} width="6" height="5" rx="1.5" fill="#20212C" />

            {/* Dynamic Cord Line */}
            <motion.line
              x1={cordOriginX}
              y1={cordOriginY}
              x2={cordOriginX}
              y2={cordEndY}
              stroke={isLampOn ? '#8BB9FF' : '#5A5B6E'}
              strokeWidth="1.8"
              strokeDasharray="2 2"
              className="transition-colors duration-300"
            />

            {/* Draggable Metallic Bead */}
            <motion.g
              style={{
                y: smoothPullY,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              tabIndex={0}
              role="switch"
              aria-checked={isLampOn}
              aria-label="Pull cord to toggle lamp light"
              onKeyDown={handleKeyDown}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-nc-violet group"
            >
              {/* Invisible larger hit area for easy touch dragging */}
              <circle
                cx={cordOriginX}
                cy={restingBeadY}
                r="26"
                fill="transparent"
                className="cursor-grab active:cursor-grabbing"
              />

              {/* Cord connector loop */}
              <circle
                cx={cordOriginX}
                cy={restingBeadY - 11}
                r="3.5"
                fill="none"
                stroke="url(#beadMetal)"
                strokeWidth="1.5"
              />

              {/* Glowing ring when focused or hovered */}
              <circle
                cx={cordOriginX}
                cy={restingBeadY}
                r="15"
                fill="none"
                stroke="#9B7BFF"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="opacity-0 group-hover:opacity-75 group-focus-visible:opacity-100 transition-opacity"
              />

              {/* Bead sphere */}
              <circle
                cx={cordOriginX}
                cy={restingBeadY}
                r="9.5"
                fill="url(#beadMetal)"
                stroke={isLampOn ? '#B9A6FF' : '#45465A'}
                strokeWidth="1.2"
                className={`transition-all duration-200 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
                  isLampOn ? 'drop-shadow-[0_0_8px_#9B7BFF]' : ''
                }`}
              />

              {/* Bead specular highlight reflection */}
              <ellipse
                cx={cordOriginX - 2.8}
                cy={restingBeadY - 2.8}
                rx="3"
                ry="2"
                fill="#FFFFFF"
                opacity={isLampOn ? '0.85' : '0.45'}
              />
            </motion.g>
          </g>
        </svg>
      </div>

      {/* Subtle indicator caption below lamp */}
      <div className="text-[10px] text-nc-text-subtle font-mono mt-1 text-center">
        {isDragging ? 'DRAGGING CORD...' : isLampOn ? 'LIGHT ENGAGED' : 'CLICK OR DRAG BEAD'}
      </div>
    </div>
  );
};
