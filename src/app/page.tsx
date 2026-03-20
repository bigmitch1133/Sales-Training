"use client";

import { useState } from "react";
import { modules } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";
import ProgressBar from "@/components/ProgressBar";
import NationGraphLogo from "@/components/NationGraphLogo";
import WelcomeScreen from "@/components/WelcomeScreen";
import Link from "next/link";

const moduleIcons = ["📊", "🎯", "🏛️", "📞", "📋", "🔍", "🏆"];

export default function Home() {
  const { completedModules, quizScores, isModuleUnlocked, resetProgress } =
    useProgress();
  const [welcomeDone, setWelcomeDone] = useState(false);

  const allComplete =
    completedModules.length === modules.length &&
    modules.every((m) => (quizScores[m.id] || 0) >= 80);

  return (
    <>
      <WelcomeScreen onComplete={() => setWelcomeDone(true)} />

      <div
        className={`max-w-5xl mx-auto p-4 md:p-8 transition-opacity duration-700 ${
          welcomeDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1b5e20] to-[#0d2818] rounded-2xl p-8 md:p-12 text-white mb-8 border border-[#2e7d32]/30">
          {/* Subtle network pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M-20 50 Q100 50 150 100 Q200 150 350 150 Q500 150 550 100 Q600 50 750 50 Q900 50 820 100" stroke="#2e7d32" strokeWidth="1.5" fill="none"/>
            <path d="M-20 150 Q80 150 150 200 Q220 250 400 250 Q580 250 650 200 Q720 150 820 150" stroke="#bf5700" strokeWidth="1" fill="none"/>
            <path d="M-20 220 Q120 220 200 170 Q280 120 420 120 Q560 120 640 170 Q720 220 820 220" stroke="#2e7d32" strokeWidth="1" fill="none"/>
          </svg>
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4 mb-4">
            <NationGraphLogo size="default" />
            <span className="text-xs font-brand tracking-[0.2em] uppercase text-[#e8930c] bg-[#e8930c]/10 px-3 py-1 rounded-full border border-[#e8930c]/20">
              SDR Training
            </span>
          </div>
          <p className="relative z-10 text-white/50 text-lg font-brand">
            Interactive onboarding program — 7 modules, ~5 hours total
          </p>
          <div className="relative z-10 mt-6 bg-black/20 rounded-xl p-4 border border-white/5">
            <ProgressBar />
          </div>
        </div>

        {allComplete && (
          <div className="bg-[#1b5e20]/15 border border-[#2e7d32]/40 rounded-xl p-6 mb-8 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold font-brand text-white">
              Training Complete!
            </h2>
            <p className="text-green-300/80 mt-1 font-brand">
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
                className={`block rounded-xl border p-6 transition-all ${
                  !unlocked
                    ? "border-[#2a2a2a] bg-[#141414] opacity-50 cursor-not-allowed"
                    : completed
                    ? "border-[#2e7d32]/40 bg-[#1b5e20]/10 hover:border-[#2e7d32]/70 hover:bg-[#1b5e20]/15"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-[#bf5700]/50 hover:bg-[#1a1a1a]"
                }`}
                onClick={(e) => !unlocked && e.preventDefault()}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-3xl flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                      completed
                        ? "bg-[#1b5e20]/20"
                        : unlocked
                        ? "bg-[#bf5700]/10"
                        : "bg-[#1a1a1a]"
                    }`}
                  >
                    {!unlocked ? "🔒" : moduleIcons[mod.id - 1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-brand font-semibold text-gray-500 uppercase tracking-wider">
                        Module {mod.id}
                      </span>
                      <span className="text-xs text-gray-600">
                        {mod.estimatedTime}
                      </span>
                      {passed && (
                        <span className="text-xs bg-[#1b5e20] text-white px-2 py-0.5 rounded-full font-brand font-medium">
                          Passed — {score}%
                        </span>
                      )}
                      {score !== undefined && !passed && (
                        <span className="text-xs bg-[#bf5700] text-white px-2 py-0.5 rounded-full font-brand font-medium">
                          {score}% — Retry needed
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-brand font-semibold text-white">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-brand">
                      {mod.sections.length} sections + quiz ({mod.quiz.length}{" "}
                      questions)
                    </p>
                  </div>
                  {unlocked && (
                    <div className="flex-shrink-0 text-[#bf5700]">
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
            className="text-sm text-gray-600 hover:text-[#bf5700] transition-colors font-brand"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </>
  );
}
