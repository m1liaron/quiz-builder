import { z } from "zod";
import { questionSchema } from "../question/question.schema";

const createQuizSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(100),
        
        questions: z.array(questionSchema).min(1)
    })
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