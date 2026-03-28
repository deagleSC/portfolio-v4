"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 120;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 12, scale: reduce ? 1 : 0.92 }
      }
      transition={{
        duration: reduce ? 0.15 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Button
        type="button"
        variant="default"
        size="icon"
        aria-label="Scroll to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        onClick={goTop}
        className={cn(
          "size-11 rounded-full shadow-md transition-shadow duration-200 hover:shadow-lg",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <ChevronUp className="size-5" aria-hidden />
      </Button>
    </motion.div>
  );
}
