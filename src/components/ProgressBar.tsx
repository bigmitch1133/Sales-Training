"use client";

import { modules } from "@/data/modules";
import { useProgress } from "@/components/ProgressProvider";

export default function ProgressBar() {
  const { completedModules, quizScores } = useProgress();
  const totalModules = modules.length;
  const completed = completedModules.length;
  const percentage = Math.round((completed / totalModules) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Overall Progress
        </span>
        <span className="text-sm font-medium text-gray-700">
          {completed}/{totalModules} modules ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex gap-1 mt-2">
        {modules.map((m) => {
          const score = quizScores[m.id];
          const isComplete = completedModules.includes(m.id);
          return (
            <div
              key={m.id}
              className={`flex-1 h-2 rounded-full ${
                isComplete
                  ? score && score >= 80
                    ? "bg-green-500"
                    : "bg-yellow-500"
                  : "bg-gray-200"
              }`}
              title={`Module ${m.id}${score ? `: ${score}%` : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
