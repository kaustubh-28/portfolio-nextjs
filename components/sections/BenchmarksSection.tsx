"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Keyboard, RefreshCw, AlertTriangle } from "lucide-react";
import { TYPING_PROMPTS } from "@/data/typingPrompts";

type ActiveTab = "LIGHTS" | "TYPING";
type LightsState =
  | "IDLE"
  | "COUNTDOWN"
  | "WAIT"
  | "GO"
  | "RESULT"
  | "JUMPSTART";

const STORAGE_KEY = "ks_diagnostics_v1";

interface DiagnosticsRecord {
  reactionBest: number | null;
  reactionAttempts: number;
  wpmBest: number | null;
  wpmAttempts: number;
}

const loadRecord = (): DiagnosticsRecord => {
  if (typeof window === "undefined") {
    return {
      reactionBest: null,
      reactionAttempts: 0,
      wpmBest: null,
      wpmAttempts: 0,
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw
      ? (JSON.parse(raw) as DiagnosticsRecord)
      : {
          reactionBest: null,
          reactionAttempts: 0,
          wpmBest: null,
          wpmAttempts: 0,
        };
  } catch {
    return {
      reactionBest: null,
      reactionAttempts: 0,
      wpmBest: null,
      wpmAttempts: 0,
    };
  }
};

const saveRecord = (record: DiagnosticsRecord) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
};

