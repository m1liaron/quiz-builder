import type { QuestionType } from "./QuestionType";

type Option = {
    id: string
    text: string;
    isCorrect: boolean;
};

type Question = {
    id: string
    text: string;
    type: QuestionType;
    correctAnswer?: string; // only INPUT
    options?: Option[]; // BOOLEAN + CHECKBOX
};

type Quiz = {
    id: string;
    title: string;
    questions: Question[];
}

export { type Quiz }