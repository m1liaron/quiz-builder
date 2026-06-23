import { ENV } from '@src/libs/modules/config/env/env';
import { Encrypt } from './encrypt.module';

const encrypt = new Encrypt(ENV.BCRYPT_SALT_ROUNDS);

export { encrypt };
