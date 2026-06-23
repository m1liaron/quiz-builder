import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const validate =
    (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body as unknown,
            params: req.params as unknown,
            query: req.query as unknown,
        });

        if (!result.success) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: "Validation failed",
                errors: result.error.issues.map((e) => ({
                    path: e.path.slice(1).join("."),
                    message: e.message,
                })),
            });
            return;
        }

        next(result.error);
}

export { validate };
