import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper';

import * as UserController from '../controllers/user.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';
import escapeHtmlMiddleware from '../../../common/middleware/escape-html';

const userRouter = express.Router();

userRouter.get(
  '/info',
  jwtAuthMiddleware,
  escapeHtmlMiddleware,
  errorWrapper(UserController.userDetails)
);

export default userRouter;
