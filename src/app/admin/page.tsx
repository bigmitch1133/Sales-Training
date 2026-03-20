"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { modules } from "@/data/modules";
import type { QuizAnswerRecord } from "@/components/ProgressProvider";
import NationGraphLogo from "@/components/NationGraphLogo";
import Link from "next/link";

interface UserData {
  email: string;
  completedModules: number[];
  quizScores: Record<number, number>;
  completedSections: Record<number, string[]>;
  quizAnswers: Record<number, QuizAnswerRecord[]>;
  lastActive: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/");
      return;
    }

    const load = () => {
      fetch("/api/admin/progress")
        .then((r) => (r.ok ? r.json() : []))
        .then(setUsers);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [user, loading, router]);

  if (loading || !user?.isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-brand font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 font-brand mt-1">
            Track employee training progress and quiz results
          </p>
        </div>
        <Link
          href="/"
          className="text-[#e8930c] hover:text-[#e8930c]/80 text-sm font-brand"
        >
          ← Back to Training
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2a2a2a]">
          <p className="text-gray-500 text-sm font-brand">Total Users</p>
          <p className="text-3xl font-brand font-bold text-white mt-1">
            {users.length}
          </p>
        </div>
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2a2a2a]">
          <p className="text-gray-500 text-sm font-brand">Fully Completed</p>
          <p className="text-3xl font-brand font-bold text-[#4caf50] mt-1">
            {users.filter((u) => u.completedModules?.length === 7).length}
          </p>
        </div>
        <div className="bg-[#141414] rounded-xl p-6 border border-[#2a2a2a]">
          <p className="text-gray-500 text-sm font-brand">In Progress</p>
          <p className="text-3xl font-brand font-bold text-[#e8930c] mt-1">
            {
              users.filter(
                (u) =>
                  (u.completedModules?.length || 0) > 0 &&
                  (u.completedModules?.length || 0) < 7
              ).length
            }
          </p>
        </div>
      </div>

      {/* Users Table */}
      {users.length === 0 ? (
        <div className="bg-[#141414] rounded-xl p-12 border border-[#2a2a2a] text-center">
          <p className="text-gray-500 font-brand">
            No users have started training yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((u) => {
            const isExpanded = expanded === u.email;
            const modulesComplete = u.completedModules?.length || 0;
            const pct = Math.round((modulesComplete / 7) * 100);

            return (
              <div
                key={u.email}
                className="bg-[#141414] rounded-xl border border-[#2a2a2a] overflow-hidden"
              >
                {/* User Row */}
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : u.email)
                  }
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1b5e20]/20 flex items-center justify-center text-sm font-brand font-bold text-[#4caf50]">
                    {u.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-brand font-medium text-white truncate">
                      {u.email}
                    </p>
                    <p className="text-xs text-gray-500 font-brand">
                      Last active:{" "}
                      {u.lastActive
                        ? new Date(u.lastActive).toLocaleString()
                        : "Never"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-brand font-medium text-white">
                        {modulesComplete}/7
                      </p>
                      <div className="w-24 bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                        <div
                          className="bg-gradient-to-r from-[#1b5e20] to-[#4caf50] h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-[#2a2a2a] p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {modules.map((mod) => {
                        const score = u.quizScores?.[mod.id];
                        const completed = u.completedModules?.includes(mod.id);
                        const hasAnswers =
                          u.quizAnswers?.[mod.id]?.length > 0;

                        return (
                          <button
                            key={mod.id}
                            onClick={() =>
                              setExpandedModule(
                                expandedModule === mod.id ? null : mod.id
                              )
                            }
                            className={`text-left p-3 rounded-lg border transition-colors ${
                              completed
                                ? "border-[#2e7d32]/40 bg-[#1b5e20]/10"
                                : "border-[#2a2a2a] bg-[#0f0f0f]"
                            } ${
                              expandedModule === mod.id
                                ? "ring-1 ring-[#e8930c]/50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-brand text-gray-500">
                                Module {mod.id}
                              </p>
                              {completed && (
                                <span className="text-[10px] bg-[#1b5e20] text-white px-1.5 py-0.5 rounded font-brand">
                                  {score}%
                                </span>
                              )}
                              {score !== undefined && !completed && (
                                <span className="text-[10px] bg-[#e8930c] text-white px-1.5 py-0.5 rounded font-brand">
                                  {score}%
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-brand text-gray-300 mt-1 truncate">
                              {mod.title}
                            </p>
                            {hasAnswers && (
                              <p className="text-[10px] text-[#e8930c] mt-1 font-brand">
                                View answers →
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quiz Answers Detail */}
                    {expandedModule !== null &&
                      u.quizAnswers?.[expandedModule]?.length > 0 && (
                        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#2a2a2a]">
                          <h4 className="text-sm font-brand font-semibold text-white mb-3">
                            Module {expandedModule} Quiz Answers
                          </h4>
                          <div className="space-y-2">
                            {u.quizAnswers[expandedModule].map(
                              (ans, idx) => {
                                const mod = modules.find(
                                  (m) => m.id === expandedModule
                                );
                                const question = mod?.quiz.find(
                                  (q) => q.id === ans.questionId
                                );
                                return (
                                  <div
                                    key={idx}
                                    className={`p-3 rounded border text-sm font-brand ${
                                      ans.correct
                                        ? "border-[#2e7d32]/30 bg-[#1b5e20]/5"
                                        : "border-red-800/30 bg-red-900/5"
                                    }`}
                                  >
                                    <p className="text-gray-400 text-xs mb-1">
                                      Q{ans.questionId}:{" "}
                                      {question?.question?.slice(0, 80)}
                                      {(question?.question?.length || 0) > 80
                                        ? "..."
                                        : ""}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-xs font-medium ${
                                          ans.correct
                                            ? "text-[#4caf50]"
                                            : "text-red-400"
                                        }`}
                                      >
                                        {ans.correct ? "Correct" : "Incorrect"}
                                      </span>
                                      <span className="text-gray-600 text-xs">
                                        {typeof ans.selected === "string"
                                          ? `"${ans.selected.slice(0, 50)}..."`
                                          : typeof ans.selected === "number" &&
                                            question?.options
                                          ? `Selected: ${question.options[ans.selected]}`
                                          : `Selected: ${JSON.stringify(ans.selected)}`}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
