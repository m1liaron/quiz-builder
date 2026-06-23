import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@src/libs/exceptions/exceptions";
import { findAllQuizzes, findQuizById, deleteQuiz } from "./quiz.repository";
import { Quiz } from "./quiz.model";
import { sequelize } from "@src/libs/modules/database/sequelize";
import { Question } from "../question/question.model";
import { Option } from "../option/option.model";
import { CreateQuizDTO } from "./libs/types/create-quiz-dto.type";

const create = async (data: CreateQuizDTO) => {
    return sequelize.transaction(async (t) => {

        const quiz = await Quiz.create(
            { title: data.title, userId: data.userId },
            { transaction: t }
        );

        for (const q of data.questions) {
            const question = await Question.create(
                {
                    quizId: quiz.id,
                    text: q.text,
                    type: q.type,
                    correctAnswer: q.correctAnswer ?? null,
                },
                { transaction: t }
            );

            if (q.type !== "INPUT" && q.options?.length) {
                await Option.bulkCreate(
                    q.options.map(opt => ({
                        questionId: question.id,
                        text: opt.text,
                        isCorrect: opt.isCorrect,
                    })),
                    { transaction: t }
                );
            }
        }

        return quiz;
    });
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