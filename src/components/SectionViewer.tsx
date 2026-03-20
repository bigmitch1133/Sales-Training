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
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              i === currentIdx
                ? "bg-blue-600 text-white"
                : moduleSections.includes(s.id)
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.id} {s.title}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6">
          {section.id} — {section.title}
        </h2>
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-gray-900 prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6
            prose-p:text-gray-700 prose-li:text-gray-700
            prose-table:text-sm prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border-t
            prose-strong:text-gray-900
            prose-ul:space-y-1 prose-ol:space-y-1"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          {currentIdx + 1} of {sections.length}
        </span>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentIdx < sections.length - 1
            ? "Next Section"
            : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}
