import { HTTPError } from "@src/libs/exceptions/exceptions";
import { StatusCodes } from "http-status-codes";
import { encrypt } from "@src/libs/modules/encrypt";
import { userService } from "@src/modules/user/user.service";
import type { UserCreationAttributes } from "@src/modules/user/user.model";
import { jwtToken } from "@src/libs/modules/token";
import { SignInResponse } from "@src/libs/types/types";

type AuthPayload = {
    email: string;
    password: string;
};

const register = async (data: UserCreationAttributes): Promise<SignInResponse> => {
    const user = await userService.create(data);
    const token = await jwtToken.createJWTToken({ id: user.id, email: user.email });

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
    };
}

const login = async ({ email, password }: AuthPayload): Promise<SignInResponse> => {
    const user = await userService.getByEmail(email);

    if (!user) {
        throw new HTTPError({
            status: StatusCodes.UNAUTHORIZED,
            message: "Invalid credentials",
        });
    }

    const isMatch = await encrypt.compare(password, user.password);

    if (!isMatch) {
        throw new HTTPError({
            status: StatusCodes.UNAUTHORIZED,
            message: "Invalid credentials",
        });
    }

    const token = await jwtToken.createJWTToken({ id: user.id, email: user.email });

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
    };
}

export { register, login };