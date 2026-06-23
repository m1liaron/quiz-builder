import * as jose from 'jose';

import { SECRET_JWT_KEY } from './index';
import { JwtTokenPayload } from '@src/libs/types/types';
import { HTTPError } from '@src/libs/exceptions/exceptions';
import { ENV } from '@src/libs/modules/config/env/env';
import { StatusCodes } from 'http-status-codes';

class JWToken {
    public createJWTToken({ email, id }: JwtTokenPayload): Promise<string> {
        return new jose.SignJWT({ email, id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime(ENV.JWT_LIFETIME)
            .sign(SECRET_JWT_KEY);
    }

    public async verifyJWTToken(token: string): Promise<JwtTokenPayload> {
        try {
            const { payload } = await jose.jwtVerify(token, SECRET_JWT_KEY, {
                algorithms: ['HS256']
            });

            if (
                typeof payload['email'] !== 'string' ||
                typeof payload['id'] !== 'string'
            ) {
                throw new HTTPError({ message: 'Invalid token payload', status: StatusCodes.UNAUTHORIZED });
            }

            return payload as JwtTokenPayload;
        } catch (error) {
            throw new HTTPError({
                message:
                    error instanceof Error ? error.message : 'Invalid or expired JWT',
                status: StatusCodes.UNAUTHORIZED
            });
        }
    }
}

export { JWToken };
