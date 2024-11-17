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

async function findUserPostList(userId, queryData) {
  return await PostRepository.findUserPostListByUserId(userId, queryData);
}

export {
  findPostList,
  createPost,
  findPost,
  updatePost,
  deletePost,
  findUserPostList,
};
