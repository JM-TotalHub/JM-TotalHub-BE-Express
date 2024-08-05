/**
 * @파일    board.service.test.js
 * @담당    박준모
 * @생성일  2024-06-17
 * @수정일  2024-06-14
 * @기능    board(게시판) 서비스 로직 테스트
 * @설명
 */

import * as BoardService from '../../../domains/board/services/board.service';
import * as BoardRepository from '../../../domains/board/repositories/board.repository';
import * as CustomError from '../../../common/error/custom-errors';
import { isPrismaError } from '../../../common/handler/error.prisma';
import { PrismaClientKnownRequestError } from '@prisma/client';

// Jest Mock 설정
jest.mock('../../../domains/board/repositories/board.repository');
jest.mock('../../../common/handler/error.prisma');

describe('BoardService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findBoardList', () => {
    test('should return a list of boards', async () => {
      const mockBoardList = [
        { id: 1, title: 'Board 1' },
        { id: 2, title: 'Board 2' },
      ];
      BoardRepository.findBoardList.mockResolvedValue(mockBoardList);

      const result = await BoardService.findBoardList();
      expect(result).toEqual(mockBoardList);
    });
  });

  describe('findBoard', () => {
    test('should return a board by ID', async () => {
      const mockBoard = { id: 1, title: 'Board 1' };
      BoardRepository.findBoardById.mockResolvedValue(mockBoard);

      const result = await BoardService.findBoard(1);
      expect(result).toEqual(mockBoard);
    });

    test('should throw error if no board data', async () => {
      const error = new PrismaClientKnownRequestError(
        'No board found',
        'P2025',
        '2.0.0'
      );
      BoardRepository.findBoardById.mockRejectedValue(error);

      await expect(BoardService.findBoard(1)).rejects.toThrow('No board found');
    });
  });

  describe('createBoard', () => {
    test('should create a new board', async () => {
      const mockBoard = { id: 1, title: 'New Board' };
      BoardRepository.insertBoard.mockResolvedValue(mockBoard);

      const result = await BoardService.createBoard({ title: 'New Board' });
      expect(result).toEqual(mockBoard);
    });
  });

  describe('updateBoard', () => {
    test('should update a board by ID', async () => {
      const mockBoard = { id: 1, title: 'Updated Board' };
      BoardRepository.updateBoard.mockResolvedValue(mockBoard);

      const result = await BoardService.updateBoard(1, {
        title: 'Updated Board',
      });
      expect(result).toEqual(mockBoard);
    });
  });

  describe('deleteBoard', () => {
    test('should delete a board by ID', async () => {
      BoardRepository.deleteBoard.mockResolvedValue(true);

      const result = await BoardService.deleteBoard(1);
      expect(result).toBe(true);
    });
  });
});
