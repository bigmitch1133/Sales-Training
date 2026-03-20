// Server-side user progress store
// Uses in-memory Map — data persists within Lambda container lifetime
// TODO: Replace with Vercel KV (@vercel/kv) for persistence across deploys

export interface QuizAnswer {
  questionId: string;
  selected: unknown;
  correct: boolean;
  timestamp: string;
}

export interface UserProgress {
  email: string;
  completedModules: number[];
  quizScores: Record<number, number>;
  completedSections: Record<number, string[]>;
  quizAnswers: Record<number, QuizAnswer[]>; // moduleId -> answers
  lastActive: string;
}

// Persist across hot reloads in dev
const g = globalThis as unknown as { __userStore?: Map<string, UserProgress> };
if (!g.__userStore) g.__userStore = new Map();
const store = g.__userStore;

function defaultProgress(email: string): UserProgress {
  return {
    email: email.toLowerCase(),
    completedModules: [],
    quizScores: {},
    completedSections: {},
    quizAnswers: {},
    lastActive: new Date().toISOString(),
  };
}

export function getProgress(email: string): UserProgress {
  const key = email.toLowerCase();
  return store.get(key) ?? defaultProgress(key);
}

export function saveProgress(
  email: string,
  data: Partial<Omit<UserProgress, "email">>
): UserProgress {
  const key = email.toLowerCase();
  const existing = store.get(key) ?? defaultProgress(key);
  const updated: UserProgress = {
    ...existing,
    ...data,
    email: key,
    lastActive: new Date().toISOString(),
  };
  store.set(key, updated);
  return updated;
}

export function getAllProgress(): UserProgress[] {
  return Array.from(store.values());
}
