"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import info from "@/data/info.json";

const ease = [0.22, 1, 0.36, 1] as const;

function jsxTagFromName(name: string) {
  return (
    name
      .split(" ")[0]
      ?.toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "home"
  );
}

type SplashScreenProps = {
  onDismiss?: () => void;
};

export default function SplashScreen({ onDismiss }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [scrollLocked, setScrollLocked] = useState(true);
  const reduce = useReducedMotion();

  const tag = jsxTagFromName(info.name);
  const displayMs = reduce ? 450 : 1000;
  const exitDuration = reduce ? 0.18 : 0.38;
  const barDuration = reduce ? 0.35 : 0.85;

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [scrollLocked]);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), displayMs);
    return () => window.clearTimeout(id);
  }, [displayMs]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setScrollLocked(false);
        onDismiss?.();
      }}
    >
      {visible ? (
        <motion.div
          key="splash"
          role="status"
          aria-label="Loading"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background px-6"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: exitDuration, ease },
          }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="flex items-center gap-2 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="text-muted-foreground" aria-hidden>
                &lt;
              </span>
              <span className="text-primary">{tag}</span>
              <span className="text-muted-foreground" aria-hidden>
                {" "}
                /&gt;
              </span>
            </motion.div>
            <div className="h-1 w-44 overflow-hidden rounded-full bg-primary/15 sm:w-52">
              <motion.div
                className="h-full origin-left rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: barDuration,
                  ease,
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
