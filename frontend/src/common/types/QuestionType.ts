
const QuestionTypes = {
    BOOLEAN: 'BOOLEAN',
    INPUT: 'INPUT',
    CHECKBOX: 'CHECKBOX',
} as const;


type QuestionType =
    (typeof QuestionTypes)[keyof typeof QuestionTypes];

export { type QuestionType, QuestionTypes }