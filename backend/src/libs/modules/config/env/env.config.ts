import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z
        .string()
        .refine(
            (port) => parseInt(port) > 0 && parseInt(port) < 65536,
            "Invalid port number"
    ),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),

    JWT_SECRET: z.string(),
    JWT_LIFETIME: z.string().default('1d'),
    BCRYPT_SALT_ROUNDS: z
        .string()
        .transform(Number)
        .refine((n) => Number.isInteger(n) && n > 0, "Must be a positive integer"),

    DATABASE_URL: z.string().url().optional(),

    // Database — development/test
    DATABASE_NAME: z.string().optional(),
    DATABASE_USER_NAME: z.string().optional(),
    DATABASE_PASSWORD: z.string().optional(),
    DB_HOST: z.string().optional(),
    DB_PORT: z
        .string()
        .transform(Number)
        .refine((n) => n > 0 && n < 65536, "Invalid port")
        .optional()
});

export { envSchema };