import { useState } from 'react';
import { Brain, Check, X, RotateCcw, Trophy } from 'lucide-react';
import { quizData } from '@/data/heritageData';

export function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answered, setAnswered] = useState<boolean[]>([]);

  const question = quizData[currentQ];
  const isLastQ = currentQ === quizData.length - 1;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);

    const correct = idx === question.answerIndex;
    if (correct) setScore((s) => s + 1);
    setAnswered((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (isLastQ) {
      setCompleted(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setAnswered([]);
  };

  if (completed) {
    const percentage = Math.round((score / quizData.length) * 100);
    const message =
      percentage === 100 ? 'Perfect! You\'re a heritage expert!' :
      percentage >= 75 ? 'Excellent! You know India well.' :
      percentage >= 50 ? 'Good effort! Keep exploring.' :
      'Keep discovering India\'s rich heritage!';

    return (
      <div className="animate-scale-in rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/80 p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 shadow-lg shadow-saffron-500/30">
          <Trophy className="h-10 w-10 text-ink-950" />
        </div>
        <h3 className="font-display text-3xl font-bold text-white">Quiz Complete!</h3>
        <p className="mt-4 font-display text-5xl font-bold text-gradient-gold">
          {score} / {quizData.length}
        </p>
        <p className="mt-4 text-gray-300">{message}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {answered.map((correct, idx) => (
            <span
              key={idx}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                correct ? 'bg-emerald2-500/20 text-emerald2-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {idx + 1}
            </span>
          ))}
        </div>

        <button onClick={handleRestart} className="btn-primary mt-8">
          <RotateCcw className="h-4 w-4" />
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/80 p-6 backdrop-blur-xl sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-500 to-gold-500">
            <Brain className="h-5 w-5 text-ink-950" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Heritage Quiz</h3>
            <p className="text-xs text-gray-400">Question {currentQ + 1} of {quizData.length}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-gold-400">
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-gold-400 transition-all duration-500"
          style={{ width: `${((currentQ + (showResult ? 1 : 0)) / quizData.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="mb-6 font-display text-xl font-semibold text-white sm:text-2xl">
        {question.question}
      </h4>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.answerIndex;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition-all duration-300 ${
                showCorrect
                  ? 'border-emerald2-400/50 bg-emerald2-500/15 text-emerald2-200'
                  : showWrong
                  ? 'border-red-400/50 bg-red-500/15 text-red-200'
                  : isSelected
                  ? 'border-saffron-400/40 bg-saffron-500/15 text-saffron-200'
                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span>{option}</span>
              {showCorrect && <Check className="h-5 w-5 shrink-0 text-emerald2-400" />}
              {showWrong && <X className="h-5 w-5 shrink-0 text-red-400" />}
            </button>
          );
        })}
      </div>

      {/* Explanation + next */}
      {showResult && (
        <div className="animate-fade-in mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Explanation</p>
            <p className="mt-1 text-sm text-gray-300">{question.explanation}</p>
          </div>
          <button onClick={handleNext} className="btn-primary mt-4 w-full sm:w-auto">
            {isLastQ ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}
