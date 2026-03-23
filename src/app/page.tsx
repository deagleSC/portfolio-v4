"use client";

import Hero from "@/components/landing-page/hero";
import Experience from "@/components/landing-page/experience";
import Projects from "@/components/landing-page/projects";
import GetInTouch from "@/components/landing-page/get-in-touch";
import SiteNavbar from "@/components/landing-page/site-navbar";

import ParticleBackground from "@/components/ParticleBackground";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <ScrollToTop />
      <div className="relative flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8 overflow-hidden w-full min-h-screen py-24">
        <ParticleBackground />

        <div className="flex flex-col gap-20 max-w-prose w-full">
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
      </div>
    </>
  );
}
