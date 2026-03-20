"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ProgressContextType {
  completedModules: number[];
  quizScores: Record<number, number>;
  completedSections: Record<number, string[]>;
  markSectionComplete: (moduleId: number, sectionId: string) => void;
  saveQuizScore: (moduleId: number, score: number) => void;
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ng-training-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedModules(data.completedModules || []);
      setQuizScores(data.quizScores || {});
      setCompletedSections(data.completedSections || {});
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "ng-training-progress",
      JSON.stringify({ completedModules, quizScores, completedSections })
    );
  }, [completedModules, quizScores, completedSections, loaded]);

  const markSectionComplete = (moduleId: number, sectionId: string) => {
    setCompletedSections((prev) => {
      const sections = prev[moduleId] || [];
      if (sections.includes(sectionId)) return prev;
      return { ...prev, [moduleId]: [...sections, sectionId] };
    });
  };

  const saveQuizScore = (moduleId: number, score: number) => {
    setQuizScores((prev) => ({ ...prev, [moduleId]: score }));
    if (score >= 80) {
      setCompletedModules((prev) =>
        prev.includes(moduleId) ? prev : [...prev, moduleId]
      );
    }
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    return completedModules.includes(moduleId - 1);
  };

  const resetProgress = () => {
    setCompletedModules([]);
    setQuizScores({});
    setCompletedSections({});
    localStorage.removeItem("ng-training-progress");
  };

  if (!loaded) return null;

  return (
    <ProgressContext.Provider
      value={{
        completedModules,
        quizScores,
        completedSections,
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
