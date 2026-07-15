export interface ProjectSystem {
  id: string;
  tag: string;
  title: string;
  status: "IN_DEVELOPMENT" | "STAGING" | "PROTOTYPE" | "COMPLETED";
  description: string;
  stack: string[];
  metrics: string[];
  repoUrl: string;
  liveUrl: string;
}

export const projectSystems: ProjectSystem[] = [
  {
    id: "SYS_01",
    tag: "EXAM_PORTAL",
    title: "Online Examination Core",
    status: "IN_DEVELOPMENT",
    description:
      "A full-stack examination engine isolating role-based state hierarchies for students, proctors, and administrators. Engineered with transactional state safeguards to prevent data corruption during simultaneous, high-volume test submissions.",
    stack: ["React", "Node.js", "MongoDB", "Passport.js"],
    metrics: [
      "Role-Based Access Control (RBAC)",
      "Atomic test-state scheduling routines",
      "Isolated question bank encryption layers",
    ],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    id: "SYS_02",
    tag: "DIGITAL_SANCTUARY",
    title: "Echo.",
    status: "COMPLETED",
    description:
      "An anonymous platform for collecting and discovering wisdom, advice, and life lessons. Designed as a quiet alternative to engagement-driven social media, Echo emphasizes thoughtful reading, reflection, and meaningful contributions without accounts, feeds, or recommendation algorithms.",
    stack: ["Next.js", "Bootstrap", "Node.js", "Express", "MongoDB"],
    metrics: [
      "Built a production-ready REST API with JWT authentication, moderation workflow, and admin portal",
      "Anonymous visitor tracking using secure signed cookies to prevent duplicate interactions without user accounts",
      "Full-text search, daily reflections, random discovery, reporting, moderation, and configurable platform settings",
    ],
    repoUrl: "https://github.com/kaustubh-28/echo-frontend",
    liveUrl: "https://echo-kaustubh.vercel.app/",
  },
  {
    id: "SYS_03",
    tag: "AI_SCREENER",
    title: "AI Resourcing Pipeline",
    status: "PROTOTYPE",
    description:
      "An automated document intelligence asset that processes unstructured file streams to return instant alignment vectors, structured skill gaps, and token-optimized contextual analysis summaries.",
    stack: ["Next.js", "Node.js", "Claude API", "MongoDB"],
    metrics: [
      "Structured JSON schema parsing via LLMs",
      "PDF binary buffer ingestion stream",
      "Context-window payload cost optimization",
    ],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    id: "SYS_04",
    tag: "MSG_BROKER",
    title: "Anonymous Message Switch",
    status: "IN_DEVELOPMENT",
    description:
      "A high-concurrency storage-and-dispatch switchboard built to accept rapid, anonymous spatial payloads. Focuses strictly on high-write database operations and cache-layer lookups to handle sudden viral traffic spikes.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "MongoDB"],
    metrics: [
      "Write-heavy database execution loops",
      "Optimistic UI mutation updates",
      "Clean separation of visual presentation blocks",
    ],
    repoUrl: "#",
    liveUrl: "#",
  },
];
