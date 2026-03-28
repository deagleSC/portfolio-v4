"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { usePageReveal } from "@/components/PageRevealContext";
import info from "@/data/info.json";

type Project = (typeof info.projects)[number];

function LinkSlot({
  href,
  label,
  icon: Icon,
}: {
  href: string | null;
  label: string;
  icon: LucideIcon;
}) {
  const className =
    "text-sm inline-flex items-center gap-1.5 font-medium transition-colors";
  const inner = (
    <>
      <Icon className="w-4 h-4 shrink-0" aria-hidden />
      {label}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} text-primary hover:bg-primary/10 rounded-lg px-2 py-1`}
      >
        {inner}
      </a>
    );
  }

  return <span className={`${className} text-muted-foreground`}>{inner}</span>;
}

function ProjectMedia({ project }: { project: Project }) {
  const { mediaKind, mediaSrc, mediaPoster, title } = project;

  if (mediaKind === "video") {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={mediaPoster ?? undefined}
        >
          <source src={mediaSrc} />
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      <Image
        src={mediaSrc}
        alt={`${title} preview`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

const cardEase = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const reduce = useReducedMotion();
  const revealed = usePageReveal();
  const projects = info.projects;
  if (!projects?.length) return null;

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.11,
        delayChildren: reduce ? 0 : 0.07,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.48, ease: cardEase },
    },
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <motion.h2
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 14 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{
          duration: reduce ? 0 : 0.42,
          delay: reduce ? 0 : 0.12,
          ease: cardEase,
        }}
      >
        Projects
      </motion.h2>
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full list-none p-0 m-0"
        variants={listVariants}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            className="flex flex-col overflow-hidden rounded-lg bg-accent/40 border border-border/60 transition-colors duration-300 shadow-sm hover:shadow-md hover:border-primary/25"
            whileHover={
              reduce
                ? undefined
                : { y: -4, transition: { duration: 0.22, ease: cardEase } }
            }
            whileTap={reduce ? undefined : { scale: 0.997 }}
          >
            <ProjectMedia project={project} />
            <div className="flex flex-col gap-3 p-4 flex-1">
              <h3 className="text-primary font-semibold font-mono text-lg">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed">{project.description}</p>
              {project.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 mt-auto border-t border-border/50">
                <LinkSlot
                  href={project.live}
                  label="Live"
                  icon={ExternalLink}
                />
                <LinkSlot href={project.github} label="GitHub" icon={Github} />
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
