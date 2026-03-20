"use client";

import { useState, useEffect } from "react";
import NationGraphLogo from "./NationGraphLogo";

function NetworkLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-15"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Horizontal flowing lines */}
      <path d="M-50 100 Q150 100 200 180 Q250 260 400 260 Q550 260 600 180 Q650 100 800 100 Q950 100 1000 180 Q1050 260 1250 260" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
      <path d="M-50 200 Q100 200 180 280 Q260 360 400 360 Q540 360 620 280 Q700 200 850 200 Q1000 200 1080 280 Q1160 360 1250 360" stroke="#bf5700" strokeWidth="1" fill="none" />
      <path d="M-50 350 Q200 350 280 280 Q360 210 500 210 Q640 210 720 280 Q800 350 950 350 Q1100 350 1180 280 Q1260 210 1250 210" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
      <path d="M-50 450 Q150 450 230 380 Q310 310 450 310 Q590 310 670 380 Q750 450 900 450 Q1050 450 1130 380 Q1210 310 1250 310" stroke="#1b5e20" strokeWidth="1" fill="none" />
      <path d="M-50 520 Q100 520 200 460 Q300 400 450 400 Q600 400 700 460 Q800 520 950 520 Q1100 520 1200 460 Q1300 400 1250 400" stroke="#bf5700" strokeWidth="0.8" fill="none" />
      {/* Vertical flowing lines */}
      <path d="M200 -50 Q200 100 280 180 Q360 260 360 400 Q360 500 280 560 Q200 620 200 650" stroke="#1b5e20" strokeWidth="1" fill="none" />
      <path d="M500 -50 Q500 80 420 160 Q340 240 340 380 Q340 480 420 540 Q500 600 500 650" stroke="#2e7d32" strokeWidth="1.5" fill="none" />
      <path d="M750 -50 Q750 100 830 180 Q910 260 910 380 Q910 480 830 540 Q750 600 750 650" stroke="#bf5700" strokeWidth="0.8" fill="none" />
      <path d="M1000 -50 Q1000 80 920 160 Q840 240 840 400 Q840 500 920 560 Q1000 620 1000 650" stroke="#1b5e20" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function WelcomeScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"hidden" | "welcome" | "logo" | "done">(
    "hidden"
  );

  useEffect(() => {
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
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d2818] flex flex-col items-center justify-center overflow-hidden">
      {/* Network line background */}
      <NetworkLines />

      {/* Welcome to */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-out mb-4 ${
          phase === "hidden"
            ? "opacity-0 translate-y-4"
            : phase === "welcome" || phase === "logo"
            ? "opacity-100 translate-y-0"
            : "opacity-0"
        }`}
      >
        <p className="text-2xl md:text-3xl font-brand font-light tracking-wide text-white/50">
          Welcome to
        </p>
      </div>

      {/* Logo */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-out ${
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
        className={`relative z-10 transition-all duration-700 ease-out mt-8 ${
          phase === "logo" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-sm md:text-base font-brand tracking-[0.25em] uppercase text-[#e8930c]/60">
          SDR Training Program
        </p>
      </div>

      {/* Skip */}
      <button
        onClick={() => {
          setPhase("done");
          sessionStorage.setItem("ng-welcome-seen", "1");
          onComplete();
        }}
        className={`absolute bottom-8 z-10 text-xs text-white/20 hover:text-white/50 transition-all duration-500 font-brand ${
          phase !== "hidden" ? "opacity-100" : "opacity-0"
        }`}
      >
        Skip
      </button>
    </div>
  );
}
