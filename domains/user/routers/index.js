import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper';

import * as UserController from '../controllers/user.controller';

const userRouter = express.Router();

// userRouter.post('/login',
//     errorWrapper(UserController.))
