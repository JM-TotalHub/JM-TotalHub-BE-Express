import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper';

import * as AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

// TODO: 검증로직 추가 필요

authRouter.post('/sign-up', errorWrapper(AuthController.userSingUp));
authRouter.post('/sign-in', errorWrapper(AuthController.userSingIn));
authRouter.post(
  '/new-token',
  errorWrapper(AuthController.NewAccessTokenGenerate)
);

export default authRouter;
