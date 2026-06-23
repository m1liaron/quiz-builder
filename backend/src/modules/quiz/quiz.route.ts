import { Router } from "express";
import { createQuizSchema, quizIdSchema } from "./quiz.schema";
import * as quizController from "./quiz.controller";
import { validate } from "@src/middlewares";
import { Paths } from "@src/libs/constants";

const quizRouter = Router();

quizRouter.post(Paths.Quiz.CREATE_QUIZ, validate(createQuizSchema), quizController.create);
quizRouter.get(Paths.Quiz.GET_ALL_QUIZZES, quizController.getAll);
quizRouter.get(Paths.Quiz.GET_BY_ID_QUIZ, validate(quizIdSchema), quizController.getById);
quizRouter.delete(Paths.Quiz.DELETE_QUIZ, validate(quizIdSchema), quizController.remove);

export { quizRouter };