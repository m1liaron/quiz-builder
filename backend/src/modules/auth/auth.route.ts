import { Router } from "express";
import * as authController from "./auth.controller";
import { Paths } from "@src/libs/constants";

const authRouter = Router();

authRouter.post(Paths.Auth.Register, authController.register);
authRouter.post(Paths.Auth.Login, authController.login);

export { authRouter };