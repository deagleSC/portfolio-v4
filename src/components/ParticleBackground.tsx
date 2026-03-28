"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * ParticleBackground
 * Mirrors the v3 implementation: generates particles on mount
 * and animates them with Framer Motion using the primary color.
 */
export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = 64;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 3, // ~3–9px
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 3,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) =>
        reduce ? (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/75 shadow-[0_0_12px_color-mix(in_oklch,var(--color-primary)_35%,transparent)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
          />
        ) : (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary shadow-[0_0_14px_color-mix(in_oklch,var(--color-primary)_45%,transparent)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -72, 0],
              opacity: [0.52, 0.95, 0.52],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ),
      )}
    </div>
  );
}
