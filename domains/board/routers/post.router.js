import express from 'express';

import escapeHtmlMiddleware from '../../../common/middleware/escape-html';
import validationMiddleware from '../../../common/middleware/validation';
import errorWrapper from '../../../common/error/error-wrapper';

import * as PostController from '../controllers/post.controller';
import * as PostDto from '../dto/post.dto';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';

// => boards/posts
const postRouter = express.Router();
// => boards/{boardId}/posts
const postWithBoardIdRouter = express.Router({ mergeParams: true });

postWithBoardIdRouter.get(
  '/',
  validationMiddleware(PostDto.PostListDto),
  errorWrapper(PostController.postList)
);

postWithBoardIdRouter.post(
  '/',
  jwtAuthMiddleware,
  escapeHtmlMiddleware,
  validationMiddleware(PostDto.PostCreateDto),
  errorWrapper(PostController.postAdd)
);

postRouter.get('/:postId', errorWrapper(PostController.postDetails));

postRouter.put(
  '/:postId',
  escapeHtmlMiddleware,
  validationMiddleware(PostDto.PostUpdateDto),
  errorWrapper(PostController.postModify)
);

postRouter.delete('/:postId', errorWrapper(PostController.postRemove));

export { postRouter, postWithBoardIdRouter };
