import * as PostRepository from '../repositories/post.repository';

async function findPostList(boardId, queryData) {
  return await PostRepository.findPostListByBoardId(boardId, queryData);
}

async function createPost(userId, boardId, postData) {
  return await PostRepository.insertPost(userId, boardId, postData);
}

async function findPost(postId, userId) {
  return await PostRepository.findPostById(postId, userId);
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

async function createPostLike(userId, postId, type, action) {
  if (type === 'like') {
    if (action === 'add') {
      return await PostRepository.insertPostLike(userId, postId);
    } else if (action === 'delete') {
      return await PostRepository.deletePostLike(userId, postId);
    }
  } else if (type === 'dislike') {
    if (action === 'add') {
      return await PostRepository.insertPostDislike(userId, postId);
    } else if (action === 'delete') {
      return await PostRepository.deletePostDislike(userId, postId);
    }
  }

  return false;
}

export {
  findPostList,
  createPost,
  findPost,
  updatePost,
  deletePost,
  findUserPostList,
  createPostLike,
};
