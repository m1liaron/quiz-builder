import { z } from "zod";

export const zodValidate =
    <T>(schema: z.ZodType<T>) =>
        (values: T) => {
            const result = schema.safeParse(values);
            if (result.success) return {};

            const errors: Record<string, string> = {};
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    errors[err.path[0] as string] = err.message;
                }
            });

            return errors;
        };