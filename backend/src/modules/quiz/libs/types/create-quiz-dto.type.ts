import { CreateQuestionDTO } from "./create-question-dto.type";

export interface CreateQuizDTO {
    title: string;
    userId: string;
    questions: CreateQuestionDTO[];
}