"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import info from "@/data/info.json";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { usePageReveal } from "@/components/PageRevealContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#get-in-touch", label: "Get in touch" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Horizontal nav: soft label + pill underline (no inset shadow / heavy fill). */
function desktopNavLinkClass(active: boolean) {
  return cn(
    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
    focusRing,
    active
      ? "text-primary after:pointer-events-none after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-primary after:content-['']"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  );
}

/** Sheet list: left accent bar reads clearly in a vertical stack. */
function mobileNavLinkClass(active: boolean) {
  return cn(
    "block rounded-md border-l-2 border-transparent py-3 pl-3 pr-3 text-base font-medium transition-colors duration-200",
    focusRing,
    active
      ? "border-primary bg-primary/8 text-primary"
      : "text-foreground hover:border-border/70 hover:bg-muted/40",
  );
}

function readHeaderOffsetPx() {
  const header = document.querySelector("header");
  return Math.ceil(header?.getBoundingClientRect().height ?? 56) + 6;
}

function parseHashSectionId(): string | null {
  const raw = decodeURIComponent(window.location.hash.slice(1)).trim();
  return raw && SECTION_IDS.includes(raw) ? raw : null;
}

/**
 * Active section = most overlap with a "reading band" below the fixed header
 * (not "last section whose top passed a line", which breaks scroll-mt + /#hash).
 * Scroll + resize keep state in sync; hash sets immediately for correct first paint.
 */
function useActiveSectionId() {
  const [activeId, setActiveId] = React.useState<string>(
    SECTION_IDS[0] ?? "home",
  );

  React.useLayoutEffect(() => {
    const fromHash = parseHashSectionId();
    if (fromHash) {
      setActiveId(fromHash);
    }
  }, []);

  React.useEffect(() => {
    let raf = 0;

    const pickActive = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docBottom = document.documentElement.scrollHeight;
      if (scrollBottom >= docBottom - 4) {
        const last = SECTION_IDS[SECTION_IDS.length - 1];
        if (last) setActiveId((p) => (p === last ? p : last));
        return;
      }

      const bandTop = readHeaderOffsetPx();
      const bandBottom = Math.max(
        bandTop + 120,
        Math.round(window.innerHeight * 0.58),
      );

      let bestId = SECTION_IDS[0] ?? "home";
      let bestOverlap = -1;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const overlapTop = Math.max(r.top, bandTop);
        const overlapBottom = Math.min(r.bottom, bandBottom);
        const overlap = Math.max(0, overlapBottom - overlapTop);
        if (overlap >= bestOverlap) {
          bestOverlap = overlap;
          bestId = id;
        }
      }

      if (bestOverlap <= 0) {
        const off = bandTop;
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const id = SECTION_IDS[i];
          if (!id) continue;
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= off && r.bottom > off) {
            bestId = id;
            break;
          }
        }
      }

      setActiveId((p) => (p === bestId ? p : bestId));
    };

    const schedulePick = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        pickActive();
      });
    };

    pickActive();
    requestAnimationFrame(() => {
      pickActive();
      requestAnimationFrame(pickActive);
    });

    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);

    const onHashChange = () => {
      const hid = parseHashSectionId();
      if (hid) {
        setActiveId(hid);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(pickActive);
      });
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return activeId;
}

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const revealed = usePageReveal();
  const reduce = useReducedMotion();
  const activeSectionId = useActiveSectionId();

  const closeMobile = React.useCallback(() => setMobileOpen(false), []);

  const jsxTag =
    info.name
      .split(" ")[0]
      ?.toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "home";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 supports-backdrop-filter:backdrop-blur-md"
      initial={{ y: -20, opacity: 0 }}
      animate={revealed ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{
        duration: reduce ? (revealed ? 0.15 : 0) : 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#home"
          aria-label={`Home — ${info.name}`}
          className="truncate text-sm font-semibold transition-colors hover:opacity-90 sm:text-base flex items-center gap-2 font-mono tracking-tight"
        >
          <span className="text-muted-foreground" aria-hidden>
            &lt;
          </span>
          <span className="text-primary">{jsxTag}</span>
          <span className="text-muted-foreground" aria-hidden>
            {" "}
            /&gt;
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.href.slice(1);
            const active = activeSectionId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={desktopNavLinkClass(active)}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <Sheet open={mobileOpen} onOpenChange={(open) => setMobileOpen(open)}>
          <SheetTrigger
            type="button"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "md:hidden shrink-0",
            )}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,20rem)] gap-0">
            <SheetHeader className="border-b border-border/60 text-left">
              <SheetTitle className="font-mono text-primary">Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Main" className="flex flex-col gap-0 p-2">
              {NAV_ITEMS.map((item, i) => (
                <React.Fragment key={item.href}>
                  {i > 0 ? <Separator className="my-1 bg-border/60" /> : null}
                  <a
                    href={item.href}
                    className={cn(
                      mobileNavLinkClass(
                        activeSectionId === item.href.slice(1),
                      ),
                      "font-mono tracking-tight",
                    )}
                    aria-current={
                      activeSectionId === item.href.slice(1)
                        ? "location"
                        : undefined
                    }
                    onClick={closeMobile}
                  >
                    {item.label}
                  </a>
                </React.Fragment>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
