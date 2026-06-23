import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quizApi } from "../../api/QuizApi";

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  text: string;
  type: string;
  correctAnswer?: string;
  options?: Option[];
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function QuizDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await quizApi.getQuizById(id);
        setQuiz(data);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="alert alert-secondary">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Quiz not found</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        {/* TITLE */}
        <h2 className="mb-4">{quiz.title}</h2>

        {/* QUESTIONS */}
        {quiz.questions.length === 0 ? (
          <div className="text-muted">No questions in this quiz</div>
        ) : (
          quiz.questions.map((q, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <h5 className="mb-2">
                {index + 1}. {q.text}
              </h5>

              {/* INPUT TYPE */}
              {q.type === "INPUT" && (
                <div className="text-muted">
                  Correct answer: {q.correctAnswer}
                </div>
              )}

              {/* BOOLEAN TYPE */}
              {q.type === "BOOLEAN" && (
                <div>
                  {q.options?.map((opt, i) => (
                    <div
                      key={i}
                      className={`form-check ${
                        opt.isCorrect ? "text-success fw-bold" : "text-muted"
                      }`}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={opt.isCorrect}
                        disabled
                      />
                      <label className="form-check-label">
                        {opt.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* CHECKBOX TYPE */}
              {q.type === "CHECKBOX" && (
                <div>
                  {q.options?.map((opt, i) => (
                    <div
                      key={i}
                      className={`form-check ${
                        opt.isCorrect ? "text-success fw-bold" : ""
                      }`}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={opt.isCorrect}
                        disabled
                      />
                      <label className="form-check-label">
                        {opt.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}