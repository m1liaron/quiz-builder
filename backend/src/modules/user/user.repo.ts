import { User, type UserCreationAttributes, type UserAttributes } from "./user.model";


const createUser = async (data: UserCreationAttributes): Promise<User> => {
    return User.create(data);
};

const getUserById = async (id: string): Promise<User | null> => {
    return await User.findByPk(id);
};

const getUser = async (where: Partial<UserAttributes>): Promise<User | null> => {
    return await User.findOne({ where });
};

export { createUser, getUserById, getUser };