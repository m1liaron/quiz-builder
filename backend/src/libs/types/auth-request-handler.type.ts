import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth-request.type";

type AuthRequestHandler<T = any> = (
    req: AuthRequest<T>,
    res: Response,
    next: NextFunction
) => void;

export { type AuthRequestHandler };