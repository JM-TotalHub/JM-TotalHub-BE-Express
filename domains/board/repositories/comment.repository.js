/**
 * ======================================================================
 * @파일    comment.repository.js
 * @담당    박준모
 * @생성일  2024-06-19
 * @수정일  ---
 * @기능    comment(댓글) 관련 레포지토리 모듈
 * @설명
 * ---
 * ======================================================================
 */

import prisma from '../../../prisma';

async function findCommentListByPostId(postId, queryData) {
  const { pageNum, dataPerPage, searchType, searchText, sortField, sortOrder } =
    queryData;

  let where = {
    post_id: Number(postId),
  };

  if (searchType && searchText) {
    where[searchType] = {
      contains: searchText,
    };
  }

  const commentList = await prisma.comment.findMany({
    skip: (pageNum - 1) * dataPerPage,
    take: dataPerPage,
    where,
    orderBy: {
      [sortField]: sortOrder,
    },
  });

  const totalDataCount = await prisma.comment.count({ where });
  const totalPage = Math.ceil(totalDataCount / dataPerPage);

  return {
    commentList,
    totalPage,
    pageNum,
  };
}

async function findCommentById(commentId) {
  return await prisma.comment.findUniqueOrThrow({
    where: {
      id: Number(commentId),
    },
  });
}

async function insertComment(postId, bodyData) {
  const { content } = bodyData;

  return await prisma.comment.create({
    data: {
      content,
      post_id: Number(postId),
    },
  });
}

async function updateComment(commentId, bodyData) {
  const { content } = bodyData;

  return await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      content,
    },
  });
}

async function deleteComment(commentId) {
  return await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
}

export {
  findCommentListByPostId,
  findCommentById,
  insertComment,
  updateComment,
  deleteComment,
};
