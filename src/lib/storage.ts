import { useEffect, useState, useCallback } from "react";

const KEY = "giaoly-progress-v1";

export interface MistakeQuiz {
  id: string;
  groupId: string;
  question: string;
  chosen: number;
  correct: number;
  options: string[];
  explanation: string;
  timestamp: number;
}
export interface MistakeFB {
  id: string;
  sourceTitle: string;
  fullSentence: string;
  yourAnswer: string;
  correct: string;
  timestamp: number;
}

export interface Progress {
  lessonsRead: Record<string, boolean>;
  quizCompletedGroups: Record<string, { score: number; total: number; date: number }>;
  fillBlankCorrect: Record<string, boolean>;
  prayersRead: Record<string, boolean>;
  mistakesQuiz: MistakeQuiz[];
  mistakesFB: MistakeFB[];
}

const empty: Progress = {
  lessonsRead: {},
  quizCompletedGroups: {},
  fillBlankCorrect: {},
  prayersRead: {},
  mistakesQuiz: [],
  mistakesFB: [],
};

function load(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

const listeners = new Set<() => void>();
let state: Progress = load();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  listeners.forEach((l) => l());
}

export function useProgress() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  const markLessonRead = useCallback((id: string) => {
    state.lessonsRead[id] = true; persist();
  }, []);
  const markPrayerRead = useCallback((id: string) => {
    state.prayersRead[id] = true; persist();
  }, []);
  const recordQuiz = useCallback((groupId: string, score: number, total: number) => {
    state.quizCompletedGroups[groupId] = { score, total, date: Date.now() };
    persist();
  }, []);
  const addQuizMistake = useCallback((m: Omit<MistakeQuiz, "timestamp">) => {
    state.mistakesQuiz = [{ ...m, timestamp: Date.now() }, ...state.mistakesQuiz.filter((x) => x.id !== m.id)].slice(0, 100);
    persist();
  }, []);
  const removeQuizMistake = useCallback((id: string) => {
    state.mistakesQuiz = state.mistakesQuiz.filter((m) => m.id !== id); persist();
  }, []);
  const markFillCorrect = useCallback((id: string) => {
    state.fillBlankCorrect[id] = true;
    state.mistakesFB = state.mistakesFB.filter((m) => m.id !== id);
    persist();
  }, []);
  const addFillMistake = useCallback((m: Omit<MistakeFB, "timestamp">) => {
    state.mistakesFB = [{ ...m, timestamp: Date.now() }, ...state.mistakesFB.filter((x) => x.id !== m.id)].slice(0, 100);
    persist();
  }, []);
  const reset = useCallback(() => {
    state = { ...empty, lessonsRead: {}, quizCompletedGroups: {}, fillBlankCorrect: {}, prayersRead: {}, mistakesQuiz: [], mistakesFB: [] };
    persist();
  }, []);

  return {
    progress: state,
    markLessonRead,
    markPrayerRead,
    recordQuiz,
    addQuizMistake,
    removeQuizMistake,
    markFillCorrect,
    addFillMistake,
    reset,
  };
}

export function normalizeAnswer(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}