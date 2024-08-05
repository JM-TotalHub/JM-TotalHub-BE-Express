/**
 * ======================================================================
 * @파일    post.repository.js
 * @담당    박준모
 * @생성일  2024-06-18
 * @수정일  ---
 * @기능    post(게시글) 관련 레포지토리 모듈
 * @설명
 * ---
 * ======================================================================
 */

import prisma from '../../../prisma';

async function findPostListByBoardId(boardId, queryData) {
  const { pageNum, dataPerPage, searchType, searchText, sortField, sortOrder } =
    queryData;

  let where = {
    board_id: Number(boardId),
  };

  if (searchType && searchText) {
    where[searchType] = {
      contains: searchText,
    };
  }

  const postList = await prisma.post.findMany({
    skip: (pageNum - 1) * dataPerPage,
    take: dataPerPage,
    where,
    orderBy: {
      [sortField]: sortOrder,
    },
  });

  const totalDataCount = await prisma.post.count({ where });
  const totalPage = Math.ceil(totalDataCount / dataPerPage);

  return {
    postList,
    totalPage,
    pageNum,
  };
}

async function insertPost(userId, boardId, bodyData) {
  const { title, content } = bodyData;
  return await prisma.post.create({
    data: {
      title,
      content,
      board_id: Number(boardId),
      user_id: Number(userId),
    },
  });
}

async function findPostById(postId) {
  return await prisma.post.findUniqueOrThrow({
    where: {
      id: Number(postId),
    },
  });
}

async function updatePost(postId, bodyData) {
  const { title, content } = bodyData;
  return await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      content,
    },
  });
}

async function deletePost(postId) {
  return await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
}

export {
  findPostListByBoardId,
  insertPost,
  findPostById,
  updatePost,
  deletePost,
};
