import express from 'express';

import escapeHtmlMiddleware from '../../../common/middleware/escape-html';
import validationMiddleware from '../../../common/middleware/validation';
import errorWrapper from '../../../common/error/error-wrapper';

import * as CommentController from '../controllers/comment.controller';
import * as CommentDto from '../dto/comment.dto';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';

const commentRouter = express.Router();
const commentWithPostIdRouter = express.Router({ mergeParams: true });

commentWithPostIdRouter.get(
  '/',
  validationMiddleware(CommentDto.CommentListDto),
  errorWrapper(CommentController.commentList)
);

commentWithPostIdRouter.post(
  '/',
  jwtAuthMiddleware,
  escapeHtmlMiddleware,
  validationMiddleware(CommentDto.CommentCreateDto),
  errorWrapper(CommentController.commentAdd)
);

commentRouter.get(
  '/users',
  jwtAuthMiddleware,
  errorWrapper(CommentController.commentUserList)
);

commentRouter.get(
  '/:commentId',
  errorWrapper(CommentController.commentDetails)
);

commentRouter.put(
  '/:commentId',
  escapeHtmlMiddleware,
  validationMiddleware(CommentDto.CommentUpdateDto),
  errorWrapper(CommentController.commentModify)
);

commentRouter.delete(
  '/:commentId',
  errorWrapper(CommentController.commentDelete)
);

export { commentRouter, commentWithPostIdRouter };
