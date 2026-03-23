"use client";

import * as React from "react";
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
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#get-in-touch", label: "Get in touch" },
] as const;

const navLinkClass =
  "text-sm font-medium text-foreground/90 rounded-md px-2 py-1.5 transition-colors hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeMobile = React.useCallback(() => setMobileOpen(false), []);

  const jsxTag =
    info.name
      .split(" ")[0]
      ?.toLowerCase()
      .replace(/[^a-z0-9_-]/g, "") || "home";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 supports-backdrop-filter:backdrop-blur-md">
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
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </a>
          ))}
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
                      navLinkClass,
                      "px-3 py-3 text-base font-mono",
                    )}
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
    </header>
  );
}
