import { type QuestionType } from "./QuestionType";

type Option = {
    text: string;
    isCorrect: boolean;
};

type Question = {
    text: string;
    type: QuestionType;
    correctAnswer?: string; // only INPUT
    options?: Option[]; // BOOLEAN + CHECKBOX
};

type QuizForm = {
    title: string;
    userId: string;
    questions: Question[];
};

export { type QuizForm }