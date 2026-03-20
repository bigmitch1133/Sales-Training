"use client";

import { useState, useCallback } from "react";
import { QuizQuestion } from "@/data/modules";

interface QuizProps {
  questions: QuizQuestion[];
  moduleId: number;
  onComplete: (score: number) => void;
}

function MultipleChoice({
  q,
  onAnswer,
}: {
  q: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === q.correct);
  };

  return (
    <div>
      <div className="space-y-2">
        {q.options!.map((opt, i) => (
          <button
            key={i}
            onClick={() => !submitted && setSelected(i)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              submitted
                ? i === q.correct
                  ? "border-[#1b5e20] bg-[#1b5e20]/10"
                  : i === selected
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200"
                : i === selected
                ? "border-[#bf5700] bg-[#bf5700]/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
            disabled={submitted}
          >
            <span className="font-medium mr-2">
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
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            selected === q.correct
              ? "bg-[#1b5e20]/10 border border-[#2e7d32]"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p className="font-semibold">
            {selected === q.correct ? "Correct!" : "Incorrect"}
          </p>
          <p className="mt-1 text-sm">{q.explanation}</p>
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
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected === q.correct);
  };

  return (
    <div>
      <div className="flex gap-4">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            onClick={() => !submitted && setSelected(val)}
            className={`flex-1 p-4 rounded-lg border-2 text-center font-semibold transition-all ${
              submitted
                ? val === q.correct
                  ? "border-[#1b5e20] bg-[#1b5e20]/10"
                  : val === selected
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200"
                : val === selected
                ? "border-[#bf5700] bg-[#bf5700]/10"
                : "border-gray-200 hover:border-gray-300"
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
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            selected === q.correct
              ? "bg-[#1b5e20]/10 border border-[#2e7d32]"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p className="font-semibold">
            {selected === q.correct ? "Correct!" : "Incorrect"}
          </p>
          <p className="mt-1 text-sm">{q.explanation}</p>
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
  onAnswer: (correct: boolean) => void;
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
    onAnswer(isCorrect);
  };

  const correctArr = q.correct as number[];

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
      <div className="space-y-2">
        {q.options!.map((opt, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
              submitted
                ? correctArr.includes(i)
                  ? "border-[#1b5e20] bg-[#1b5e20]/10"
                  : selected.includes(i)
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200"
                : selected.includes(i)
                ? "border-[#bf5700] bg-[#bf5700]/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
            disabled={submitted}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                selected.includes(i)
                  ? "border-[#bf5700] bg-[#bf5700] text-white"
                  : "border-gray-300"
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
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/10 border border-[#2e7d32]">
          <p className="font-semibold">
            {selected.length === correctArr.length &&
            selected.every((s) => correctArr.includes(s))
              ? "Correct!"
              : "Not quite right"}
          </p>
          <p className="mt-1 text-sm">{q.explanation}</p>
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
  onAnswer: (correct: boolean) => void;
}) {
  const pairs = q.pairs!;
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  // Shuffled definitions
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
    onAnswer(allCorrect);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        Click a term, then click its matching definition
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="font-semibold text-sm text-gray-600">Terms</p>
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => !submitted && setActiveTerm(i)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
                submitted
                  ? matches[i] === i
                    ? "border-[#1b5e20] bg-[#1b5e20]/10"
                    : "border-red-600 bg-red-50"
                  : activeTerm === i
                  ? "border-[#bf5700] bg-[#bf5700]/10"
                  : matches[i] !== undefined
                  ? "border-[#bf5700]/50 bg-[#bf5700]/5"
                  : "border-gray-200 hover:border-gray-300"
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
          <p className="font-semibold text-sm text-gray-600">Definitions</p>
          {shuffledDefs.map((defIdx) => (
            <button
              key={defIdx}
              onClick={() => handleDefClick(defIdx)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
                activeTerm !== null
                  ? "border-gray-200 hover:border-[#bf5700] hover:bg-[#bf5700]/10"
                  : "border-gray-200"
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
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/10 border border-[#2e7d32]">
          <p className="font-semibold">
            {pairs.every((_, i) => matches[i] === i)
              ? "All correct!"
              : "Some matches were incorrect"}
          </p>
          <p className="mt-1 text-sm">{q.explanation}</p>
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
  onAnswer: (correct: boolean) => void;
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
    onAnswer(isCorrect);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        Drag or use arrows to put items in the correct order
      </p>
      <div className="space-y-2">
        {order.map((itemIdx, pos) => {
          const isCorrectPosition = submitted && itemIdx === q.correct_order![pos];
          return (
            <div
              key={itemIdx}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                submitted
                  ? isCorrectPosition
                    ? "border-[#1b5e20] bg-[#1b5e20]/10"
                    : "border-red-600 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <span className="text-sm font-bold text-gray-400 w-6">
                {pos + 1}.
              </span>
              <span className="flex-1">{q.items![itemIdx]}</span>
              {!submitted && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveUp(pos)}
                    className="text-gray-400 hover:text-[#bf5700] text-xs px-1"
                    disabled={pos === 0}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(pos)}
                    className="text-gray-400 hover:text-[#bf5700] text-xs px-1"
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
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-[#1b5e20]/10 border border-[#2e7d32]">
          <p className="font-semibold">
            {order.every((itemIdx, pos) => itemIdx === q.correct_order![pos])
              ? "Perfect order!"
              : "Not quite right"}
          </p>
          <p className="mt-1 text-sm">{q.explanation}</p>
          {!order.every(
            (itemIdx, pos) => itemIdx === q.correct_order![pos]
          ) && (
            <div className="mt-2">
              <p className="text-sm font-medium">Correct order:</p>
              <ol className="text-sm list-decimal list-inside">
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
  onAnswer: (correct: boolean) => void;
}) {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Free response is always "correct" for scoring — flagged for manager review
    onAnswer(response.trim().length >= 20);
  };

  return (
    <div>
      <textarea
        value={response}
        onChange={(e) => !submitted && setResponse(e.target.value)}
        className="w-full p-4 border-2 border-gray-200 rounded-lg min-h-[120px] focus:border-[#1b5e20] focus:outline-none resize-y"
        placeholder="Type your answer here..."
        disabled={submitted}
      />
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={response.trim().length < 20}
          className="mt-4 px-6 py-2 bg-[#1b5e20] text-white rounded-lg disabled:opacity-50 hover:bg-[#14431a] transition-colors"
        >
          Submit Answer
        </button>
      )}
      {submitted && (
        <div className="mt-4 space-y-3">
          <div className="p-4 rounded-lg bg-[#1b5e20]/10 border border-[#2e7d32]">
            <p className="font-semibold">Answer submitted for review</p>
            <p className="text-sm text-gray-600 mt-1">
              Free response questions are reviewed by your manager.
            </p>
          </div>
          {q.sample_answer && (
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="font-semibold text-sm">Sample answer:</p>
              <p className="text-sm mt-1">{q.sample_answer}</p>
            </div>
          )}
          {q.grading_criteria && (
            <div className="p-4 rounded-lg bg-[#bf5700]/10 border border-[#bf5700]/30">
              <p className="font-semibold text-sm">Grading criteria:</p>
              <p className="text-sm mt-1">{q.grading_criteria}</p>
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
  const [finished, setFinished] = useState(false);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const newResults = [...results, correct];
      setResults(newResults);
    },
    [results]
  );

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
      const score = Math.round(
        (results.filter(Boolean).length / questions.length) * 100
      );
      onComplete(score);
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
          className={`text-6xl font-bold ${
            passed ? "text-[#1b5e20]" : "text-[#bf5700]"
          }`}
        >
          {score}%
        </div>
        <p className="text-xl mt-2 font-medium text-black">
          {passed ? "Congratulations! You passed!" : "Not quite — try again!"}
        </p>
        <p className="text-gray-600 mt-1">
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
            className="mt-6 px-6 py-3 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors"
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
        <span className="text-sm font-medium text-gray-500">
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
                    : "bg-red-500"
                  : i === currentQ
                  ? "bg-[#bf5700]"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-black">{q.question}</h3>

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
            className="px-6 py-2 bg-[#bf5700] text-white rounded-lg hover:bg-[#a04a00] transition-colors"
          >
            {currentQ < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
}
