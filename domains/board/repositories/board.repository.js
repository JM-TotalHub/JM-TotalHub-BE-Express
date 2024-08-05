// src/repositories/board.repository.js
import prisma from '../../../prisma';

async function findBoardList() {
  return await prisma.board.findMany();
}

async function findBoardById(boardId) {
  return await prisma.board.findUniqueOrThrow({
    where: {
      id: Number(boardId),
    },
  });
}

async function insertBoard(bodyData) {
  const { name, description } = bodyData;
  return await prisma.board.create({
    data: {
      name,
      description,
    },
  });
}

async function updateBoard(boardId, bodyData) {
  const { name, description } = bodyData;
  return await prisma.board.update({
    where: {
      id: Number(boardId),
    },
    data: {
      name,
      description,
    },
  });
}

async function deleteBoard(boardId) {
  return await prisma.board.delete({
    where: {
      id: Number(boardId),
    },
  });
}

export { findBoardList, findBoardById, insertBoard, updateBoard, deleteBoard };
