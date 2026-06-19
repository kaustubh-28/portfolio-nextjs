export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  status: "ACTIVE" | "COMPLETE";
  metrics: string[];
  highlights: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    id: "01",
    role: "Software Engineer",
    company: "Tata AIG",
    period: "2023.08 // PRESENT",
    status: "ACTIVE",
    metrics: ["100K+ daily API hits", "35% S3 cost reduction"],
    highlights: [
      "Owned end-to-end delivery of a serverless claims adjudication system (100K+ API hits/day) and a claim tracking platform (10K+ API hits/day) utilizing AWS Lambda, SQS, SNS, and CDK.",
      "Optimized production database slowness by profiling and rewriting complex MongoDB aggregation queries and tuning indexes.",
      "Executed infrastructure cost auditing alongside upper management, slashing S3 storage burn from $100/day to $65/day by eliminating redundant data footprints.",
      "Engineered responsive, state-managed user interfaces in React using Redux and the Context API, adhering to core accessibility standards.",
    ],
  },
  {
    id: "02",
    role: "Backend Engineering Intern",
    company: "Investnama",
    period: "2022.11 // 2023.04",
    status: "COMPLETE",
    metrics: ["1,500+ DLs", "700+ MAU"],
    highlights: [
      "Collaborated directly with the founding team to architect and launch Next.js backends supporting two distinct Flutter mobile applications.",
      "Successfully processed and cleared stringent CASA security certification protocols for secure automation pipelines.",
      "Engineered automated background workers to parse targeted PDF attachment streams via secure integration with user Gmail APIs.",
    ],
  },
];
