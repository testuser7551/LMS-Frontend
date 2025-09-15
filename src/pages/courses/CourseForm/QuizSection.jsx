import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import CustomDropdown from "../Components/CustomDropdown";

const quizQuestionTypes = [
  "Fill in the Blanks",
  "Multiple Choice",
  "True/False",
];

const QuizSection = forwardRef(({ lesson, setLesson }, ref) => {
  const initialQuestions =
    lesson.quiz && lesson.quiz.length > 0
      ? lesson.quiz
      : [
          {
            type: "Fill in the Blanks",
            question: "",
            answer: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ];

  const [questions, setQuestions] = useState(initialQuestions);

  useEffect(() => {
    setLesson({
      ...lesson,
      quiz: questions,
    });
  }, [questions]);

  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "Fill in the Blanks",
        question: "",
        answer: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const validateQuestions = () => {
    for (let i = 0; i < questions.length; i++) {
      const quizQuestion = questions[i];
      if (!quizQuestion.question.trim()) {
        return `Question ${i + 1}: Question text is required`;
      }
      if (!quizQuestion.type) {
        return `Question ${i + 1}: Please select a question type`;
      }
      if (quizQuestion.type === "Fill in the Blanks") {
        if (!quizQuestion.answer.trim()) {
          return `Question ${i + 1}: Answer is required`;
        }
      } else if (quizQuestion.type === "Multiple Choice") {
        const filledOptions = quizQuestion.options.filter(
          (opt) => opt.trim() !== ""
        );
        if (filledOptions.length < 2) {
          return `Question ${i + 1}: At least two options are required`;
        }
        if (!quizQuestion.correctAnswer.trim()) {
          return `Question ${i + 1}: Select correct answer`;
        }
      } else if (quizQuestion.type === "True/False") {
        if (!quizQuestion.correctAnswer) {
          return `Question ${i + 1}: Select True or False`;
        }
      }
    }
    return null; // No error
  };

  useImperativeHandle(ref, () => ({
    validateQuestions,
  }));

  return (
    <div className="p-4 rounded-2xl mt-4 space-y-6 bg-gray-50 border">
      <h4 className="text-lg font-semibold text-gray-700">Quiz Questions</h4>

      {questions.map((quizQuestion, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg bg-white space-y-4 relative"
        >
          <h5 className="font-medium text-primary">Question {index + 1}</h5>

          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={() => removeQuestion(index)}
            title="Remove question"
          >
            ✖
          </button>

          <CustomDropdown
            label="Question Type"
            options={quizQuestionTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            value={quizQuestion.type}
            onChange={(val) =>
              updateQuestion(index, {
                ...quizQuestion,
                type: val,
                answer: "",
                options: ["", "", "", ""],
                correctAnswer: "",
              })
            }
            width="w-full"
            getOptionLabel={(opt) => opt.label}
            getOptionValue={(opt) => opt.value}
            placeholder="Select Question Type"
          />

          <input
            className="w-full p-2 border border-gray-300 rounded-lg bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Question"
            value={quizQuestion.question}
            onChange={(e) =>
              updateQuestion(index, {
                ...quizQuestion,
                question: e.target.value,
              })
            }
          />

          {quizQuestion.type === "Fill in the Blanks" && (
            <input
              className="w-full p-2 border border-gray-300 rounded-lg bg-white placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Answer"
              value={quizQuestion.answer}
              onChange={(e) =>
                updateQuestion(index, {
                  ...quizQuestion,
                  answer: e.target.value,
                })
              }
            />
          )}

          {quizQuestion.type === "Multiple Choice" && (
            <div className="space-y-2">
              {quizQuestion.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...quizQuestion.options];
                      newOptions[idx] = e.target.value;
                      updateQuestion(index, {
                        ...quizQuestion,
                        options: newOptions,
                      });
                    }}
                  />
                  <input
                    type="radio"
                    name={`correctAnswer-${index}`}
                    checked={quizQuestion.correctAnswer === opt}
                    onChange={() =>
                      updateQuestion(index, {
                        ...quizQuestion,
                        correctAnswer: opt,
                      })
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      const newOptions = quizQuestion.options.filter(
                        (_, i) => i !== idx
                      );
                      updateQuestion(index, {
                        ...quizQuestion,
                        options:
                          newOptions.length >= 2
                            ? newOptions
                            : quizQuestion.options,
                      });
                    }}
                    disabled={quizQuestion.options.length <= 2}
                    title="Must have at least 2 options"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                onClick={() => {
                  updateQuestion(index, {
                    ...quizQuestion,
                    options: [...quizQuestion.options, ""],
                  });
                }}
              >
                Add Option
              </button>
            </div>
          )}

          {quizQuestion.type === "True/False" && (
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`correctAnswer-${index}`}
                  value="True"
                  checked={quizQuestion.correctAnswer === "True"}
                  onChange={() =>
                    updateQuestion(index, {
                      ...quizQuestion,
                      correctAnswer: "True",
                    })
                  }
                />
                True
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`correctAnswer-${index}`}
                  value="False"
                  checked={quizQuestion.correctAnswer === "False"}
                  onChange={() =>
                    updateQuestion(index, {
                      ...quizQuestion,
                      correctAnswer: "False",
                    })
                  }
                />
                False
              </label>
            </div>
          )}
        </div>
      ))}

      <button
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        onClick={addNewQuestion}
      >
        Add Question
      </button>
    </div>
  );
});

export default QuizSection;
