"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, animates in on `true` (e.g. after splash) instead of on scroll. */
  when?: boolean;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  when,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    if (when !== undefined && !when) {
      return null;
    }
    return <div className={className}>{children}</div>;
  }

  if (when !== undefined) {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0, y }}
        animate={when ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{
          duration: 0.5,
          delay: when ? delay : 0,
          ease: revealEase,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px -24px 0px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}
