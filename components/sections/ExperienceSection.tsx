"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section className="border-t border-surface py-20 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block">
            02 // PROFESSIONAL_LOG
          </span>
          <h2 className="font-display text-3xl md:text-[2.1rem] font-bold text-primary tracking-tight leading-[1.05]">
            Employment & System History
          </h2>
        </div>

        {/* Dossier Grid Loop */}
        <div className="space-y-8">
          {experienceData.map((entry) => (
            <div
              key={entry.id}
              className="border border-surface bg-surface/20 p-6 md:p-8 space-y-6 relative overflow-hidden"
            >
              {/* Top Row: Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <span className="font-mono text-xs text-accent block mb-1">
                    SYS_REF // {entry.id}
                  </span>
                  <h3 className="font-display text-xl font-bold text-primary">
                    {entry.role}{" "}
                    <span className="text-muted font-light">@</span>{" "}
                    {entry.company}
                  </h3>
                </div>
                <div className="text-left sm:text-right font-mono text-xs space-y-1">
                  <div className="text-primary tracking-wider">
                    {entry.period}
                  </div>
                  <div className="flex items-center sm:justify-end gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${entry.status === "ACTIVE" ? "bg-accent animate-pulse" : "bg-muted"}`}
                    />
                    <span className="text-muted text-[10px] tracking-widest">
                      {entry.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Row: Quick System Telemetry Tags */}
              <div className="flex flex-wrap gap-2">
                {entry.metrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] bg-accent/10 border border-accent/30 text-primary px-3 py-1 rounded-full"
                  >
                    Δ {metric}
                  </span>
                ))}
              </div>

              {/* Bottom Row: Technical Log Highlights */}
              <ul className="space-y-3 font-body text-sm text-muted list-none pl-0">
                {entry.highlights.map((highlight, idx) => (
                  <li key={idx} className="relative pl-5 leading-relaxed">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 border border-accent rotate-45 block" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
