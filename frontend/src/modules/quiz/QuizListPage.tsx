import { useEffect, useState } from "react";
import { quizApi } from "../../api/QuizApi";
import { useNavigate } from "react-router-dom";

type Quiz = {
  id: string;
  title: string;
  questions: { id: string }[];
};

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    const data = await quizApi.getQuizzes();
    setQuizzes(data);
  };

  const handleDelete = async (id: string) => {
    await quizApi.deleteQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Quizzes</h2>

      <div className="row">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100">
              <div
                className="card-body"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
              >
                <h5 className="card-title">{quiz.title}</h5>

                <p className="card-text text-muted">
                  Questions: {quiz.questions?.length ?? 0}
                </p>
              </div>

              {/* footer with delete */}
              <div className="card-footer bg-white d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(quiz.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}