import { NextFunction, Response, Request } from "express";

import { HTTPError } from "@src/libs/exceptions/exceptions";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const errorHandlerMiddleware = (err: Error, _: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: "Validation failed",
            errors: err.issues.map((e) => ({
                path: e.path.slice(1).join("."),
                message: e.message,
            })),
        });
        return;
    }
    
    if (err instanceof HTTPError) {
        res.status(err.status).json({
            error: true,
            message: err.message,
        });
        return;
    }

    
    const message =
        err instanceof Error ? err.message : "Internal server error";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message });
}

export { errorHandlerMiddleware };