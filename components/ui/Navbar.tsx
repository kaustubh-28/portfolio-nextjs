"use client";

import { useState } from "react";
import { metaData } from "@/data/meta";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { Menu } from "lucide-react";
import { BootstrapLinkedin } from "../icons/LinkedIn";

const sections = [
  { id: "profile", label: "01 // PROFILE" },
  { id: "dossiers", label: "02 // PROJECTS" },
  { id: "benchmarks", label: "03 // BENCHMARKS" },
  { id: "transmission", label: "04 // CONTACT ME" },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-accent)]/20 px-6 md:px-12 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="font-display text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
        KS<span className="text-[var(--color-accent)]">.</span>
      </div>

      {/* Desktop section links — visible xl and up */}
      <div className="hidden xl:flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="px-3 py-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Right side: nav toggle (below xl) + socials */}
      <div className="flex items-center gap-4">
        {/* Nav dropdown toggle — visible below xl */}
        <div className="relative xl:hidden">
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2"
          >
            <Menu className="w-3 h-3" />
            <span>NAV</span>
          </button>

          {navOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 border border-[var(--color-surface)] bg-[var(--color-background)] flex flex-col font-mono text-[10px] uppercase tracking-widest shadow-lg">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="px-4 py-3 text-left text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)]/40 transition-colors border-b border-[var(--color-surface)] last:border-b-0"
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-6 text-[var(--color-text-muted)]">
          <a
            href={metaData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <SiGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={metaData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <BootstrapLinkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={`mailto:${metaData.email}`}
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <SiGmail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
