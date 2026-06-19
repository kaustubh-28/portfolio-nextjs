export interface ProjectSystem {
  id: string;
  tag: string;
  title: string;
  status: "IN_DEVELOPMENT" | "STAGING" | "PROTOTYPE" | "COMPLETED";
  statusColor: string;
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
    statusColor: "text-amber-500 border-amber-500/20 bg-amber-500/10",
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
    tag: "SONG_RELAY",
    title: "Send The Song",
    status: "IN_DEVELOPMENT",
    statusColor: "text-amber-500 border-amber-500/20 bg-amber-500/10",
    description:
      "An anonymous music dedication platform — search a track, attach a message, generate a shareable link. Built to handle viral write spikes where a single link can trigger thousands of simultaneous reads. Inspired by the emotional simplicity of sendthesong.xyz.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "MongoDB"],
    metrics: [
      "Write-heavy DB operations optimised for sudden traffic spikes",
      "Shareable slug generation with collision-resistant hashing",
      "Optimistic UI updates for zero-latency perceived response",
    ],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    id: "SYS_03",
    tag: "AI_SCREENER",
    title: "AI Resourcing Pipeline",
    status: "PROTOTYPE",
    statusColor: "text-purple-500 border-purple-500/20 bg-purple-500/10",
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
    statusColor: "text-amber-500 border-amber-500/20 bg-amber-500/10",
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
