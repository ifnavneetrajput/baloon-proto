import { useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const QUESTIONS = [
  {
    key: "role",
    question: "What best describes you?",
    type: "single",
    options: [
      "School student",
      "College student",
      "Working professional",
      "Freelancer / Creator",
      "Other",
    ],
  },
  {
    key: "level",
    question: "What is your current level?",
    type: "single",
    options: [
      "Class 9–10",
      "Class 11–12",
      "Undergraduate",
      "Postgraduate",
      "Working professional",
    ],
  },
  {
    key: "goals",
    question: "Why are you joining Baloon?",
    type: "multi",
    max: 2,
    options: [
      "Explore my interests",
      "Improve my skills",
      "Participate in competitions",
      "Build a strong profile / portfolio",
    ],
  },
  {
    key: "interests",
    question: "Which areas are you most interested in?",
    type: "multi",
    max: 3,
    options: [
      "Technology & Coding",
      "Design & Creativity",
      "Content Creation",
      "Arts / Music / Dance",
      "Sports & Fitness",
      "Business & Entrepreneurship",
      "Public Speaking",
    ],
  },
  {
    key: "confidence",
    question: "How confident are you in these interests?",
    type: "single",
    options: ["Just exploring", "Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "activityType",
    question: "What type of activities do you prefer?",
    type: "single",
    options: [
      "Solo challenges",
      "Team competitions",
      "Short challenges",
      "Long-term projects",
    ],
  },
  {
    key: "frequency",
    question: "How often would you like to participate?",
    type: "single",
    options: ["Occasionally", "Monthly", "2–3 times a month", "Weekly"],
  },
  {
    key: "expectation",
    question:
      "Complete this sentence: “If Baloon helps me with ____, it will be worth it for me.”",
    type: "text",
  },
];

const Questionaries = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleSelect = (option) => {
    if (current.type === "single") {
      setAnswers({ ...answers, [current.key]: option });
    }

    if (current.type === "multi") {
      const prev = answers[current.key] || [];
      if (prev.includes(option)) {
        setAnswers({
          ...answers,
          [current.key]: prev.filter((o) => o !== option),
        });
      } else if (prev.length < current.max) {
        setAnswers({
          ...answers,
          [current.key]: [...prev, option],
        });
      }
    }
  };

  const canContinue = () => {
    const value = answers[current.key];
    if (current.type === "text") return value?.length > 3;
    if (current.type === "multi") return value?.length > 0;
    return !!value;
  };

 const handleNext = async () => {
   if (loading) return;

   if (step === QUESTIONS.length - 1) {
     setLoading(true);

     await setDoc(doc(db, "user_questionnaires", user.uid), {
       ...answers,
       completedAt: serverTimestamp(),
     });

     await setDoc(
       doc(db, "users", user.uid),
       { onboardingCompleted: true },
       { merge: true },
     );

     navigate("/home", { replace: true });
     return;
   }

   setStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };


if (!user) return null;
if (!current) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="mb-6">
          <div className="w-full h-1 bg-gray-200 rounded">
            <div
              className="h-1 bg-pink-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Question {step + 1} of {QUESTIONS.length}
          </p>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {current.question}
        </h2>

        <div className="space-y-3">
          {current.type === "text" ? (
            <input
              type="text"
              placeholder="For example: guidance, opportunities, confidence, exposure..."
              value={answers[current.key] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [current.key]: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          ) : (
            current.options.map((option) => {
              const selected =
                current.type === "multi"
                  ? answers[current.key]?.includes(option)
                  : answers[current.key] === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg border ${
                    selected ? "bg-pink-500 text-white border-pink-500" : ""
                  }`}
                >
                  {option}
                </button>
              );
            })
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={handlePrev}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          <button
            disabled={!canContinue() || loading}
            onClick={handleNext}
            className="bg-pink-500 text-white px-6 py-2 rounded-full disabled:opacity-40"
          >
            {step === QUESTIONS.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionaries;