export default function BenchmarksSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("LIGHTS");
  const [record, setRecord] = useState<DiagnosticsRecord>({
    reactionBest: null,
    reactionAttempts: 0,
    wpmBest: null,
    wpmAttempts: 0,
  });

  // F1 Lights States
  const [lightsState, setLightsState] = useState<LightsState>("IDLE");
  const [litCount, setLitCount] = useState(0);
  const [lightsAreOut, setLightsAreOut] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Typing Test States
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const typingInputRef = useRef<HTMLInputElement>(null);

  // Load records and establish initial random prompt
  useEffect(() => {
    setRecord(loadRecord());
    selectRandomPrompt();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const selectRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * TYPING_PROMPTS.length);
    setCurrentPrompt(TYPING_PROMPTS[randomIndex]);
  };

  // --- F1 LIGHTS CORE LOGIC ---
  const startLightsSequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setLightsState("COUNTDOWN");
    setLitCount(0);
    setLightsAreOut(false);
    setReactionTime(null);

    let currentLit = 0;
    intervalRef.current = setInterval(() => {
      currentLit++;
      setLitCount(currentLit);
      if (currentLit === 5) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLightsState("WAIT");

        const randomDelay = Math.random() * 2000 + 1500;
        timerRef.current = setTimeout(() => {
          setLightsAreOut(true);
          setLightsState("GO");
          startTimeRef.current = performance.now();
        }, randomDelay);
      }
    }, 800);
  };

  const triggerReactionClick = () => {
    if (lightsState === "COUNTDOWN" || lightsState === "WAIT") {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLightsState("JUMPSTART");
    } else if (lightsState === "GO") {
      const endTime = performance.now();
      const delta = Math.round(endTime - startTimeRef.current);
      setReactionTime(delta);
      setLightsState("RESULT");

      setRecord((prev) => {
        const next: DiagnosticsRecord = {
          ...prev,
          reactionBest:
            prev.reactionBest === null
              ? delta
              : Math.min(prev.reactionBest, delta),
          reactionAttempts: prev.reactionAttempts + 1,
        };
        saveRecord(next);
        return next;
      });
    }
  };

  const reactionRating = (ms: number) => {
    if (ms < 150) return "ELITE";
    if (ms < 220) return "GOOD";
    if (ms < 300) return "AVERAGE";
    return "SLOW";
  };

  // --- TYPING TEST CORE LOGIC ---
  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const normalizedValue = value.toUpperCase(); // Evaluates uppercase input safely behind the scenes

    if (!isTypingActive && value.length === 1) {
      setIsTypingActive(true);
      setTypingStartTime(performance.now());
    }

    setTypedText(value);

    if (normalizedValue === currentPrompt && typingStartTime) {
      const durationInMinutes = (performance.now() - typingStartTime) / 60000;
      const wordCount = currentPrompt.length / 5;
      const result = Math.round(wordCount / durationInMinutes);
      setWpm(result);
      setIsTypingActive(false);

      setRecord((prev) => {
        const next: DiagnosticsRecord = {
          ...prev,
          wpmBest:
            prev.wpmBest === null ? result : Math.max(prev.wpmBest, result),
          wpmAttempts: prev.wpmAttempts + 1,
        };
        saveRecord(next);
        return next;
      });
    }
  };

  const resetTypingTest = () => {
    setTypedText("");
    setIsTypingActive(false);
    setTypingStartTime(null);
    setWpm(null);
    selectRandomPrompt(); // Cycles to a completely fresh string target line
    setTimeout(() => typingInputRef.current?.focus(), 50);
  };

  return (
    <section
      id="benchmarks"
      className="border-t border-[var(--color-surface)] py-20 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <div className="space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block">
            03 // BENCHMARKS
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
            Performance Metrics
          </h2>
        </div>

        <div className="flex gap-2 font-mono text-xs border-b border-[var(--color-surface)] pb-4">
          <button
            onClick={() => setActiveTab("LIGHTS")}
            className={`px-4 py-2 flex items-center gap-2 border transition-all ${
              activeTab === "LIGHTS"
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                : "bg-[var(--color-surface)] border-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>[01] // REFLEX_TEST</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("TYPING");
              resetTypingTest();
            }}
            className={`px-4 py-2 flex items-center gap-2 border transition-all ${
              activeTab === "TYPING"
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                : "bg-[var(--color-surface)] border-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>[02] // TYPING_TEST</span>
          </button>
        </div>

        <div className="border border-[var(--color-surface)] bg-[var(--color-surface)]/70 p-6 min-h-[320px] flex flex-col justify-between">
          {/* --- TERMINAL SUB-SCREEN: F1 LIGHTS --- */}
          {activeTab === "LIGHTS" && (
            <div className="flex flex-col items-center justify-center space-y-8 py-4 my-auto w-full">
              <div className="grid grid-cols-5 gap-3 bg-[var(--color-background)] border border-[var(--color-surface)] p-4 max-w-md w-full rounded-md justify-items-center">
                {[...Array(5)].map((_, i) => {
                  const isLit = i < litCount && !lightsAreOut;
                  return (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface)]/50 flex flex-col justify-between p-1.5 overflow-hidden"
                    >
                      <div
                        className={`w-full h-[42%] rounded-full transition-all duration-75 ${
                          isLit
                            ? "bg-[var(--color-accent)] shadow-[0_0_14px_var(--color-accent)]"
                            : "bg-[var(--color-background)]"
                        }`}
                      />
                      <div
                        className={`w-full h-[42%] rounded-full transition-all duration-75 ${
                          isLit
                            ? "bg-[var(--color-accent)] shadow-[0_0_14px_var(--color-accent)]"
                            : "bg-[var(--color-background)]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="w-full max-w-md text-center space-y-4">
                {lightsState === "IDLE" ||
                lightsState === "RESULT" ||
                lightsState === "JUMPSTART" ? (
                  <button
                    onClick={startLightsSequence}
                    className="w-full font-mono text-xs uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-surface)] text-[var(--color-text-primary)] py-3 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={triggerReactionClick}
                    className={`w-full font-mono text-xs uppercase tracking-widest text-white py-6 select-none ${
                      lightsState === "GO"
                        ? "bg-emerald-700 animate-pulse cursor-pointer"
                        : "bg-[var(--color-accent)]/80 cursor-pointer"
                    }`}
                  >
                    {lightsState === "GO"
                      ? "EXTINGUISH // TRIGGER NOW"
                      : "HOLD RUNTIME CONFIGURATION"}
                  </button>
                )}

                <div className="font-mono text-xs h-6 flex items-center justify-center">
                  {lightsState === "COUNTDOWN" && (
                    <span className="text-[var(--color-text-muted)] animate-pulse">
                      SYSTEM_STAGE // PREPARING_LIGHTS...
                    </span>
                  )}
                  {lightsState === "WAIT" && (
                    <span className="text-[var(--color-accent)] animate-pulse">
                      DRIVERS_READY // WATCH_GANTRY_STATE
                    </span>
                  )}
                  {lightsState === "JUMPSTART" && (
                    <span className="text-amber-500 flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> FOUL //
                      FALSE_START_DETECTED
                    </span>
                  )}
                  {lightsState === "RESULT" && reactionTime !== null && (
                    <span className="text-[var(--color-text-primary)]">
                      DIAGNOSTIC //{" "}
                      <span className="text-[var(--color-accent)] font-bold font-display text-sm">
                        {reactionTime}ms
                      </span>{" "}
                      DELTA // {reactionRating(reactionTime)}
                    </span>
                  )}
                </div>

                {record.reactionBest !== null && (
                  <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                    BEST: {record.reactionBest}ms // {record.reactionAttempts}{" "}
                    ATTEMPT
                    {record.reactionAttempts !== 1 ? "S" : ""}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "TYPING" && (
            <div className="space-y-6 w-full max-w-2xl mx-auto py-2">
              <div className="bg-[var(--color-background)] border border-[var(--color-surface)] p-4 font-mono text-xs leading-relaxed select-none tracking-wide text-[var(--color-text-primary)]">
                <span className="text-[var(--color-accent)] block text-[10px] mb-1 uppercase tracking-widest">
                  Target String Feed:
                </span>
                {currentPrompt}
              </div>

              {/* Data Ingestion Terminal Node */}
              <div className="space-y-2">
                <input
                  ref={typingInputRef}
                  type="text"
                  value={typedText}
                  onChange={handleTypingChange}
                  disabled={wpm !== null}
                  placeholder="Position cursor here and begin typing validation array..."
                  className="w-full bg-[var(--color-background)] border border-[var(--color-surface)] text-[var(--color-text-primary)] font-mono text-xs px-3 py-3 focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-50 uppercase"
                />

                {/* Dedicated Diagnostic Status Message Line */}
                <div className="h-4 font-mono text-[10px] text-[var(--color-accent)] flex items-center gap-1 transition-all duration-150">
                  {typedText.length > 0 &&
                    wpm === null &&
                    !currentPrompt.startsWith(typedText.toUpperCase()) && (
                      <span className="flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> STATUS:
                        STREAM_MISMATCH // INVALID_CHARACTER_DETECTED
                      </span>
                    )}
                </div>
              </div>

              {/* Live Metric Evaluation Matrix */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs border-t border-[var(--color-surface)] pt-4">
                {/* Telemetry Metrics Area (Wraps safely if stats grow too long on mobile) */}
                <div className="text-[var(--color-text-muted)] flex flex-wrap items-center gap-x-4 gap-y-2">
                  {isTypingActive && (
                    <span className="text-emerald-500 animate-pulse whitespace-nowrap">
                      INGESTION_STREAM_ACTIVE...
                    </span>
                  )}
                  {wpm !== null && (
                    <span className="whitespace-nowrap">
                      COMPILATION_OUTPUT //{" "}
                      <span className="text-[var(--color-accent)] font-bold font-display text-sm">
                        {wpm} WPM
                      </span>
                    </span>
                  )}
                  {record.wpmBest !== null && (
                    <span className="text-[10px] uppercase tracking-widest opacity-70 whitespace-nowrap">
                      BEST: {record.wpmBest} WPM // {record.wpmAttempts}{" "}
                      ATTEMPTS
                    </span>
                  )}
                </div>

                {/* Reset Action Button (Pushes to the right on desktop, snaps safely below on mobile) */}
                <button
                  onClick={resetTypingTest}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-[var(--color-surface)]/60 sm:border-none px-3 py-2 sm:p-0 bg-[var(--color-surface)]/30 sm:bg-transparent rounded select-none text-[11px] sm:text-xs"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>RESET_BUFFER</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
