/**
 * ======================================================================
 * @파일    board.service.js
 * @담당    박준모
 * @생성일  2024-06-12
 * @수정일  2024-06-14
 * @기능    board(게시판) 관련 서비스로직 모듈
 * @설명
 * ---
 * ======================================================================
 */

import * as BoardRepository from '../repositories/board.repository';

async function findBoardList() {
  return await BoardRepository.findBoardList();
}

async function findBoard(boardId) {
  return await BoardRepository.findBoardById(boardId);
}

async function createBoard(bodyData) {
  return await BoardRepository.insertBoard(bodyData);
}

async function updateBoard(boardId, bodyData) {
  return await BoardRepository.updateBoard(boardId, bodyData);
}

async function deleteBoard(boardId) {
  return BoardRepository.deleteBoard(boardId);
}

export { findBoard, findBoardList, createBoard, updateBoard, deleteBoard };
