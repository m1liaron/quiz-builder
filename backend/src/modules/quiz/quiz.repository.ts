import { Quiz } from "./quiz.model";
import { type QuizCreationAttributes } from "./quiz.model";

const createQuiz = async (data: QuizCreationAttributes): Promise<Quiz> => {
    return Quiz.create(data);
};

const findAllQuizzes = async (): Promise<Quiz[]> => {
    return Quiz.findAll();
};

const findQuizById = async (id: string): Promise<Quiz | null> => {
    return Quiz.findByPk(id, {
        include: [
            {
                association: "questions",
                include: [
                    {
                        association: "options",
                    },
                ],
            },
        ],
    });
};

const deleteQuiz = async (id: string): Promise<void> => {
    await Quiz.destroy({ where: { id } });
};

export { createQuiz, findAllQuizzes, findQuizById, deleteQuiz };