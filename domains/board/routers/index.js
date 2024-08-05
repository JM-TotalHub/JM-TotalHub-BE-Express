import express from 'express';

import boardRouter from './board.router';
import * as PostRouter from './post.router';
import * as CommentRouter from './comment.router';

const router = express.Router();

// 세부 도메인 분류

// 게시판
router.use('/', boardRouter);

// 게시글
router.use('/posts', PostRouter.postRouter);
router.use('/:boardId/posts', PostRouter.postWithBoardIdRouter);

// 댓글
router.use('/comments', CommentRouter.commentRouter);
router.use('/posts/:postId/comments', CommentRouter.commentWithPostIdRouter);

export default router;
