"use client";

import { Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { usePageReveal } from "@/components/PageRevealContext";
import info from "@/data/info.json";

const ease = [0.22, 1, 0.36, 1] as const;

export default function GetInTouch() {
  const { email, linkedin, contactMessage } = info;
  const reduce = useReducedMotion();
  const revealed = usePageReveal();

  return (
    <div className="flex flex-col gap-4 w-full">
      <motion.h2
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 14 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{
          duration: reduce ? 0 : 0.42,
          delay: reduce ? 0 : 0.1,
          ease,
        }}
      >
        Get in touch
      </motion.h2>
      <Reveal when={revealed} delay={0.18}>
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {contactMessage}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              size="lg"
              className="w-full sm:w-fit px-5 shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden />
                Email <div className="w-1 h-1 bg-secondary rounded-full"></div>
                <span className="text-xs font-mono text-secondary break-all sm:break-normal">
                  {email}
                </span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-fit px-5 border-primary/25 bg-background/60 transition-transform duration-200 hover:bg-primary/10 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98] dark:bg-input/20"
            >
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
