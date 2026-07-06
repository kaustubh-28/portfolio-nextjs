// System & Local Storage Keys
export const STORAGE_KEY = "ks_diagnostics_v1";
export const TELEMETRY_FALLBACK_TEXT =
  "Select or hover over any technical asset node to inspect system metrics, architectural impact, and scale deployment values.";
export const SYSTEM_ROOT_NAME = "SYSTEM_ROOT";

// Shared Section Navigation Details
export interface SectionConfig {
  id: string;
  index: string;
  label: string;
  title: string;
}

export const SECTIONS: readonly SectionConfig[] = [
  { id: "profile", index: "01", label: "PROFILE", title: "Engineering Profile" },
  { id: "dossiers", index: "02", label: "PROJECTS", title: "Personal Projects" },
  { id: "benchmarks", index: "03", label: "BENCHMARKS", title: "Performance Metrics" },
  { id: "transmission", index: "04", label: "CONTACT ME", title: "Open Connection" },
] as const;

// F1 Reflex Test Benchmarks
export const F1_LIGHTS_COUNT = 5;
export const F1_LIGHT_INTERVAL_MS = 800;
export const F1_MIN_DELAY_MS = 1500;
export const F1_RANDOM_DELAY_RANGE_MS = 2000;

export const REACTION_THRESHOLDS = {
  ELITE: 150,
  GOOD: 220,
  AVERAGE: 300,
} as const;

// Typing Test Benchmarks
export const MS_IN_MINUTE = 60000;
export const AVG_WORD_LENGTH = 5;
export const TYPING_INPUT_FOCUS_DELAY_MS = 50;

// Timeouts and Intervals
export const EMAIL_COPY_FEEDBACK_DURATION_MS = 2000;
export const CLOCK_UPDATE_INTERVAL_MS = 1000;
