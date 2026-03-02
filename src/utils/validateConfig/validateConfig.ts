import type { Config, TimerConfig } from '@/features/settings/types';

const MIN_TIME = 5;
const MAX_TIME = 60;
const MIN_SESSIONS = 2;
const MAX_SESSIONS = 4;

export const DEFAULT_CONFIG: Config = {
  timer: {
    timing: { focus: 25, rest: 15, break: 5 },
    sessions: 4,
  },
  showTasks: false,
  showSettings: false,
  isSoundOn: true,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function validateTiming(raw: unknown): Config['timer']['timing'] | null {
  if (!isPlainObject(raw)) return null;
  const focus = raw.focus;
  const rest = raw.rest;
  const breakVal = raw.break;
  if (!isNumber(focus) || !isNumber(rest) || !isNumber(breakVal)) return null;
  return {
    focus: clampNumber(Math.floor(focus), MIN_TIME, MAX_TIME),
    rest: clampNumber(Math.floor(rest), MIN_TIME, MAX_TIME),
    break: clampNumber(Math.floor(breakVal), MIN_TIME, MAX_TIME),
  };
}

function validateTimerConfig(raw: unknown): TimerConfig | null {
  if (!isPlainObject(raw)) return null;
  const timing = validateTiming(raw.timing);
  const sessionsRaw = raw.sessions;
  if (timing === null || !isNumber(sessionsRaw)) return null;
  const sessions = clampNumber(Math.floor(sessionsRaw), MIN_SESSIONS, MAX_SESSIONS);
  return { timing, sessions };
}

/**
 * Validates and normalizes config from localStorage or other unknown source.
 * Returns valid Config or null if data is invalid. Numbers are clamped to allowed limits.
 */
export function validateConfig(raw: unknown): Config | null {
  if (!isPlainObject(raw)) return null;

  const timer = validateTimerConfig(raw.timer);
  if (timer === null) return null;

  const showTasks = isBoolean(raw.showTasks) ? raw.showTasks : DEFAULT_CONFIG.showTasks;
  const showSettings = isBoolean(raw.showSettings) ? raw.showSettings : DEFAULT_CONFIG.showSettings;
  const isSoundOn = isBoolean(raw.isSoundOn) ? raw.isSoundOn : DEFAULT_CONFIG.isSoundOn;

  return {
    timer,
    showTasks,
    showSettings,
    isSoundOn,
  };
}

/**
 * Reads config from localStorage, validates it and returns valid Config or DEFAULT_CONFIG.
 * Use for initial load so the app never runs with invalid config.
 */
export function getValidatedConfig(): Config {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const stored = window.localStorage.getItem('config');
    if (stored === null) return DEFAULT_CONFIG;
    const parsed = JSON.parse(stored) as unknown;
    return validateConfig(parsed) ?? DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}
