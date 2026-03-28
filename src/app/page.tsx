"use client";

import { motion, useReducedMotion } from "framer-motion";
import Hero from "@/components/landing-page/hero";
import Experience from "@/components/landing-page/experience";
import Projects from "@/components/landing-page/projects";
import GetInTouch from "@/components/landing-page/get-in-touch";
import SiteNavbar from "@/components/landing-page/site-navbar";

import ParticleBackground from "@/components/ParticleBackground";
import ScrollToTop from "@/components/ScrollToTop";
import {
  PageRevealProvider,
  usePageReveal,
} from "@/components/PageRevealContext";

const shellEase = [0.22, 1, 0.36, 1] as const;

function HomeMain() {
  const revealed = usePageReveal();
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8 overflow-hidden w-full min-h-screen py-24"
      initial={false}
      animate={{ opacity: revealed ? 1 : 0 }}
      transition={{
        duration: reduce ? 0 : 0.45,
        ease: shellEase,
      }}
    >
      <div className="ambient-layer" aria-hidden>
        <div className="ambient-layer__blob ambient-layer__blob--a" />
        <div className="ambient-layer__blob ambient-layer__blob--b" />
      </div>
      <ParticleBackground />

      <div className="relative z-10 flex flex-col gap-20 max-w-prose w-full">
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>
        <section id="experience" className="scroll-mt-24">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
        <section id="get-in-touch" className="scroll-mt-24">
          <GetInTouch />
        </section>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <PageRevealProvider>
      <SiteNavbar />
      <ScrollToTop />
      <HomeMain />
    </PageRevealProvider>
  );
}
