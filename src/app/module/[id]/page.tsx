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
        <h1 className="text-2xl font-bold text-black">Module not found</h1>
        <Link href="/" className="text-[#bf5700] hover:underline mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!isModuleUnlocked(moduleId)) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="bg-[#bf5700]/10 border border-[#bf5700]/30 rounded-xl p-8">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-black">Module Locked</h1>
          <p className="text-gray-600 mt-2">
            Complete Module {moduleId - 1} with 80%+ quiz score to unlock this
            module.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#14431a]"
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
          className="text-[#bf5700] hover:underline text-sm flex items-center gap-1 mb-4"
        >
          ← Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#1b5e20] text-white px-3 py-1 rounded-full text-sm font-medium">
            Module {mod.id}
          </span>
          <span className="text-sm text-gray-500">{mod.estimatedTime}</span>
          {passed && (
            <span className="bg-[#1b5e20]/10 text-[#1b5e20] px-3 py-1 rounded-full text-sm font-medium border border-[#2e7d32]">
              Completed — {existingScore}%
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-black">{mod.title}</h1>
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
          <h2 className="text-2xl font-bold mb-6 text-black">
            Module {mod.id} Quiz
          </h2>
          <Quiz
            questions={mod.quiz}
            moduleId={moduleId}
            onComplete={(score) => {
              saveQuizScore(moduleId, score);
            }}
          />
          {passed && (
            <div className="mt-6 flex gap-4 justify-center">
              {nextModule && (
                <button
                  onClick={() => router.push(`/module/${nextModule.id}`)}
                  className="px-6 py-3 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors"
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
