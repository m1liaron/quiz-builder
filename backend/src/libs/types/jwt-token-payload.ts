import { type JWTPayload } from 'jose';

type JwtTokenPayload = JWTPayload & {
    email: string;
    id: string;
};

export { type JwtTokenPayload };
