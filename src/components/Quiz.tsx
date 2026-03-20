"use client";

import { useState, useCallback } from "react";
import { QuizQuestion } from "@/data/modules";
import type { QuizAnswerRecord } from "@/components/ProgressProvider";

interface QuizProps {
  questions: QuizQuestion[];
  moduleId: number;
  onComplete: (score: number, answers?: QuizAnswerRecord[]) => void;
}

function MultipleChoice({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === q.correct, selected);
  };

  return (
    <div>
      <div className="space-y-2">
        {q.options!.map((opt, i) => (
          <button
            key={i}
            onClick={() => !submitted && setSelected(i)}
            className={`w-full text-left p-3 rounded-lg border transition-all font-brand ${
              submitted
                ? i === q.correct
                  ? "border-[#2e7d32] bg-[#1b5e20]/15 text-white"
                  : i === selected
                  ? "border-red-700 bg-red-900/20 text-red-300"
                  : "border-[#2a2a2a] text-gray-400"
                : i === selected
                ? "border-[#bf5700] bg-[#bf5700]/10 text-white"
                : "border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
            }`}
            disabled={submitted}
          >
            <span className="font-medium mr-2 text-gray-500">
              {String.fromCharCode(65 + i)}.
            </span>
            {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            selected === q.correct
              ? "bg-[#1b5e20]/15 border border-[#2e7d32]/40"
              : "bg-red-900/15 border border-red-800/40"
          }`}
        >
          <p className="font-brand font-semibold text-white">
            {selected === q.correct ? "Correct!" : "Incorrect"}
          </p>
          <p className="mt-1 text-sm text-gray-400 font-brand">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function TrueFalse({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === q.correct, selected);
  };

  return (
    <div>
      <div className="flex gap-4">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            onClick={() => !submitted && setSelected(val)}
            className={`flex-1 p-4 rounded-lg border text-center font-brand font-semibold transition-all ${
              submitted
                ? val === q.correct
                  ? "border-[#2e7d32] bg-[#1b5e20]/15 text-white"
                  : val === selected
                  ? "border-red-700 bg-red-900/20 text-red-300"
                  : "border-[#2a2a2a] text-gray-500"
                : val === selected
                ? "border-[#bf5700] bg-[#bf5700]/10 text-white"
                : "border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
            }`}
            disabled={submitted}
          >
            {val ? "True" : "False"}
          </button>
        ))}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            selected === q.correct
              ? "bg-[#1b5e20]/15 border border-[#2e7d32]/40"
              : "bg-red-900/15 border border-red-800/40"
          }`}
        >
          <p className="font-brand font-semibold text-white">
            {selected === q.correct ? "Correct!" : "Incorrect"}
          </p>
          <p className="mt-1 text-sm text-gray-400 font-brand">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function SelectAll({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: number) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctArr = q.correct as number[];
    const isCorrect =
      selected.length === correctArr.length &&
      selected.every((s) => correctArr.includes(s));
    onAnswer(isCorrect, selected);
  };

  const correctArr = q.correct as number[];

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3 font-brand">Select all that apply</p>
      <div className="space-y-2">
        {q.options!.map((opt, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 font-brand ${
              submitted
                ? correctArr.includes(i)
                  ? "border-[#2e7d32] bg-[#1b5e20]/15 text-white"
                  : selected.includes(i)
                  ? "border-red-700 bg-red-900/20 text-red-300"
                  : "border-[#2a2a2a] text-gray-400"
                : selected.includes(i)
                ? "border-[#bf5700] bg-[#bf5700]/10 text-white"
                : "border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]"
            }`}
            disabled={submitted}
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                selected.includes(i)
                  ? "border-[#bf5700] bg-[#bf5700] text-white"
                  : "border-gray-600"
              }`}
            >
              {selected.includes(i) && "✓"}
            </div>
            {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/15 border border-[#2e7d32]/40">
          <p className="font-brand font-semibold text-white">
            {selected.length === correctArr.length &&
            selected.every((s) => correctArr.includes(s))
              ? "Correct!"
              : "Not quite right"}
          </p>
          <p className="mt-1 text-sm text-gray-400 font-brand">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function Matching({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const pairs = q.pairs!;
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const [shuffledDefs] = useState(() => {
    const indices = pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const handleDefClick = (defIdx: number) => {
    if (submitted || activeTerm === null) return;
    setMatches((prev) => ({ ...prev, [activeTerm]: defIdx }));
    setActiveTerm(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = pairs.every((_, i) => matches[i] === i);
    onAnswer(allCorrect, matches);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3 font-brand">
        Click a term, then click its matching definition
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="font-brand font-semibold text-sm text-gray-500">Terms</p>
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => !submitted && setActiveTerm(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all text-sm font-brand ${
                submitted
                  ? matches[i] === i
                    ? "border-[#2e7d32] bg-[#1b5e20]/15 text-white"
                    : "border-red-700 bg-red-900/20 text-red-300"
                  : activeTerm === i
                  ? "border-[#bf5700] bg-[#bf5700]/10 text-white"
                  : matches[i] !== undefined
                  ? "border-[#bf5700]/40 bg-[#bf5700]/5 text-gray-300"
                  : "border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a]"
              }`}
              disabled={submitted}
            >
              <strong>{p.term}</strong>
              {matches[i] !== undefined && (
                <span className="text-xs text-gray-500 block mt-1">
                  → {pairs[matches[i]].definition.slice(0, 30)}...
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="font-brand font-semibold text-sm text-gray-500">Definitions</p>
          {shuffledDefs.map((defIdx) => (
            <button
              key={defIdx}
              onClick={() => handleDefClick(defIdx)}
              className={`w-full text-left p-3 rounded-lg border transition-all text-sm font-brand ${
                activeTerm !== null
                  ? "border-[#2a2a2a] text-gray-300 hover:border-[#bf5700] hover:bg-[#bf5700]/10"
                  : "border-[#2a2a2a] text-gray-400"
              }`}
              disabled={submitted || activeTerm === null}
            >
              {pairs[defIdx].definition}
            </button>
          ))}
        </div>
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length < pairs.length}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/15 border border-[#2e7d32]/40">
          <p className="font-brand font-semibold text-white">
            {pairs.every((_, i) => matches[i] === i)
              ? "All correct!"
              : "Some matches were incorrect"}
          </p>
          <p className="mt-1 text-sm text-gray-400 font-brand">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function Ordering({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const [order, setOrder] = useState(() => {
    const indices = q.items!.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [submitted, setSubmitted] = useState(false);

  const moveUp = (pos: number) => {
    if (pos === 0 || submitted) return;
    const newOrder = [...order];
    [newOrder[pos], newOrder[pos - 1]] = [newOrder[pos - 1], newOrder[pos]];
    setOrder(newOrder);
  };

  const moveDown = (pos: number) => {
    if (pos === order.length - 1 || submitted) return;
    const newOrder = [...order];
    [newOrder[pos], newOrder[pos + 1]] = [newOrder[pos + 1], newOrder[pos]];
    setOrder(newOrder);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = order.every(
      (itemIdx, pos) => itemIdx === q.correct_order![pos]
    );
    onAnswer(isCorrect, order);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3 font-brand">
        Use arrows to put items in the correct order
      </p>
      <div className="space-y-2">
        {order.map((itemIdx, pos) => {
          const isCorrectPosition = submitted && itemIdx === q.correct_order![pos];
          return (
            <div
              key={itemIdx}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all font-brand ${
                submitted
                  ? isCorrectPosition
                    ? "border-[#2e7d32] bg-[#1b5e20]/15 text-white"
                    : "border-red-700 bg-red-900/20 text-red-300"
                  : "border-[#2a2a2a] text-gray-300"
              }`}
            >
              <span className="text-sm font-bold text-gray-600 w-6">
                {pos + 1}.
              </span>
              <span className="flex-1">{q.items![itemIdx]}</span>
              {!submitted && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveUp(pos)}
                    className="text-gray-600 hover:text-[#bf5700] text-xs px-1"
                    disabled={pos === 0}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(pos)}
                    className="text-gray-600 hover:text-[#bf5700] text-xs px-1"
                    disabled={pos === order.length - 1}
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/15 border border-[#2e7d32]/40">
          <p className="font-brand font-semibold text-white">
            {order.every((itemIdx, pos) => itemIdx === q.correct_order![pos])
              ? "Perfect order!"
              : "Not quite right"}
          </p>
          <p className="mt-1 text-sm text-gray-400 font-brand">{q.explanation}</p>
          {!order.every(
            (itemIdx, pos) => itemIdx === q.correct_order![pos]
          ) && (
            <div className="mt-2">
              <p className="text-sm font-brand font-medium text-gray-300">Correct order:</p>
              <ol className="text-sm list-decimal list-inside text-gray-400 font-brand">
                {q.correct_order!.map((idx) => (
                  <li key={idx}>{q.items![idx]}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FreeResponse({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean, selected?: unknown) => void;
}) {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onAnswer(response.trim().length >= 20, response);
  };

  return (
    <div>
      <textarea
        value={response}
        onChange={(e) => !submitted && setResponse(e.target.value)}
        className="w-full p-4 border border-[#2a2a2a] bg-[#0a0a0a] text-gray-200 rounded-lg min-h-[120px] focus:border-[#1b5e20] focus:outline-none resize-y font-brand placeholder:text-gray-600"
        placeholder="Type your answer here..."
        disabled={submitted}
      />
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={response.trim().length < 20}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors font-brand font-medium"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 space-y-3">
          <div className="p-4 rounded-lg bg-[#1b5e20]/15 border border-[#2e7d32]/40">
            <p className="font-brand font-semibold text-white">Answer submitted for review</p>
            <p className="text-sm text-gray-400 mt-1 font-brand">
              Free response questions are reviewed by your manager.
            </p>
          </div>
          {q.sample_answer && (
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
              <p className="font-brand font-semibold text-sm text-gray-300">Sample answer:</p>
              <p className="text-sm mt-1 text-gray-400 font-brand">{q.sample_answer}</p>
            </div>
          )}
          {q.grading_criteria && (
            <div className="p-4 rounded-lg bg-[#bf5700]/10 border border-[#bf5700]/30">
              <p className="font-brand font-semibold text-sm text-[#e06800]">Grading criteria:</p>
              <p className="text-sm mt-1 text-gray-400 font-brand">{q.grading_criteria}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Quiz({ questions, moduleId, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answerRecords, setAnswerRecords] = useState<QuizAnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = useCallback(
    (correct: boolean, selected?: unknown) => {
      const newResults = [...results, correct];
      setResults(newResults);
      setAnswerRecords((prev) => [
        ...prev,
        {
          questionId: questions[currentQ].id,
          selected: selected ?? null,
          correct,
          timestamp: new Date().toISOString(),
        },
      ]);
    },
    [results, currentQ, questions]
  );

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
      const score = Math.round(
        (results.filter(Boolean).length / questions.length) * 100
      );
      onComplete(score, answerRecords);
    }
  };

  if (finished) {
    const score = Math.round(
      (results.filter(Boolean).length / questions.length) * 100
    );
    const passed = score >= 80;
    return (
      <div className="text-center py-8">
        <div
          className={`text-6xl font-brand font-bold ${
            passed ? "text-[#4caf50]" : "text-[#bf5700]"
          }`}
        >
          {score}%
        </div>
        <p className="text-xl mt-2 font-brand font-medium text-white">
          {passed ? "Congratulations! You passed!" : "Not quite — try again!"}
        </p>
        <p className="text-gray-500 mt-1 font-brand">
          {results.filter(Boolean).length} of {questions.length} correct
          {!passed && " (80% required to proceed)"}
        </p>
        {!passed && (
          <button
            onClick={() => {
              setCurrentQ(0);
              setResults([]);
              setFinished(false);
            }}
            className="mt-6 px-6 py-3 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors font-brand font-medium"
          >
            Retry Quiz
          </button>
        )}
      </div>
    );
  }

  const q = questions[currentQ];
  const answered = results.length > currentQ;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-brand font-medium text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < results.length
                  ? results[i]
                    ? "bg-[#1b5e20]"
                    : "bg-red-700"
                  : i === currentQ
                  ? "bg-[#bf5700]"
                  : "bg-[#2a2a2a]"
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-lg font-brand font-semibold mb-4 text-white">{q.question}</h3>

      {q.type === "multiple_choice" && (
        <MultipleChoice key={q.id} q={q} onAnswer={handleAnswer} />
      )}
      {q.type === "true_false" && (
        <TrueFalse key={q.id} q={q} onAnswer={handleAnswer} />
      )}
      {q.type === "select_all" && (
        <SelectAll key={q.id} q={q} onAnswer={handleAnswer} />
      )}
      {q.type === "matching" && (
        <Matching key={q.id} q={q} onAnswer={handleAnswer} />
      )}
      {q.type === "ordering" && (
        <Ordering key={q.id} q={q} onAnswer={handleAnswer} />
      )}
      {(q.type === "free_response" || q.type === "scenario") && (
        <FreeResponse key={q.id} q={q} onAnswer={handleAnswer} />
      )}

      {answered && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors font-brand font-medium"
          >
            {currentQ < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
}
