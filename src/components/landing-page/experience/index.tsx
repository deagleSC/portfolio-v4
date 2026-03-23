import { CheckCircle } from "lucide-react";
import info from "../../../data/info.json";
import Timeline from "./timeline";

export default function Experience() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Experience</h2>
      <Timeline
        items={info.experience?.map((exp) => ({
          ...exp,
          content: (
            <div>
              <ul className="mt-2 list-disc">
                {exp.points?.map((point, index) => (
                  <li key={index} className="my-4 flex items-start gap-2">
                    <div>
                      <CheckCircle className="w-4 h-4 mt-1 text-primary" />
                    </div>
                    <div>{point}</div>
                  </li>
                ))}
              </ul>
            </div>
          ),
        }))}
      />
    </div>
  );
}
