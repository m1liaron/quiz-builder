import { Router } from "express";
import { createQuizSchema, quizIdSchema } from "./quiz.schema";
import * as quizController from "./quiz.controller";
import { validate } from "@src/middlewares";
import { Paths } from "@src/libs/constants";
import { authenticatedRouter } from "@src/libs/modules/route/authenticated-router";

const { router, post, get, delete: remove } = authenticatedRouter();

post(Paths.Quiz.CREATE_QUIZ, validate(createQuizSchema), quizController.create);
get(Paths.Quiz.GET_ALL_QUIZZES, quizController.getAll);
get(Paths.Quiz.GET_BY_ID_QUIZ, validate(quizIdSchema), quizController.getById);
remove(Paths.Quiz.DELETE_QUIZ, validate(quizIdSchema), quizController.remove);

export { router as quizRouter };