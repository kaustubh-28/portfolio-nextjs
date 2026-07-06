"use client";

import { useState } from "react";
import { metaData } from "@/data/meta";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { Menu } from "lucide-react";
import { BootstrapLinkedin } from "../icons/LinkedIn";
import { SECTIONS } from "@/data/constants";

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
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-accent/20 px-6 md:px-12 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="font-display text-xl font-bold tracking-tight text-primary">
        KS<span className="text-accent">.</span>
      </div>

      {/* Desktop section links — visible xl and up */}
      <div className="hidden xl:flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="px-3 py-1.5 text-muted hover:text-accent transition-colors"
          >
            {section.index} // {section.label}
          </button>
        ))}
      </div>

      {/* Right side: nav toggle (below xl) + socials */}
      <div className="flex items-center gap-4">
        {/* Nav dropdown toggle — visible below xl */}
        <div className="relative xl:hidden">
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-surface text-muted hover:border-accent hover:text-primary transition-colors flex items-center gap-2"
          >
            <Menu className="w-3 h-3" />
            <span>NAV</span>
          </button>

          {navOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 border border-surface bg-background flex flex-col font-mono text-[10px] uppercase tracking-widest shadow-lg">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="px-4 py-3 text-left text-muted hover:text-accent hover:bg-surface/40 transition-colors border-b border-surface last:border-b-0"
                >
                  {section.index} // {section.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-6 text-muted">
          <a
            href={metaData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <SiGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={metaData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <BootstrapLinkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={`mailto:${metaData.email}`}
            className="hover:text-accent transition-colors"
          >
            <SiGmail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
