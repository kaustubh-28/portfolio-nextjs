"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, Skill } from "@/data/skills";
import { profileData } from "@/data/profile";
import { TELEMETRY_FALLBACK_TEXT, SYSTEM_ROOT_NAME, SECTIONS } from "@/data/constants";

export default function AboutSection() {
  // Default fallback terminal view when nothing is hovered
  const [activeTelemetry, setActiveTelemetry] = useState<string>(TELEMETRY_FALLBACK_TEXT);
  const [activeSkillName, setActiveSkillName] = useState<string>(SYSTEM_ROOT_NAME);
  const [lockedSkillName, setLockedSkillName] = useState<string | null>(null);

  const handleHover = (skill: Skill | null) => {
    if (lockedSkillName) return;
    if (skill) {
      setActiveTelemetry(skill.telemetry);
      setActiveSkillName(skill.name.toUpperCase().replace(/[^A-Z0-9]/g, "_"));
    } else {
      setActiveTelemetry(TELEMETRY_FALLBACK_TEXT);
      setActiveSkillName(SYSTEM_ROOT_NAME);
    }
  };

  const handleSelect = (skill: Skill) => {
    if (lockedSkillName === skill.name) {
      setLockedSkillName(null);
      // Reset to current hover state values
      setActiveTelemetry(skill.telemetry);
      setActiveSkillName(skill.name.toUpperCase().replace(/[^A-Z0-9]/g, "_"));
    } else {
      setLockedSkillName(skill.name);
      setActiveTelemetry(skill.telemetry);
      setActiveSkillName(skill.name.toUpperCase().replace(/[^A-Z0-9]/g, "_"));
    }
  };

  return (
    <section
      id={SECTIONS[0].id}
      className="border-t border-surface py-20 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block">
            {profileData.sectionLabel}
          </span>
          <h2 className="font-display text-3xl md:text-[2.1rem] font-bold text-primary tracking-tight leading-[1.05]">
            {profileData.heading}
          </h2>
          <div className="font-body text-sm md:text-[15px] text-muted space-y-4 leading-relaxed">
            <p>{profileData.paragraphs[0]}</p>
            <p>{profileData.paragraphs[1]}</p>
            <p>{profileData.paragraphs[2]}</p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-6">
            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-2">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = lockedSkillName === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => handleSelect(skill)}
                        onMouseEnter={() => handleHover(skill)}
                        onMouseLeave={() => handleHover(null)}
                        onFocus={() => handleHover(skill)}
                        onBlur={() => handleHover(null)}
                        aria-pressed={isSelected}
                        className={`font-mono text-xs px-3 py-2 border rounded transition-all duration-150 focus:outline-none focus:border-accent ${
                          isSelected
                            ? "bg-accent/20 border-accent text-primary"
                            : "border-surface bg-surface/10 text-muted hover:bg-accent/10 hover:border-accent hover:text-primary"
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            role="status"
            aria-live="polite"
            className="w-full bg-surface border border-surface rounded p-4 font-mono text-xs shadow-inner"
          >
            <div className="flex items-center justify-between border-b border-surface pb-2 mb-3 text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                TELEMETRY_MONITOR // {activeSkillName}
              </span>
              <span>v4.0.0</span>
            </div>
            <div className="min-h-[70px] text-primary flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTelemetry}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.15 }}
                  className="leading-relaxed"
                >
                  {activeTelemetry}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
