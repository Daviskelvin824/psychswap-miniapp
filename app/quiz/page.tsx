"use client";
import {
  useAddFrame,
  useMiniKit,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/app/data/quizQuestions";
import { QuizChoice, MBTITrait } from "@/app/types/quiz";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [answers, setAnswers] = useState<
    Record<
      string,
      { value: number; impact: Partial<Record<MBTITrait, number>> }
    >
  >({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const router = useRouter();
  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleSelect = (choice: QuizChoice) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        value: choice.value,
        impact: choice.mbtiImpact,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
      setShowLoading(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // When finished, calculate results
  useEffect(() => {
    if (isFinished) {
      const scores: Record<MBTITrait, number> = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0,
      };

      Object.values(answers).forEach(({ value, impact }) => {
        Object.entries(impact).forEach(([trait, impactValue]) => {
          scores[trait as MBTITrait] += (impactValue || 0) * value;
        });
      });

      const result =
        (scores.E >= scores.I ? "E" : "I") +
        (scores.S >= scores.N ? "S" : "N") +
        (scores.T >= scores.F ? "T" : "F") +
        (scores.J >= scores.P ? "J" : "P");

      setTimeout(() => {
        router.push(`/quiz-results?mbti=${result}`);
      }, 2000);
    }
  }, [isFinished, answers, router]);

  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);
  const selectedAnswer = answers[currentQuestion.id];

  if (showLoading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-transparent text-gray-800 px-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mb-6" />
        <h1 className="text-2xl font-semibold mb-2">
          Calculating your crypto alter ego...
        </h1>
        <p className="text-sm text-gray-500">
          Consulting the blockchain spirits 🔮
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 pt-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progressPercent} className="h-4" />
          <p className="text-sm text-gray-500 mt-1">
            Question {Math.min(currentIndex + 1, totalQuestions)} of{" "}
            {totalQuestions}
          </p>
        </div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          {!isFinished && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h1 className="text-lg font-semibold mb-6">
                {currentQuestion.question}
              </h1>

              {/* Choices */}
              <div className="flex flex-col gap-3 mb-6">
                {currentQuestion.choices.map((choice) => (
                  <Button
                    key={choice.value}
                    onClick={() => handleSelect(choice)}
                    variant={
                      selectedAnswer?.value === choice.value
                        ? "default"
                        : "neutral"
                    }
                  >
                    {choice.label}
                  </Button>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex justify-between">
                <Button onClick={handlePrev} disabled={currentIndex === 0}>
                  Prev
                </Button>
                <Button onClick={handleNext} disabled={!selectedAnswer}>
                  {currentIndex + 1 === totalQuestions ? "Finish" : "Next"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
