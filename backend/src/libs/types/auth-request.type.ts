import { type Request } from "express";

interface AuthRequest<
    Body = unknown,
    Params = unknown,
    Query = unknown
> extends Request<Params, any, Body, Query> {
    user: {
        id: string;
        email: string
    };
}

export { type AuthRequest };