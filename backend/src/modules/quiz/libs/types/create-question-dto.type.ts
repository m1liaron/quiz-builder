import { QuestionType } from "@src/libs/enums";
import { CreateOptionDTO } from "./create-option-dto.type";

export interface CreateQuestionDTO {
    text: string;
    type: QuestionType;

    // only for INPUT
    correctAnswer?: string;

    // for BOOLEAN + CHECKBOX
    options?: CreateOptionDTO[];
}