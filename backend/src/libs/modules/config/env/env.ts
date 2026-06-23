import { ZodError } from 'zod';
import { envSchema } from './env.config';

const formatZodError = (error: ZodError): never => {
    const messages = error.issues.map((e) => {
        const path = e.path.length ? `[${e.path.join(".")}]` : "[root]";
        return `  ${path}: ${e.message}`;
    });

    throw new Error(
        `\n\n❌ Invalid environment variables:\n${messages.join("\n")}\n`
    );
};

export const ENV = (() => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) formatZodError(result.error);
    return result.data!;
})();