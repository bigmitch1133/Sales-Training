"use client";

import { useState } from "react";
import { ModuleSection } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";

interface SectionViewerProps {
  sections: ModuleSection[];
  moduleId: number;
  onComplete: () => void;
}

export default function SectionViewer({
  sections,
  moduleId,
  onComplete,
}: SectionViewerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { markSectionComplete, completedSections } = useProgress();
  const section = sections[currentIdx];
  const moduleSections = completedSections[moduleId] || [];

  const handleNext = () => {
    markSectionComplete(moduleId, section.id);
    if (currentIdx < sections.length - 1) {
      setCurrentIdx(currentIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Section nav */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-brand whitespace-nowrap transition-all ${
              i === currentIdx
                ? "bg-[#1b5e20] text-white"
                : moduleSections.includes(s.id)
                ? "bg-[#1b5e20]/15 text-[#4caf50] border border-[#2e7d32]/40"
                : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222] border border-[#2a2a2a]"
            }`}
          >
            {s.id} {s.title}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="bg-[#141414] rounded-xl p-6 md:p-8 border border-[#2a2a2a]">
        <h2 className="text-2xl font-brand font-bold mb-6 text-white">
          {section.id} — {section.title}
        </h2>
        <div
          className="prose prose-lg prose-invert max-w-none font-brand"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-6 py-2 rounded-lg border border-[#2a2a2a] text-gray-400 hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-brand"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 font-brand">
          {currentIdx + 1} of {sections.length}
        </span>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors font-brand font-medium"
        >
          {currentIdx < sections.length - 1
            ? "Next Section"
            : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}
