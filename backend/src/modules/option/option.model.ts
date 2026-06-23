import { Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { sequelize } from "@src/libs/modules/database/sequelize";
import { Question } from "../question/question";

interface OptionAttributes {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}

type OptionCreationAttributes = Optional<OptionAttributes, "id">;

class Option extends Model<OptionAttributes, OptionCreationAttributes> implements OptionAttributes {
    public id!: string;
    public text!: string;
    public questionId!: string;
    declare isCorrect: boolean;
}

Option.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
            },
        },
        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Question,
                key: 'id'
            }
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "Option",
        tableName: "Options",
        timestamps: true,
    },
);

export { Option, type OptionAttributes, type OptionCreationAttributes };