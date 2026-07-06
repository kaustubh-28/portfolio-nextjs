"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Keyboard, RefreshCw, AlertTriangle } from "lucide-react";
import { TYPING_PROMPTS } from "@/data/typingPrompts";
import {
  STORAGE_KEY,
  F1_LIGHTS_COUNT,
  F1_LIGHT_INTERVAL_MS,
  F1_MIN_DELAY_MS,
  F1_RANDOM_DELAY_RANGE_MS,
  REACTION_THRESHOLDS,
  MS_IN_MINUTE,
  AVG_WORD_LENGTH,
  TYPING_INPUT_FOCUS_DELAY_MS,
  SECTIONS,
} from "@/data/constants";

type ActiveTab = "LIGHTS" | "TYPING";
type LightsState =
  | "IDLE"
  | "COUNTDOWN"
  | "WAIT"
  | "GO"
  | "RESULT"
  | "JUMPSTART";



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

  const handleTabChange = (tab: ActiveTab) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setLightsState("IDLE");
    setLitCount(0);
    setLightsAreOut(false);
    setReactionTime(null);

    setActiveTab(tab);

    if (tab === "TYPING") {
      resetTypingTest();
    }
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
      if (currentLit === F1_LIGHTS_COUNT) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLightsState("WAIT");

        const randomDelay = Math.random() * F1_RANDOM_DELAY_RANGE_MS + F1_MIN_DELAY_MS;
        timerRef.current = setTimeout(() => {
          setLightsAreOut(true);
          setLightsState("GO");
          startTimeRef.current = performance.now();
        }, randomDelay);
      }
    }, F1_LIGHT_INTERVAL_MS);
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
    if (ms < REACTION_THRESHOLDS.ELITE) return "ELITE";
    if (ms < REACTION_THRESHOLDS.GOOD) return "GOOD";
    if (ms < REACTION_THRESHOLDS.AVERAGE) return "AVERAGE";
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

    setTypedText(normalizedValue);

    if (normalizedValue === currentPrompt && typingStartTime) {
      const durationInMinutes = (performance.now() - typingStartTime) / MS_IN_MINUTE;
      const wordCount = currentPrompt.length / AVG_WORD_LENGTH;
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
    setTimeout(() => typingInputRef.current?.focus(), TYPING_INPUT_FOCUS_DELAY_MS);
  };

  return (
    <section
      id={SECTIONS[2].id}
      className="border-t border-surface py-20 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <div className="space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block">
            {SECTIONS[2].index} // {SECTIONS[2].label}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
            {SECTIONS[2].title}
          </h2>
        </div>

        <div className="flex gap-2 font-mono text-xs border-b border-surface pb-4">
          <button
            onClick={() => handleTabChange("LIGHTS")}
            className={`px-4 py-2 flex items-center gap-2 border transition-all ${
              activeTab === "LIGHTS"
                ? "bg-accent border-accent text-white"
                : "bg-surface border-surface text-muted hover:text-primary"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>[01] // REFLEX_TEST</span>
          </button>
          <button
            onClick={() => handleTabChange("TYPING")}
            className={`px-4 py-2 flex items-center gap-2 border transition-all ${
              activeTab === "TYPING"
                ? "bg-accent border-accent text-white"
                : "bg-surface border-surface text-muted hover:text-primary"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>[02] // TYPING_TEST</span>
          </button>
        </div>

        <div className="border border-surface bg-surface/70 p-6 min-h-[320px] flex flex-col justify-between">
          {/* --- TERMINAL SUB-SCREEN: F1 LIGHTS --- */}
          {activeTab === "LIGHTS" && (
            <div className="flex flex-col items-center justify-center space-y-8 py-4 my-auto w-full">
              <div className="grid grid-cols-5 gap-3 bg-background border border-surface p-4 max-w-md w-full rounded-md justify-items-center">
                {[...Array(5)].map((_, i) => {
                  const isLit = i < litCount && !lightsAreOut;
                  return (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-surface border border-surface/50 flex flex-col justify-between p-1.5 overflow-hidden"
                    >
                      <div
                        className={`w-full h-[42%] rounded-full transition-all duration-75 ${
                          isLit
                            ? "bg-accent shadow-[0_0_14px_var(--color-accent)]"
                            : "bg-background"
                        }`}
                      />
                      <div
                        className={`w-full h-[42%] rounded-full transition-all duration-75 ${
                          isLit
                            ? "bg-accent shadow-[0_0_14px_var(--color-accent)]"
                            : "bg-background"
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
                    className="w-full font-mono text-xs uppercase tracking-wider bg-surface border border-surface text-primary py-3 hover:border-accent hover:bg-accent/10 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={triggerReactionClick}
                    className={`w-full font-mono text-xs uppercase tracking-widest text-white py-6 select-none ${
                      lightsState === "GO"
                        ? "bg-emerald-700 animate-pulse cursor-pointer"
                        : "bg-accent/80 cursor-pointer"
                    }`}
                  >
                    {lightsState === "GO"
                      ? "EXTINGUISH // TRIGGER NOW"
                      : "HOLD RUNTIME CONFIGURATION"}
                  </button>
                )}

                <div className="font-mono text-xs h-6 flex items-center justify-center">
                  {lightsState === "COUNTDOWN" && (
                    <span className="text-muted animate-pulse">
                      SYSTEM_STAGE // PREPARING_LIGHTS...
                    </span>
                  )}
                  {lightsState === "WAIT" && (
                    <span className="text-accent animate-pulse">
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
                    <span className="text-primary">
                      DIAGNOSTIC //{" "}
                      <span className="text-accent font-bold font-display text-sm">
                        {reactionTime}ms
                      </span>{" "}
                      DELTA // {reactionRating(reactionTime)}
                    </span>
                  )}
                </div>

                {record.reactionBest !== null && (
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
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
              <div className="bg-background border border-surface p-4 font-mono text-xs leading-relaxed select-none tracking-wide text-primary">
                <span className="text-accent block text-[10px] mb-1 uppercase tracking-widest">
                  Target String Feed:
                </span>
                <div className="break-words">
                  {currentPrompt.split("").map((char, index) => {
                    let colorClass = "text-muted/40"; // default untyped

                    if (index < typedText.length) {
                      const typedChar = typedText[index];
                      if (typedChar === char) {
                        colorClass = "text-primary font-bold"; // correct
                      } else {
                        colorClass = "text-accent underline decoration-accent/80 decoration-2"; // incorrect
                      }
                    }

                    return (
                      <span key={index} className={colorClass}>
                        {char}
                      </span>
                    );
                  })}
                </div>
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
                  className="w-full bg-background border border-surface text-primary font-mono text-xs px-3 py-3 focus:outline-none focus:border-accent disabled:opacity-50 uppercase"
                />

                {/* Dedicated Diagnostic Status Message Line */}
                <div className="h-4 font-mono text-[10px] text-accent flex items-center gap-1 transition-all duration-150">
                  {typedText.length > 0 &&
                    wpm === null &&
                    !currentPrompt.startsWith(typedText) && (
                      <span className="flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" /> STATUS:
                        STREAM_MISMATCH // INVALID_CHARACTER_DETECTED
                      </span>
                    )}
                </div>
              </div>

              {/* Live Metric Evaluation Matrix */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs border-t border-surface pt-4">
                {/* Telemetry Metrics Area (Wraps safely if stats grow too long on mobile) */}
                <div className="text-muted flex flex-wrap items-center gap-x-4 gap-y-2">
                  {isTypingActive && (
                    <span className="text-emerald-500 animate-pulse whitespace-nowrap">
                      INGESTION_STREAM_ACTIVE...
                    </span>
                  )}
                  {wpm !== null && (
                    <span className="whitespace-nowrap">
                      COMPILATION_OUTPUT //{" "}
                      <span className="text-accent font-bold font-display text-sm">
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
                  className="text-muted hover:text-accent transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-surface/60 sm:border-none px-3 py-2 sm:p-0 bg-surface/30 sm:bg-transparent rounded select-none text-[11px] sm:text-xs"
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
