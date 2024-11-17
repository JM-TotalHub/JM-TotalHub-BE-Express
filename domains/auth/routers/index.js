import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper';

import * as AuthController from '../controllers/auth.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';

const authRouter = express.Router();

// TODO: 검증로직 추가 필요

authRouter.post('/sign-up', errorWrapper(AuthController.userSingUp));
authRouter.post('/sign-in', errorWrapper(AuthController.userSingIn));
authRouter.post('/sign-out', errorWrapper(AuthController.userSingOut));
authRouter.post(
  '/new-token',
  errorWrapper(AuthController.NewAccessTokenGenerate)
);
authRouter.get(
  '/user-info',
  jwtAuthMiddleware,
  errorWrapper(AuthController.userInfo)
);

authRouter.put(
  '/password',
  jwtAuthMiddleware,
  errorWrapper(AuthController.userPasswordModify)
);

export default authRouter;
