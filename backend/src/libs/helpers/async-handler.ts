import type { Request, Response, NextFunction } from "express";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncController): AsyncController => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};

export { asyncHandler };