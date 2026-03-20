"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";
import { useAuth } from "@/components/AuthProvider";
import NationGraphLogo from "@/components/NationGraphLogo";

const moduleIcons = ["📊", "🎯", "🏛️", "📞", "📋", "🔍", "🏆"];

export default function Sidebar() {
  const { user, logout, loading } = useAuth();
  const { completedModules, quizScores, isModuleUnlocked } = useProgress();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  if (loading || !user || pathname === "/login") return null;

  const completedCount = completedModules.length;
  const percentage = Math.round((completedCount / modules.length) * 100);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-40 md:hidden bg-[#141414] border border-[#2a2a2a] rounded-lg p-2 text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay on mobile */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 md:z-auto h-screen w-64 bg-[#0f0f0f] border-r border-[#1e1e1e] flex flex-col overflow-y-auto transition-transform md:translate-x-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1e1e1e]">
          <Link href="/" onClick={() => setCollapsed(true)}>
            <NationGraphLogo size="small" />
          </Link>
          <p className="text-[10px] font-brand tracking-[0.2em] uppercase text-[#e8930c]/60 mt-2">
            SDR Training
          </p>
        </div>

        {/* User */}
        <div className="px-4 py-3 border-b border-[#1e1e1e]">
          <p className="text-xs font-brand text-gray-500 truncate">{user.email}</p>
          {user.isAdmin && (
            <span className="text-[10px] font-brand bg-[#e8930c]/10 text-[#e8930c] px-2 py-0.5 rounded-full border border-[#e8930c]/20 mt-1 inline-block">
              Admin
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="px-4 py-3 border-b border-[#1e1e1e]">
          <div className="flex justify-between text-xs font-brand text-gray-500 mb-1.5">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Modules */}
        <nav className="flex-1 py-2">
          {modules.map((mod) => {
            const unlocked = isModuleUnlocked(mod.id);
            const completed = completedModules.includes(mod.id);
            const score = quizScores[mod.id];
            const isActive = pathname === `/module/${mod.id}`;

            return (
              <Link
                key={mod.id}
                href={unlocked ? `/module/${mod.id}` : "#"}
                onClick={(e) => {
                  if (!unlocked) e.preventDefault();
                  else setCollapsed(true);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-brand transition-all ${
                  isActive
                    ? "bg-[#1b5e20]/15 text-white border-r-2 border-[#2e7d32]"
                    : !unlocked
                    ? "text-gray-600 cursor-not-allowed"
                    : completed
                    ? "text-gray-300 hover:bg-[#1a1a1a]"
                    : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                <span className="text-lg w-6 text-center">
                  {!unlocked ? "🔒" : completed ? "✅" : moduleIcons[mod.id - 1]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs">
                    <span className="text-gray-500">{mod.id}.</span> {mod.title}
                  </p>
                  {score !== undefined && (
                    <p className={`text-[10px] ${score >= 80 ? "text-[#4caf50]" : "text-[#e8930c]"}`}>
                      Quiz: {score}%
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#1e1e1e] space-y-2">
          {user.isAdmin && (
            <Link
              href="/admin"
              onClick={() => setCollapsed(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-brand transition-colors ${
                pathname === "/admin"
                  ? "bg-[#e8930c]/15 text-[#e8930c]"
                  : "text-gray-500 hover:bg-[#1a1a1a] hover:text-gray-300"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-brand text-gray-600 hover:bg-[#1a1a1a] hover:text-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
