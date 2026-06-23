import { Router } from 'express';

import { Paths } from "@src/libs/constants";
import { authRouter } from '@src/modules/auth/auth.route';
import { quizRouter } from '@src/modules/quiz/quiz.route';
import { authMiddleware } from '@src/middlewares';


const apiRouter = Router();

apiRouter.use(Paths.Auth._, authRouter);
apiRouter.use(Paths.Quiz._, authMiddleware, quizRouter);

export default apiRouter;
