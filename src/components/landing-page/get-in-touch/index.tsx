import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import info from "@/data/info.json";

export default function GetInTouch() {
  const { email, linkedin, contactMessage } = info;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Get in touch</h2>
      <div className="">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {contactMessage}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button size="lg" className="w-full sm:w-fit px-5 shadow-sm">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden />
                Email <div className="w-1 h-1 bg-secondary rounded-full"></div>
                <span className="text-xs font-mono text-secondary break-all sm:break-normal">
                  {email}
                </span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-fit px-5 border-primary/25 bg-background/60 hover:bg-primary/10 hover:border-primary/40 dark:bg-input/20"
            >
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
