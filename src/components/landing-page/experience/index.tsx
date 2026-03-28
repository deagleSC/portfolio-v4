"use client";

import { CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { usePageReveal } from "@/components/PageRevealContext";
import info from "../../../data/info.json";
import Timeline from "./timeline";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
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
        Experience
      </motion.h2>
      <Timeline
        items={info.experience?.map((exp) => ({
          ...exp,
          content: (
            <div>
              <ul className="mt-2 list-disc">
                {exp.points?.map((point, index) => (
                  <motion.li
                    key={index}
                    className="my-4 flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: reduce ? 0 : 0.36,
                      delay: reduce ? 0 : 0.22 + index * 0.035,
                      ease,
                    }}
                  >
                    <motion.div
                      initial={{ scale: reduce ? 1 : 0 }}
                      animate={
                        revealed ? { scale: 1 } : { scale: reduce ? 1 : 0 }
                      }
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        delay: reduce ? 0 : 0.24 + index * 0.035,
                        ease,
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mt-1 text-primary" />
                    </motion.div>
                    <div>{point}</div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ),
        }))}
      />
    </div>
  );
}
