"use client";

import { GitBranch } from "lucide-react";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePageReveal } from "@/components/PageRevealContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TimelineProps = {
  items: {
    title: string;
    description?: string;
    content: string | React.ReactNode;
    date: string;
  }[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Timeline(props: TimelineProps) {
  const { items } = props;
  const reduce = useReducedMotion();
  const revealed = usePageReveal();

  return (
    <div className="flex items-center gap-5">
      <motion.div
        className="w-[2px] bg-primary self-stretch ml-3 hidden sm:block origin-top"
        initial={{ scaleY: reduce ? 1 : 0 }}
        animate={revealed ? { scaleY: 1 } : { scaleY: reduce ? 1 : 0 }}
        transition={{
          duration: reduce ? 0 : 0.55,
          delay: reduce ? 0 : 0.14,
          ease,
        }}
      />
      <div className="flex flex-col gap-12 w-full">
        {items?.map((item, index) => (
          <motion.div
            key={index}
            className="flex gap-5 w-full"
            initial={{ opacity: 0, x: -18 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{
              duration: reduce ? 0 : 0.46,
              delay: reduce ? 0 : 0.16 + index * 0.08,
              ease,
            }}
          >
            <div className="hidden sm:block">
              <GitBranch className="w-8 h-8 text-white p-2 bg-primary rounded-full -ml-9" />
            </div>
            <div className="w-full">
              <Accordion
                className="bg-accent/40 px-4 rounded-lg w-full transition-colors duration-300 hover:bg-accent/30 hover:shadow-sm"
                defaultValue={["item-1"]}
              >
                <AccordionItem value="item-1 w-full">
                  <AccordionTrigger className="flex items-center gap-4 w-full hover:no-underline">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <p className="text-xs font-mono">{item.date}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p>{item.description}</p>
                        <h3 className="text-primary font-semibold font-mono">
                          @{item.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
