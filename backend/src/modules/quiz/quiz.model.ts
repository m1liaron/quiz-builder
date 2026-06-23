import { Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "@src/libs/modules/database/sequelize";

interface QuizAttributes {
    id: string;
    title: string;
}

type QuizCreationAttributes = Optional<QuizAttributes, "id">;

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
    public id!: string;
    public title!: string;
}

Quiz.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
            },
        },
    },
    {
        sequelize,
        modelName: "Quiz",
        tableName: "Quizzes",
        timestamps: true,
    },
);

export { Quiz };
export type { QuizAttributes, QuizCreationAttributes };