import { ENV } from '@src/common/config/env/env';
import { JWToken } from './token.module';

const jwtToken = new JWToken();

const SECRET_JWT_KEY = new TextEncoder().encode(ENV.JWT_SECRET);

export { jwtToken, SECRET_JWT_KEY };
