import { GitBranch } from "lucide-react";
import React from "react";
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

export default function Timeline(props: TimelineProps) {
  const { items } = props;

  return (
    <div className="flex items-center gap-5">
      <div className="w-[2px] bg-primary self-stretch ml-3 hidden sm:block"></div>
      <div className="flex flex-col gap-12 w-full">
        {items?.map((item, index) => (
          <div key={index} className="flex gap-5 w-full">
            <div className="hidden sm:block">
              <GitBranch className="w-8 h-8 text-white p-2 bg-primary rounded-full -ml-9" />
            </div>
            <div className="w-full">
              <Accordion
                className="bg-accent/40 px-4 rounded-lg w-full hover:bg-accent/30"
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
          </div>
        ))}
      </div>
    </div>
  );
}
