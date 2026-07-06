"use client";

import { metaData } from "@/data/meta";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background/90 backdrop-blur-md border-t border-accent/20 px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
        <div>
          KS<span className="text-accent">.</span>{" "}
          <span className="text-muted">
            // built with ❤️ using Next.js
          </span>
        </div>
        <span className="hidden sm:inline text-muted/40">
          |
        </span>
        <span className="text-muted/60">BUILD v1.0.0</span>
      </div>

      <div className="flex items-center gap-4">
        <span>
          © {year} {metaData.name}
        </span>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-2.5 py-1 border border-surface text-muted hover:border-accent hover:text-primary transition-colors uppercase tracking-widest"
        >
          <span>↑</span>
          <span>BACK_TO_TOP</span>
        </button>
      </div>
    </footer>
  );
}
