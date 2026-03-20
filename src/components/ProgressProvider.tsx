"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/components/AuthProvider";

export interface QuizAnswerRecord {
  questionId: string;
  selected: unknown;
  correct: boolean;
  timestamp: string;
}

interface ProgressContextType {
  completedModules: number[];
  quizScores: Record<number, number>;
  completedSections: Record<number, string[]>;
  quizAnswers: Record<number, QuizAnswerRecord[]>;
  markSectionComplete: (moduleId: number, sectionId: string) => void;
  saveQuizScore: (
    moduleId: number,
    score: number,
    answers?: QuizAnswerRecord[]
  ) => void;
  isModuleUnlocked: (moduleId: number) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export default function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});
  const [completedSections, setCompletedSections] = useState<
    Record<number, string[]>
  >({});
  const [quizAnswers, setQuizAnswers] = useState<
    Record<number, QuizAnswerRecord[]>
  >({});
  const [loaded, setLoaded] = useState(false);
  const syncTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const { user } = useAuth();

  // Load from server on mount
  useEffect(() => {
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setCompletedModules(data.completedModules || []);
          setQuizScores(data.quizScores || {});
          setCompletedSections(data.completedSections || {});
          setQuizAnswers(data.quizAnswers || {});
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  // Debounced sync to server
  const syncToServer = useCallback(
    (data: Record<string, unknown>) => {
      if (syncTimeout.current) clearTimeout(syncTimeout.current);
      syncTimeout.current = setTimeout(() => {
        fetch("/api/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      }, 300);
    },
    []
  );

  const markSectionComplete = (moduleId: number, sectionId: string) => {
    setCompletedSections((prev) => {
      const sections = prev[moduleId] || [];
      if (sections.includes(sectionId)) return prev;
      const updated = { ...prev, [moduleId]: [...sections, sectionId] };
      syncToServer({ completedSections: updated });
      return updated;
    });
  };

  const saveQuizScore = (
    moduleId: number,
    score: number,
    answers?: QuizAnswerRecord[]
  ) => {
    setQuizScores((prev) => {
      const updated = { ...prev, [moduleId]: score };
      const newCompleted =
        score >= 80
          ? Array.from(
              new Set([...completedModules, moduleId])
            )
          : completedModules;

      if (score >= 80) setCompletedModules(newCompleted);

      const newAnswers = answers
        ? { ...quizAnswers, [moduleId]: answers }
        : quizAnswers;
      if (answers) setQuizAnswers(newAnswers);

      syncToServer({
        quizScores: updated,
        completedModules: newCompleted,
        quizAnswers: newAnswers,
      });

      return updated;
    });
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (user?.isAdmin) return true;
    if (moduleId === 1) return true;
    return completedModules.includes(moduleId - 1);
  };

  const resetProgress = () => {
    setCompletedModules([]);
    setQuizScores({});
    setCompletedSections({});
    setQuizAnswers({});
    syncToServer({
      completedModules: [],
      quizScores: {},
      completedSections: {},
      quizAnswers: {},
    });
  };

  if (!loaded) return null;

  return (
    <ProgressContext.Provider
      value={{
        completedModules,
        quizScores,
        completedSections,
        quizAnswers,
        markSectionComplete,
        saveQuizScore,
        isModuleUnlocked,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
