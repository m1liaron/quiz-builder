import { HTTPError } from "@src/libs/exceptions/exceptions";
import { StatusCodes } from "http-status-codes";
import { createUser, getUser, getUserById } from "./user.repository";
import type { UserAttributes, UserCreationAttributes } from "./user.model";

const userService = {
    async create(data: UserCreationAttributes): Promise<UserAttributes> {
        const existing = await getUser({ email: data.email });

        if (existing) {
            throw new HTTPError({
                status: StatusCodes.CONFLICT,
                message: "User with this email already exists",
            });
        }

        return createUser(data);
    },

    async getById(id: string): Promise<UserAttributes> {
        const user = await getUserById(id);

        if (!user) {
            throw new HTTPError({
                status: StatusCodes.NOT_FOUND,
                message: "User not found",
            });
        }

        return user;
    },

    async getByEmail(email: string): Promise<UserAttributes | null> {
        return getUser({ email });
    },
};

export { userService };