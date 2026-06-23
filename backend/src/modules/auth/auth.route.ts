import { Router } from "express";
import * as authController from "./auth.controller";
import Paths from "@src/common/constants/Paths";

const authRouter = Router();

authRouter.post(Paths.Auth.Register, authController.register);
authRouter.post(Paths.Auth.Login, authController.login);

export { authRouter };