import { NextFunction } from "express";

import { HTTPError } from "@src/libs/exceptions/exceptions";
import { jwtToken } from "@src/libs/modules/token";
import { AuthRequest } from "@src/libs/types/types";
import { getUserById } from "@src/modules/user/user.repo";


const authMiddleware = async (req: AuthRequest, _res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw HTTPError.unauthorized("Authentication invalid, user not found");
        }
        const token = authHeader.split(" ")[1];

        try {
            const decoded = await jwtToken.verifyJWTToken(token)
            const user = await getUserById(decoded.id)
            if (!user) {
                throw HTTPError.unauthorized("Authentication invalid, user not found");
            }
            req.user = { id: decoded.id, email: decoded.email };

            next();
        } catch (error) {
            if (error instanceof Error) {
                throw HTTPError.unauthorized(
                    "Authentication invalid, user not found: " + error.message,
                );
            }
        }
}

export { authMiddleware };