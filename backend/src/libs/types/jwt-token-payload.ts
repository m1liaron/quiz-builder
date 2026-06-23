import { type JWTPayload } from 'jose';

type JwtTokenPayload = JWTPayload & {
    email: string;
    id: number;
};

export { type JwtTokenPayload };
