import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

export default function Projects() {
  const projects = info.projects;
  if (!projects?.length) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full list-none p-0 m-0">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col overflow-hidden rounded-lg bg-accent/40 border border-border/60 transition-colors"
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
          </li>
        ))}
      </ul>
    </div>
  );
}
