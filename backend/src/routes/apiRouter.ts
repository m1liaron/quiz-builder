import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import { authRouter } from '@src/modules/auth/auth.route';


const apiRouter = Router();

apiRouter.use(Paths.Auth._, authRouter);

export default apiRouter;
