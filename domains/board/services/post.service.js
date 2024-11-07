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
