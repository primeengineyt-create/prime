'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Orb3DProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Orb3D({ className, style }: Orb3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className={`orb-container ${className || ''}`} style={style}>
      <motion.div
        className="orb-wrapper"
        style={{ y, rotate }}
      >
        <div className="orb-glow" />
        <div className="orb-body">
          <div className="orb-shine" />
          <div className="orb-star">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
            </svg>
          </div>
          {/* Subtle stars around */}
          <div className="star-mini s1" />
          <div className="star-mini s2" />
        </div>
      </motion.div>
      <style jsx>{`
        .orb-container {
          position: absolute;
          right: -5%;
          top: 20%;
          width: 600px;
          height: 600px;
          pointer-events: none;
          z-index: 0;
          perspective: 1000px;
        }

        .orb-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: float 10s ease-in-out infinite;
        }

        .orb-body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          background: var(--orb-gradient);
          box-shadow: var(--orb-shadow);
          animation: morph 8s ease-in-out infinite alternate;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .orb-body::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--orb-surface);
          border-radius: inherit;
          mix-blend-mode: overlay;
        }

        .orb-shine {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 60%;
          height: 60%;
          background: var(--orb-core);
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.8;
        }

        .orb-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(110, 56, 255, 0.4) 0%, transparent 70%);
          filter: blur(60px);
          opacity: 0.6;
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .orb-star {
            position: relative;
            z-index: 10;
            filter: drop-shadow(0 0 20px rgba(255,255,255,0.8));
            animation: star-pulse 3s ease-in-out infinite;
        }

        .star-mini {
            position: absolute;
            width: 12px;
            height: 12px;
            background: white;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation: twinkle 4s ease-in-out infinite;
        }
        .s1 { top: 30%; right: 25%; animation-delay: 1s; transform: scale(0.6); }
        .s2 { bottom: 25%; left: 30%; animation-delay: 2s; transform: scale(0.8); }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }

        @keyframes morph {
          0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          100% { border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes star-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes twinkle {
            0%, 100% { transform: scale(0.6) rotate(0deg); opacity: 1; }
            50% { transform: scale(0) rotate(180deg); opacity: 0; }
        }

        @media (max-width: 1024px) {
          .orb-container {
            width: 400px;
            height: 400px;
            right: -10%;
            top: 15%;
          }
          .orb-body {
            width: 220px;
            height: 220px;
          }
          .orb-glow {
            width: 350px;
            height: 350px;
          }
          .orb-star svg {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 640px) {
          .orb-container {
            width: 300px;
            height: 300px;
            right: -20%;
            top: 10%;
            opacity: 0.6;
          }
          .orb-body {
            width: 160px;
            height: 160px;
          }
          .orb-glow {
            width: 250px;
            height: 250px;
          }
          .star-mini {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
