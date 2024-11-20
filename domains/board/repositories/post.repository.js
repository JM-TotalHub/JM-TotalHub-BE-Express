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

import { DataBaseError } from '../../../common/error/custom-errors';
import prisma from '../../../prisma';

async function findPostListByBoardId(boardId, queryData) {
  const {
    pageNum,
    dataPerPage,
    searchType,
    searchText,
    sortField = 'created_at',
    sortOrder = 'asc',
  } = queryData;

  let where = {
    board_id: Number(boardId),
  };

  if (searchType && searchText.trim()) {
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
    include: {
      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
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
  // 조회수 증가
  await prisma.post.update({
    where: { id: Number(postId) },
    data: { view_count: { increment: 1 } }, // viewCount가 조회수를 저장하는 필드라고 가정
  });

  // 게시글 찾기
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: Number(postId),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
      // likes와 dislikes 개수만 포함
      _count: {
        select: {
          likes: true,
          dislikes: true,
        },
      },
    },
  });

  return {
    ...post,
    likesCount: post._count.likes,
    dislikesCount: post._count.dislikes,
  };
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

async function findUserPostListByUserId(userId, queryData) {
  const {
    pageNum = 1,
    dataPerPage = 10,
    boardId,
    searchType = ' ',
    searchText = ' ',
    sortField = 'created_at',
    sortOrder = 'asc',
  } = queryData;

  let where = {
    user_id: Number(userId),
  };

  if (boardId) {
    where.board_id = Number(boardId);
  }

  if (searchType && searchText.trim()) {
    where[searchType] = {
      contains: searchText,
    };
  }

  const postList = await prisma.post.findMany({
    skip: (pageNum - 1) * dataPerPage,
    take: Number(dataPerPage),
    where,
    orderBy: {
      [sortField]: sortOrder,
    },
    include: {
      board: {
        select: {
          id: true,
          name: true,
        },
      },
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

async function insertPostLike(userId, postId) {
  const existingLike = await prisma.post_like.findUnique({
    where: {
      user_id_post_id: {
        user_id: userId,
        post_id: postId,
      },
    },
  });

  if (!existingLike) {
    await prisma.post_like.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    });
  } else {
    throw new DataBaseError(
      '게시글 좋아요 추가 Error',
      '이미 좋아요한 게시글 입니다.'
    );
  }

  return true;
}

async function deletePostLike(userId, postId) {
  const existingLike = await prisma.post_like.findUnique({
    where: {
      user_id_post_id: {
        user_id: userId,
        post_id: postId,
      },
    },
  });

  if (existingLike) {
    await prisma.post_like.delete({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: postId,
        },
      },
    });
  } else {
    throw new DataBaseError(
      '게시글 좋아요 제거 Error',
      '좋아요 하지 않은 게시글 입니다.'
    );
  }

  return true;
}

async function insertPostDislike(userId, postId) {
  const existingLike = await prisma.post_dislike.findUnique({
    where: {
      user_id_post_id: {
        user_id: userId,
        post_id: postId,
      },
    },
  });

  if (!existingLike) {
    await prisma.post_dislike.create({
      data: {
        user_id: userId,
        post_id: postId,
      },
    });
  } else {
    throw new DataBaseError(
      '게시글 싫어요 Error',
      '이미 싫어요한 게시글 입니다.'
    );
  }
  return true;
}

async function deletePostDislike(userId, postId) {
  const existingLike = await prisma.post_dislike.findUnique({
    where: {
      user_id_post_id: {
        user_id: userId,
        post_id: postId,
      },
    },
  });

  if (existingLike) {
    await prisma.post_dislike.delete({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: postId,
        },
      },
    });
  } else {
    throw new DataBaseError(
      '게시글 싫어요 제거 Error',
      '싫어요 하지 않은 게시글 입니다.'
    );
  }

  return true;
}

export {
  findPostListByBoardId,
  insertPost,
  findPostById,
  updatePost,
  deletePost,
  findUserPostListByUserId,
  insertPostLike,
  deletePostLike,
  insertPostDislike,
  deletePostDislike,
};
