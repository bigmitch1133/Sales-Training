"use client";

import { modules } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";

const moduleIcons = ["📊", "🎯", "🏛️", "📞", "📋", "🔍", "🏆"];

export default function Home() {
  const { completedModules, quizScores, isModuleUnlocked, resetProgress } =
    useProgress();

  const allComplete =
    completedModules.length === modules.length &&
    modules.every((m) => (quizScores[m.id] || 0) >= 80);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          NationGraph SDR Training
        </h1>
        <p className="text-blue-100 text-lg">
          Interactive onboarding program — 7 modules, ~5 hours total
        </p>
        <div className="mt-6 bg-white/10 rounded-xl p-4">
          <ProgressBar />
        </div>
      </div>

      {allComplete && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-green-800">
            Training Complete!
          </h2>
          <p className="text-green-700 mt-1">
            You&apos;ve completed all 7 modules. You&apos;re ready to hit the
            ground running!
          </p>
        </div>
      )}

      {/* Module Grid */}
      <div className="grid gap-4">
        {modules.map((mod) => {
          const unlocked = isModuleUnlocked(mod.id);
          const score = quizScores[mod.id];
          const passed = score !== undefined && score >= 80;
          const completed = completedModules.includes(mod.id);

          return (
            <Link
              key={mod.id}
              href={unlocked ? `/module/${mod.id}` : "#"}
              className={`block rounded-xl border-2 p-6 transition-all ${
                !unlocked
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                  : completed
                  ? "border-green-200 bg-green-50 hover:border-green-300 hover:shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={(e) => !unlocked && e.preventDefault()}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`text-3xl flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                    completed
                      ? "bg-green-100"
                      : unlocked
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  {!unlocked ? "🔒" : moduleIcons[mod.id - 1]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Module {mod.id}
                    </span>
                    <span className="text-xs text-gray-400">
                      {mod.estimatedTime}
                    </span>
                    {passed && (
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        Passed — {score}%
                      </span>
                    )}
                    {score !== undefined && !passed && (
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-medium">
                        {score}% — Retry needed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {mod.sections.length} sections + quiz ({mod.quiz.length}{" "}
                    questions)
                  </p>
                </div>
                {unlocked && (
                  <div className="flex-shrink-0 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Reset all progress? This cannot be undone."
              )
            ) {
              resetProgress();
            }
          }}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}
