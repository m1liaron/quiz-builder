import { ENV } from '@src/common/config/env.js';
import { JWToken } from './token.module.js';

const jwtToken = new JWToken();

const SECRET_JWT_KEY = new TextEncoder().encode(ENV.JWT.JWT_SECRET);

export { jwtToken, SECRET_JWT_KEY };
