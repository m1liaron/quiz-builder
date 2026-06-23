import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./modules/auth/login/LoginPage";
import RegisterPage from "./modules/auth/register/RegisterPage";
import { AppRoutes } from "./common/constants/AppRoutes";
import CreateQuizPage from "./modules/quiz/createQuizPage";
import QuizListPage from "./modules/quiz/QuizListPage";
import QuizDetailPage from "./modules/quiz/DetailedQuizPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.ROOT} element={<QuizListPage/>} />
        <Route path={"/quizzes/:id"} element={<QuizDetailPage/>} />
        <Route path={AppRoutes.CREATE_QUIZ} element={<CreateQuizPage/>} />

        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}