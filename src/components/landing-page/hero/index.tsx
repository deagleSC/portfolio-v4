"use client";

import type { ReactNode } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePageReveal } from "@/components/PageRevealContext";
import { cn } from "@/lib/utils";
import info from "@/data/info.json";

const socialIconClass = "size-5";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const isExternalApp = href.startsWith("mailto:") || href.startsWith("tel:");
  return (
    <a
      href={href}
      target={isExternalApp ? undefined : "_blank"}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "text-foreground/80 transition-transform duration-200 hover:text-primary hover:bg-primary/10 hover:scale-110 active:scale-95",
      )}
    >
      {children}
    </a>
  );
}

const heroEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const revealed = usePageReveal();
  const reduce = useReducedMotion();
  const phoneRaw = info.phone.trim();
  const phone = phoneRaw.length > 0 ? phoneRaw : null;
  const telHref = phone ? `tel:${phone.replace(/[\s()-]/g, "")}` : "";

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: heroEase },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.06 },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-2 justify-center h-full"
      variants={reduce ? undefined : container}
      initial={reduce ? false : "hidden"}
      animate={
        reduce
          ? revealed
            ? { opacity: 1 }
            : { opacity: 0 }
          : revealed
            ? "show"
            : "hidden"
      }
      transition={
        reduce ? { duration: revealed ? 0.2 : 0, ease: heroEase } : undefined
      }
    >
      <motion.h1
        className="text-4xl font-bold"
        variants={reduce ? undefined : item}
      >
        {info.name}
      </motion.h1>
      <motion.h3 className="text-primary" variants={reduce ? undefined : item}>
        {info.designation} @{info.company}
      </motion.h3>
      <motion.p variants={reduce ? undefined : item}>{info.summary}</motion.p>
      <motion.nav
        className="flex flex-wrap items-center gap-1 pt-2"
        aria-label="Social links"
        variants={reduce ? undefined : item}
      >
        <SocialLink href={`mailto:${info.email}`} label="Email">
          <Mail className={socialIconClass} aria-hidden />
        </SocialLink>
        <SocialLink href={info.linkedin} label="LinkedIn">
          <Linkedin className={socialIconClass} aria-hidden />
        </SocialLink>
        <SocialLink href={info.github} label="GitHub">
          <Github className={socialIconClass} aria-hidden />
        </SocialLink>
        {phone ? (
          <SocialLink href={telHref} label="Phone">
            <Phone className={socialIconClass} aria-hidden />
          </SocialLink>
        ) : null}
      </motion.nav>
      <motion.div variants={reduce ? undefined : item} className="mt-4">
        <Button className="w-fit px-4 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <a href={info.resumeUri} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
