"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { modules } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";
import SectionViewer from "@/components/SectionViewer";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = Number(params.id);
  const mod = modules.find((m) => m.id === moduleId);
  const { isModuleUnlocked, saveQuizScore, quizScores, completedModules } =
    useProgress();
  const [showQuiz, setShowQuiz] = useState(false);

  if (!mod) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!isModuleUnlocked(moduleId)) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold">Module Locked</h1>
          <p className="text-gray-600 mt-2">
            Complete Module {moduleId - 1} with 80%+ quiz score to unlock this
            module.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const existingScore = quizScores[moduleId];
  const passed = existingScore !== undefined && existingScore >= 80;
  const nextModule = modules.find((m) => m.id === moduleId + 1);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-4"
        >
          ← Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Module {mod.id}
          </span>
          <span className="text-sm text-gray-500">{mod.estimatedTime}</span>
          {passed && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Completed — {existingScore}%
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{mod.title}</h1>
      </div>

      {/* Content or Quiz */}
      {!showQuiz ? (
        <SectionViewer
          sections={mod.sections}
          moduleId={moduleId}
          onComplete={() => setShowQuiz(true)}
        />
      ) : (
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">
            Module {mod.id} Quiz
          </h2>
          <Quiz
            questions={mod.quiz}
            moduleId={moduleId}
            onComplete={(score) => {
              saveQuizScore(moduleId, score);
              if (score >= 80 && nextModule) {
                // Small delay then show success
              }
            }}
          />
          {passed && (
            <div className="mt-6 flex gap-4 justify-center">
              {nextModule && (
                <button
                  onClick={() => router.push(`/module/${nextModule.id}`)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue to Module {nextModule.id} →
                </button>
              )}
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
