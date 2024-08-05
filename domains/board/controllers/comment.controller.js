import * as CommentService from '../services/comment.service';

async function commentList(req, res) {
  const { postId } = req.params;
  const queryData = req.query;
  const commentList = await CommentService.findCommentList(postId, queryData);
  res.status(200).json(commentList);
}

async function commentDetails(req, res) {
  const { commentId } = req.params;
  const commentDetails = await CommentService.findComment(commentId);
  res.status(200).json(commentDetails);
}

async function commentAdd(req, res) {
  const { postId } = req.params;
  const bodyData = req.body;
  const createdComment = await CommentService.createComment(postId, bodyData);
  res.status(201).json(createdComment);
}

async function commentModify(req, res) {
  const { commentId } = req.params;
  const bodyData = req.body;
  const updatedComment = await CommentService.updateComment(
    commentId,
    bodyData
  );
  res.status(200).json(updatedComment);
}

async function commentDelete(req, res) {
  const { commentId } = req.params;
  await CommentService.deleteComment(commentId);
  res.status(204).send();
}

export {
  commentList,
  commentDetails,
  commentAdd,
  commentModify,
  commentDelete,
};
