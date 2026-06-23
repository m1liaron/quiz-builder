import z from "zod";


const optionSchema = z.object({
    text: z.string().min(1),
    isCorrect: z.boolean(),
});

export { optionSchema };