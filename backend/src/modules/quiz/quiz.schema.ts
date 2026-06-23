import { z } from "zod";

const createQuizSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(100)
    }),
});

const quizIdSchema = z.object({
    params: z.object({
        id: z.uuid()
    }),
});

const QuizResponseSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export { createQuizSchema, quizIdSchema, QuizResponseSchema };