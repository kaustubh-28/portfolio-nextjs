"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { BootstrapLinkedin } from "../icons/LinkedIn";
import { metaData } from "@/data/meta";

interface LogLine {
  id: string;
  content: React.ReactNode;
  delay: number;
}

export default function TransmissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setIstTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(metaData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines: LogLine[] = [
    {
      id: "status",
      delay: 0,
      content: (
        <>
          <span className="text-[var(--color-text-muted)]">
            &gt; SESSION_STATUS:
          </span>{" "}
          <span className="text-emerald-400">ACTIVE</span>
        </>
      ),
    },
    {
      id: "location",
      delay: 0.3,
      content: (
        <>
          <span className="text-[var(--color-text-muted)]">&gt; LOCATION:</span>{" "}
          <span className="text-[var(--color-text-primary)]">
            New Delhi, IN [GMT+5:30]
          </span>
          {istTime && (
            <span className="text-emerald-400 ml-2">// {istTime} IST</span>
          )}
        </>
      ),
    },
    {
      id: "availability",
      delay: 0.6,
      content: (
        <>
          <span className="text-[var(--color-text-muted)]">
            &gt; AVAILABILITY:
          </span>{" "}
          <span className="text-[var(--color-accent)]">
            OPEN_TO_OPPORTUNITIES
          </span>
        </>
      ),
    },
    {
      id: "spacer",
      delay: 0.9,
      content: <span className="block h-2" />,
    },
    {
      id: "connect-header",
      delay: 1.0,
      content: (
        <span className="text-[var(--color-text-muted)]">
          &gt; ESTABLISH_CONNECTION:
        </span>
      ),
    },
    {
      id: "email",
      delay: 1.3,
      content: (
        <div className="pl-4 space-y-1">
          <span className="text-[var(--color-text-muted)]">[EMAIL] →</span>
          <div className="flex flex-wrap items-center gap-2 pl-4">
            <span className="text-[var(--color-text-primary)] break-all">
              {metaData.email}
            </span>
            <button
              onClick={handleCopy}
              className="font-mono text-[10px] px-2 py-0.5 border border-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest shrink-0"
            >
              {copied ? "COPIED" : "COPY"}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "linkedin",
      delay: 1.6,
      content: (
        <a
          href={metaData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block pl-4 space-y-1 group"
        >
          <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
            [LINKEDIN] →
          </span>
          <div className="flex items-center gap-2 pl-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            <BootstrapLinkedin className="w-3.5 h-3.5 shrink-0" />
            <span className="break-all">/in/kaustubhsrivastava1624</span>
            <span className="shrink-0">↗</span>
          </div>
        </a>
      ),
    },
    {
      id: "github",
      delay: 1.9,
      content: (
        <a
          href={metaData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block pl-4 space-y-1 group"
        >
          <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
            [GITHUB] →
          </span>
          <div className="flex items-center gap-2 pl-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            <SiGithub className="w-3.5 h-3.5 shrink-0" />
            <span className="break-all">/kaustubh-28</span>
            <span className="shrink-0">↗</span>
          </div>
        </a>
      ),
    },
    {
      id: "spacer2",
      delay: 2.2,
      content: <span className="block h-2" />,
    },
    {
      id: "end",
      delay: 2.4,
      content: (
        <span className="text-[var(--color-text-muted)]">
          &gt; END_TRANSMISSION
        </span>
      ),
    },
  ];

  return (
    <section
      id="transmission"
      ref={ref}
      className="border-t border-[var(--color-surface)] py-20 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <div className="space-y-1 mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block">
          04 // CONTACT ME
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
          Open Connection
        </h2>
      </div>

      <div className="border border-[var(--color-surface)] bg-[var(--color-surface)]/70 p-6 md:p-8 font-mono text-xs md:text-sm">
        <AnimatePresence mode="wait">
          {isInView && (
            <motion.div key="log" className="flex flex-col gap-2.5">
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: line.delay }}
                >
                  {line.content}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 2.7 }}
                className="flex items-center gap-1 pt-1"
              >
                <span className="text-[var(--color-accent)]">&gt;</span>
                <span className="w-2 h-4 bg-[var(--color-accent)] animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
