"use client";

import { useState } from "react";
import { projectSystems, ProjectSystem } from "@/data/projects";
import {
  SiGithub,
} from "@icons-pack/react-simple-icons";
import { motion, AnimatePresence } from "framer-motion";

const statusConfig: Record<
  ProjectSystem["status"],
  { label: string; classes: string }
> = {
  COMPLETED: {
    label: "COMPLETED",
    classes: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
  STAGING: {
    label: "STAGING",
    classes: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  PROTOTYPE: {
    label: "PROTOTYPE",
    classes: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  },
  IN_DEVELOPMENT: {
    label: "IN_DEVELOPMENT",
    classes: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
};

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string>(projectSystems[0].id);
  const [mobileTab, setMobileTab] = useState<"FILES" | "DETAIL">("FILES");

  const activeProject = projectSystems.find((p) => p.id === activeId)!;

  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobileTab("DETAIL");
  };

  return (
    <section
      id="dossiers"
      className="border-t border-[var(--color-surface)] py-20 px-6 md:px-12 max-w-5xl mx-auto"
    >
      {/* Section header */}
      <div className="space-y-1 mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block">
          02 // DOSSIERS
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Personal Projects
        </h2>
      </div>

      {/* Mobile tab toggle */}
      <div className="flex lg:hidden mb-4 font-mono text-xs border border-[var(--color-surface)] w-fit">
        {(["FILES", "DETAIL"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`px-5 py-2 tracking-widest uppercase transition-colors duration-150 ${
              mobileTab === tab
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main console grid */}
      <div className="flex flex-col lg:flex-row border border-[var(--color-surface)] bg-[var(--color-surface)]/70">
        {/* Left — stream selector */}
        <div
          className={`${
            mobileTab === "FILES" ? "flex" : "hidden"
          } lg:flex flex-col w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--color-surface)]`}
        >
          {/* Panel header */}
          <div className="px-4 py-3 border-b border-[var(--color-surface)] bg-[var(--color-surface)]/60">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
              SELECT_STREAM_FEED:
            </span>
          </div>

          {/* Stream buttons */}
          <div className="flex flex-col p-3 gap-2">
            {projectSystems.map((project) => {
              const isActive = project.id === activeId;
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project.id)}
                  className={`group font-mono text-xs p-3 text-left border transition-all duration-150 flex items-start justify-between gap-2 ${
                    isActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-text-primary)]"
                      : "border-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className={`text-[10px] uppercase tracking-wider truncate ${
                        isActive
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]/60"
                      }`}
                    >
                      {project.id} // {project.tag}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted)] truncate font-body">
                      {project.title}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] shrink-0 mt-0.5 tracking-widest ${
                      isActive
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)]/40"
                    }`}
                  >
                    {isActive ? "[ACTIVE]" : "[READY]"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom status bar */}
          <div className="mt-auto px-4 py-3 border-t border-[var(--color-surface)]">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]/50">
              {projectSystems.length} SYSTEMS INDEXED
            </span>
          </div>
        </div>

        {/* Right — telemetry detail panel */}
        <div
          className={`${
            mobileTab === "DETAIL" ? "flex" : "hidden"
          } lg:flex flex-col flex-1 min-w-0`}
        >
          {/* Panel header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-surface)] bg-[var(--color-surface)]/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                {activeProject.id} // {activeProject.tag}
              </span>
            </div>
            <span
              className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border ${
                statusConfig[activeProject.status].classes
              }`}
            >
              {statusConfig[activeProject.status].label}
            </span>
          </div>

          {/* Animated content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-6 p-6"
            >
              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                {activeProject.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                {activeProject.description}
              </p>

              {/* Metrics block */}
              <div className="bg-[var(--color-background)] border border-[var(--color-surface)] p-4 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] block">
                  SYSTEM_IMPLEMENTATION_METRICS:
                </span>
                <ul className="space-y-2">
                  {activeProject.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="flex items-start gap-2 font-mono text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="text-[var(--color-accent)] shrink-0">
                        »
                      </span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack + links row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--color-surface)] pt-4">
                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2.5 py-1 border border-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)] transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-4 font-mono text-xs shrink-0">
                  <a
                    href={activeProject.repoUrl}
                    className="flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <SiGithub className="w-3.5 h-3.5" />
                    <span>SRC_CODE</span>
                  </a>
                  <a
                    href={activeProject.liveUrl}
                    className="flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <span>LIVE_DEMO</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
