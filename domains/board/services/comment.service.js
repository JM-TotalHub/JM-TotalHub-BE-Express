/**
 * ======================================================================
 * @파일    comment.service.js
 * @담당    박준모
 * @생성일  2024-06-19
 * @수정일  ---
 * @기능    comment(댓글) 관련 서비스 모듈
 * @설명
 * ---
 * ======================================================================
 */

import * as CommentRepository from '../repositories/comment.repository';

async function findCommentList(postId, queryData) {
  return await CommentRepository.findCommentListByPostId(postId, queryData);
}

async function findComment(commentId) {
  return await CommentRepository.findCommentById(commentId);
}

async function createComment(postId, bodyData) {
  return await CommentRepository.insertComment(postId, bodyData);
}

async function updateComment(commentId, bodyData) {
  return await CommentRepository.updateComment(commentId, bodyData);
}

async function deleteComment(commentId) {
  return await CommentRepository.deleteComment(commentId);
}

export {
  findCommentList,
  findComment,
  createComment,
  updateComment,
  deleteComment,
};
