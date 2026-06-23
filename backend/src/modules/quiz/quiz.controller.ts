import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as quizService from "./quiz.service";
import { AuthRequest } from "@src/libs/types/auth-request.type";
import { CreateQuizDTO } from "./libs/types/create-quiz-dto.type";

const create = async (req: AuthRequest<CreateQuizDTO>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const quiz = await quizService.create({ ...req.body, userId: req.user.id});
        res.status(StatusCodes.CREATED).json(quiz);
    } catch (err) {
        next(err);
    }
};

const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const quizzes = await quizService.getAll();
        res.status(StatusCodes.OK).json(quizzes);
    } catch (err) {
        next(err);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const quiz = await quizService.getById(req.params["id"] as string);
        res.status(StatusCodes.OK).json(quiz);
    } catch (err) {
        next(err);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await quizService.remove(req.params["id"] as string);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
};

export { create, getAll, getById, remove };