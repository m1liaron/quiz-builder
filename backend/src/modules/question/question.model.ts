import { Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { sequelize } from "@src/libs/modules/database/sequelize";
import { QuestionType } from "@src/libs/enums";

interface QuestionAttributes {
    id: string;
    quizId: string;
    text: string;
    type: QuestionType;
    correctAnswer: string | null;
}



type QuestionCreationAttributes = Optional<
    QuestionAttributes,
    'id' | 'correctAnswer'
>;

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    public id!: string;
    public quizId!: string;
    declare text: string;
    declare type: QuestionType;
    declare correctAnswer: string | null;
}

Question.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        quizId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(
                QuestionType.BOOLEAN,
                QuestionType.INPUT,
                QuestionType.CHECKBOX
            ),
            allowNull: false,
        },
        correctAnswer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Question",
        tableName: "Questions",
        timestamps: true,
    },
);

export { Question };
export type { QuestionAttributes, QuestionCreationAttributes };