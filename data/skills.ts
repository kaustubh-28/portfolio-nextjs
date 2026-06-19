export interface Skill {
  name: string;
  telemetry: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Infrastructure & Cloud",
    skills: [
      {
        name: "AWS Lambda",
        telemetry:
          "Architected serverless claims adjudication pipeline handling 100K+ API hits/day. Zero cold-start tuning applied across all Lambda execution contexts.",
      },
      {
        name: "AWS S3",
        telemetry:
          "Audited and restructured bucket architecture across the account. Eliminated redundant data footprint, cutting storage costs from $100/day to $65/day.",
      },
      {
        name: "AWS CDK",
        telemetry:
          "Infrastructure defined entirely as code. Reproducible microservice deployment pipelines with no manual console intervention.",
      },
      {
        name: "Docker & ECS",
        telemetry:
          "Containerised full application stack. Orchestrated high-availability runtime on EC2 via ECS with rolling deployment strategies.",
      },
      {
        name: "SQS / SNS / SES",
        telemetry:
          "Decoupled heavy processing flows via async event-driven queues. SES/SNS handling transactional and broadcast notification pipelines.",
      },
      {
        name: "EC2",
        telemetry:
          "Provisioned and maintained compute instances for Dockerized workloads. Managed instance sizing and cost-performance tradeoffs directly with management.",
      },
    ],
  },
  {
    title: "Backend & System Tuning",
    skills: [
      {
        name: "Node.js",
        telemetry:
          "Primary runtime for all server-side development. Built strict type-safe REST microservices handling mission-critical insurance and fintech business modules.",
      },
      {
        name: "TypeScript",
        telemetry:
          "Enforced across all production codebases. Eliminated entire classes of runtime errors through strict mode and domain-level type contracts.",
      },
      {
        name: "REST API Design",
        telemetry:
          "Designed and maintained APIs serving 10K–100K daily hits. Versioning, error contracts, and response shaping handled to production standard.",
      },
      {
        name: "Microservices",
        telemetry:
          "Decomposed monolithic claim workflows into independently deployable services. Each service owns its data layer and deployment lifecycle.",
      },
      {
        name: "MongoDB",
        telemetry:
          "Eliminated application-level slowness by rewriting aggregation pipelines and re-indexing high-cardinality collections under production load.",
      },
      {
        name: "Next.js Backends",
        telemetry:
          "Built API routes for two Flutter mobile apps. Shipped from zero to 1,500+ downloads and 700 monthly active users.",
      },
      {
        name: "Jest / RTL",
        telemetry:
          "TDD enforced as a hard requirement across repositories. Unit, integration, and component tests written before implementation.",
      },
      {
        name: "CASA Security",
        telemetry:
          "Secured CASA certification for automated secure parsing of user Gmail PDFs. Required passing Google's App Defense Alliance audit.",
      },
    ],
  },
  {
    title: "Frontend Engineering",
    skills: [
      {
        name: "React",
        telemetry:
          "Built production UIs for high-volume insurance platforms. Accessible, responsive, design-system-compliant components throughout.",
      },
      {
        name: "Next.js",
        telemetry:
          "Full-stack framework of choice. Used for both SSR/SSG rendering strategies and backend API routes in production.",
      },
      {
        name: "Redux & Context",
        telemetry:
          "Architected state management to prevent unnecessary re-renders. Custom middleware and selector patterns used in complex claim UI flows.",
      },
      {
        name: "Tailwind CSS",
        telemetry:
          "Utility-first styling with custom design token system. Full @theme layer with semantic tokens — no hardcoded values in components.",
      },
      {
        name: "Framer Motion",
        telemetry:
          "Handles all animation across the stack. Declarative variants used for entrance, exit, and interaction states.",
      },
    ],
  },
  {
    title: "Workflow & Tooling",
    skills: [
      {
        name: "Git & CodeCommit",
        telemetry:
          "Version control across all projects. AWS CodeCommit used in enterprise environments with branch protection and PR review gates.",
      },
      {
        name: "CI/CD Pipelines",
        telemetry:
          "Automated build, test, and deploy pipelines. Zero manual deployment steps in production — all triggered via commit hooks.",
      },
      {
        name: "Agile / Scrum",
        telemetry:
          "Embedded in cross-functional sprint teams across DevOps, QA, and Product. Active participant in planning, review, and retrospective cycles.",
      },
      {
        name: "Code Review",
        telemetry:
          "Regular reviewer across backend and frontend PRs. Enforces consistency, performance patterns, and test coverage as review criteria.",
      },
    ],
  },
];
