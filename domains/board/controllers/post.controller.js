import * as PostService from '../services/post.service';

async function postList(req, res) {
  console.log('여기 지나감2');

  const { boardId } = req.params;
  const queryData = req.query;
  const postList = await PostService.findPostList(boardId, queryData);
  res.status(200).json(postList);
}

async function postAdd(req, res) {
  const { boardId } = req.params;
  const postData = req.body;
  const userId = req.user.id;

  const createdPost = await PostService.createPost(userId, boardId, postData);
  res.status(201).json(createdPost);
}

async function postDetails(req, res) {
  console.log('여기 지나감3');

  const { postId } = req.params;
  const post = await PostService.findPost(postId);
  res.status(200).json(post);
}

async function postModify(req, res) {
  const { postId } = req.params;
  const bodyData = req.body;
  const modifiedPost = await PostService.updatePost(postId, bodyData);
  res.status(200).json(modifiedPost);
}

async function postRemove(req, res) {
  const { postId } = req.params;
  await PostService.deletePost(postId);
  res.status(204).send();
}

async function postUserList(req, res) {
  console.log('여기 지나감1');
  const userId = req.user.id;

  // const { boardId } = req.params;

  const queryData = req.query;
  const postList = await PostService.findUserPostList(userId, queryData);
  res.status(200).json(postList);
}

export { postList, postAdd, postDetails, postModify, postRemove, postUserList };
