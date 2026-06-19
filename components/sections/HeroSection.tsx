"use client";

import { motion } from "framer-motion";
import { metaData } from "@/data/meta";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-73px)] flex flex-col justify-center px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block">
          {metaData.role}
        </span>

        <h1 className="font-display text-5xl md:text-[4rem] font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1]">
          {metaData.name}
          <span className="block text-balance text-[var(--color-text-muted)] mt-2 font-body text-3xl md:text-5xl font-medium tracking-normal">
            {metaData.tagline}
          </span>
        </h1>

        <p className="font-body text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          {metaData.subLine}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href={`mailto:${metaData.email}`}
            className="px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200 active:translate-y-0.5 bg-[var(--color-accent)] text-[var(--color-accent-text)] hover:bg-[var(--color-accent-hover)]"
          >
            Get In Touch
          </a>
          <a
            href={metaData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200 active:translate-y-0.5 bg-transparent text-[var(--color-text-primary)] border border-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
          >
            View LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
