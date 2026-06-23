import { Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "@src/libs/modules/database/sequelize";
import { User } from "../user/user.model";

interface QuizAttributes {
    id: string;
    title: string;
    userId: string;
}

type QuizCreationAttributes = Optional<QuizAttributes, "id">;

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
    public id!: string;
    public title!: string;
    public userId!: string;
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
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