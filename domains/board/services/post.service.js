/**
 * ======================================================================
 * @파일    post.service.js
 * @담당    박준모
 * @생성일  2024-06-18
 * @수정일  ---
 * @기능    post(게시글) 관련 서비스 모듈
 * @설명
 * ---
 * ======================================================================
 */

import * as PostRepository from '../repositories/post.repository';

async function findPostList(boardId, queryData) {
  return await PostRepository.findPostListByBoardId(boardId, queryData);
}

async function createPost(userId, boardId, postData) {
  return await PostRepository.insertPost(userId, boardId, postData);
}

async function findPost(postId) {
  return await PostRepository.findPostById(postId);
}

async function updatePost(postId, bodyData) {
  return await PostRepository.updatePost(postId, bodyData);
}

async function deletePost(postId) {
  return await PostRepository.deletePost(postId);
}

export { findPostList, createPost, findPost, updatePost, deletePost };
