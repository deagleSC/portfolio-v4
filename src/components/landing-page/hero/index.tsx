import type { ReactNode } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
        "text-foreground/80 hover:text-primary hover:bg-primary/10",
      )}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const phoneRaw = info.phone.trim();
  const phone = phoneRaw.length > 0 ? phoneRaw : null;
  const telHref = phone ? `tel:${phone.replace(/[\s()-]/g, "")}` : "";

  return (
    <div className="flex flex-col gap-2 justify-center h-full">
      <h1 className="text-4xl font-bold">{info.name}</h1>
      <h3 className="text-primary">
        {info.designation} @{info.company}
      </h3>
      <p>{info.summary}</p>
      <nav
        className="flex flex-wrap items-center gap-1 pt-2"
        aria-label="Social links"
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
      </nav>
      <Button className="w-fit px-4 mt-4">
        <a href={info.resumeUri} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </Button>
    </div>
  );
}
