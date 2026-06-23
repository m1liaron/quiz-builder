import z from "zod";
import { optionSchema } from "../option/option.schema";

const questionSchema = z.object({
    text: z.string().min(1),
    type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
    correctAnswer: z.string().optional(), // for INPUT type only
    options: z.array(optionSchema).optional(), // for BOOLEAN or CHECKBOX
}).refine(
    (q) => {
        if (q.type === "INPUT") {
            return !!q.correctAnswer && !q.options;
        }

        if (q.type === "BOOLEAN") {
            return (
                q.options?.length === 2 &&
                q.options.every(o => typeof o.isCorrect === "boolean")
            );
        }

        if (q.type === "CHECKBOX") {
            return (q.options?.length ?? 0) > 0;
        }

        return false;
    },
    {
        message: "Invalid question structure for given type",
    }
);

export { questionSchema };