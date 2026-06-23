import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@src/libs/exceptions/exceptions";
import { createQuiz, findAllQuizzes, findQuizById, deleteQuiz } from "./quiz.repository";
import { type Quiz } from "./quiz.model";
import { type QuizCreationAttributes } from "./quiz.model";

const create = async (data: QuizCreationAttributes): Promise<Quiz> => {
    return createQuiz(data);
};

const getAll = async (): Promise<Quiz[]> => {
    return findAllQuizzes();
};

const getById = async (id: string): Promise<Quiz> => {
    const quiz = await findQuizById(id);

    if (!quiz) {
        throw new HTTPError({
            status: StatusCodes.NOT_FOUND,
            message: `Quiz does not exist`,
        });
    }

    return quiz;
};

const remove = async (id: string): Promise<void> => {
    await getById(id); 
    await deleteQuiz(id);
};

export { create, getAll, getById, remove };