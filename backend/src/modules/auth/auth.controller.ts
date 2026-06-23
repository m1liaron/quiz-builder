import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { registerSchema, loginSchema } from "./auth.schema";
import * as authService from "./auth.service";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = registerSchema.parse(req.body);
        const result = await authService.register(body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = loginSchema.parse(req.body);
        const result = await authService.login(body);
        res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
}

export { register, login };