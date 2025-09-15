import { useState, useEffect } from "react";
import { showToast } from "../../../components/toast";

const QuizPopup = ({
  quiz,
  lessonName,
  onClose,
  onQuizCompletestatus,
  onQuizComplete,
  quizCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  useEffect(() => {
    if (showCorrect && isCorrectAnswer) {
      const timer = setTimeout(() => {
        if (currentIndex < quiz.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelected("");
        } else {
          showToast("Quiz completed successfully!", "top-center");

          const answers = quiz.map((q) => ({
            questionId: q._id,
            answer: q.answer || selected, // fallback in case answer is not set yet
          }));
          onQuizComplete(answers); // send answers to API
          onQuizCompletestatus(); // notify parent about quiz completion

          onClose();
        }
        setShowCorrect(false);
        setIsCorrectAnswer(null);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (showCorrect && !isCorrectAnswer) {
      const timer = setTimeout(() => {
        setShowCorrect(false);
        setSelected("");
        setIsCorrectAnswer(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [
    showCorrect,
    isCorrectAnswer,
    currentIndex,
    quiz.length,
    onClose,
    onQuizComplete,
    onQuizCompletestatus,
    selected,
  ]);

  // ✅ Handle Enter key for Next/Finish
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!quiz || quiz.length === 0) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/30 px-4 sm:px-6 md:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-6 text-center sm:text-left">
            No questions available.
          </h3>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const question = quiz[currentIndex];

  const handleOptionChange = (val) => {
    setSelected(val);
  };

  const checkAnswer = () => {
    if (!selected) {
      showToast("⚠️ Please select or enter an answer!", "bottom-center");
      return false;
    }

    let userAnswer = selected;
    let correctAnswer;

    if (question.type === "Fill in the Blanks") {
      userAnswer = userAnswer.trim().toLowerCase();
      correctAnswer = (question.answer || "").trim().toLowerCase();
    } else {
      correctAnswer = question.correctAnswer;
    }

    return userAnswer === correctAnswer;
  };

  const handleNext = () => {
    if (showCorrect && !isCorrectAnswer) {
      setShowCorrect(false);
      setSelected("");
      setIsCorrectAnswer(null);
      return;
    }

    const isCorrect = checkAnswer();
    setIsCorrectAnswer(isCorrect);

    setShowCorrect(true);

    if (!isCorrect) {
      return;
    }
    question.answer = selected;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/30 px-4 sm:px-6 md:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-2xl border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center sm:text-left">
          {lessonName || "Quiz"}
        </h2>

        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden mb-3 sm:mb-4">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentIndex + 1) / quiz.length) * 100}%` }}
          />
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center sm:text-left">
          Question {currentIndex + 1} of {quiz.length}
        </p>

        <p className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 text-left">
          {question.question}
        </p>

        {question.type === "Fill in the Blanks" && (
          <input
            type="text"
            placeholder="Enter your answer"
            value={selected}
            onChange={(e) => handleOptionChange(e.target.value)}
            disabled={showCorrect}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          />
        )}

        {question.type === "Multiple Choice" &&
          question.options.map((opt, idx) => {
            let optionClass = "";
            if (showCorrect) {
              if (opt === question.correctAnswer) {
                optionClass = "bg-green-100 text-green-700";
              } else if (opt === selected) {
                optionClass = "bg-red-100 text-red-700";
              }
            } else {
              optionClass =
                selected === opt
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200";
            }

            return (
              <label
                key={idx}
                className={`cursor-pointer flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition ${optionClass} ${
                  showCorrect ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  className="accent-primary scale-110 sm:scale-125"
                  checked={selected === opt}
                  onChange={() => handleOptionChange(opt)}
                  disabled={showCorrect}
                />
                <span className="text-base sm:text-lg">{opt}</span>
              </label>
            );
          })}

        {question.type === "True/False" && (
          <div className="space-y-3 sm:space-y-4">
            {["True", "False"].map((opt) => {
              let optionClass = "";
              if (showCorrect) {
                if (opt === question.correctAnswer) {
                  optionClass = "bg-green-100 text-green-700";
                } else if (opt === selected) {
                  optionClass = "bg-red-100 text-red-700";
                }
              } else {
                optionClass =
                  selected === opt
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
              }

              return (
                <label
                  key={opt}
                  className={`cursor-pointer flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition ${optionClass} ${
                    showCorrect ? "opacity-70 pointer-events-none" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={opt}
                    className="accent-primary scale-110 sm:scale-125"
                    checked={selected === opt}
                    onChange={() => handleOptionChange(opt)}
                    disabled={showCorrect}
                  />
                  <span className="text-base sm:text-lg">{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        <div className="min-h-[40px] flex items-center">
          {showCorrect && (
            <p className="text-base sm:text-lg text-left animate-pulse">
              <span
                className={`${
                  isCorrectAnswer
                    ? "text-green-600 font-light"
                    : "text-red-600 font-light"
                }`}
              >
                Correct Answer:
              </span>{" "}
              <span
                className={`${
                  isCorrectAnswer
                    ? "text-green-600 font-light"
                    : "text-red-600 font-light"
                }`}
              >
                {question.type === "Fill in the Blanks"
                  ? question.answer
                  : question.correctAnswer}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-2 sm:mt-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 text-sm sm:text-base"
          >
            Close
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg sm:rounded-xl hover:bg-primary/80 disabled:bg-gray-300 text-base sm:text-lg"
            disabled={
              (!selected && !showCorrect) ||
              (currentIndex === quiz.length - 1 && quizCompleted)
            }
          >
            {currentIndex < quiz.length - 1
              ? "Next"
              : quizCompleted
              ? "Already Completed"
              : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
