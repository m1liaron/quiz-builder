
import type { Optional } from "sequelize";
import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { sequelize } from "@src/libs/modules/database/sequelize";
import { encrypt } from "@src/libs/modules/encrypt/index";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

type UserCreationAttributes = Optional<
    UserAttributes,
    "id"
>

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 30],
            },
        }
    },
    {
        sequelize,
        modelName: "User",
        timestamps: true,
        tableName: "Users",
    },
);

User.beforeCreate(async (userData: User) => {
    const user = userData.get();
    if (!user.password) {
        throw new Error("Password is required");
    }
    user.password = await encrypt.hash(user.password);
});


User.beforeUpdate(async (userData: User) => {
    const user = userData.get();
    if (user.password) {
        user.password = await encrypt.hash(user.password);
    }
});

export { User, type UserCreationAttributes, type UserAttributes };