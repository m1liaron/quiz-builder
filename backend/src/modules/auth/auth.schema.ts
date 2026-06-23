import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(4).max(30),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export { registerSchema, loginSchema };