import { ENV } from '@src/common/config/env/env';
import { Encrypt } from './encrypt.module.js';

const encrypt = new Encrypt(ENV.BCRYPT_SALT_ROUNDS);

export { encrypt };
