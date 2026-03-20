"use client";

import { useState, useEffect } from "react";
import NationGraphLogo from "./NationGraphLogo";

export default function WelcomeScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"hidden" | "welcome" | "logo" | "done">(
    "hidden"
  );

  useEffect(() => {
    // Check if already seen this session
    const seen = sessionStorage.getItem("ng-welcome-seen");
    if (seen) {
      setPhase("done");
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase("welcome"), 300);
    const t2 = setTimeout(() => setPhase("logo"), 1200);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("ng-welcome-seen", "1");
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center">
      {/* Welcome to */}
      <div
        className={`transition-all duration-1000 ease-out mb-6 ${
          phase === "hidden"
            ? "opacity-0 translate-y-4"
            : phase === "welcome" || phase === "logo"
            ? "opacity-100 translate-y-0"
            : "opacity-0"
        }`}
      >
        <p className="text-2xl md:text-3xl font-brand font-light tracking-wide text-gray-400">
          Welcome to
        </p>
      </div>

      {/* Logo */}
      <div
        className={`transition-all duration-1000 ease-out delay-200 ${
          phase === "hidden" || phase === "welcome"
            ? "opacity-0 scale-95"
            : phase === "logo"
            ? "opacity-100 scale-100"
            : "opacity-0"
        }`}
      >
        <NationGraphLogo size="hero" />
      </div>

      {/* Subtitle */}
      <div
        className={`transition-all duration-700 ease-out delay-500 mt-8 ${
          phase === "logo" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-sm md:text-base font-brand tracking-widest uppercase text-[#bf5700]">
          SDR Training Program
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          setPhase("done");
          sessionStorage.setItem("ng-welcome-seen", "1");
          onComplete();
        }}
        className={`absolute bottom-8 text-xs text-gray-600 hover:text-gray-400 transition-all duration-500 ${
          phase !== "hidden" ? "opacity-100" : "opacity-0"
        }`}
      >
        Skip
      </button>
    </div>
  );
}
