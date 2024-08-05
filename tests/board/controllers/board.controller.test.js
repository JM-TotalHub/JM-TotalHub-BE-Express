import request from 'supertest';
import app from '../../../app';
import * as boardService from '../../../domains/board/services/board.service';
import { PrismaClientKnownRequestError } from '@prisma/client';

// Mock 데이터
const mockBoardList = [
  { id: 1, name: 'Board 1', description: 'Description 1' },
  { id: 2, name: 'Board 2', description: 'Description 2' },
];
const mockBoard = { id: 1, name: 'Board 1', description: 'Description 1' };

// Mock Service 설정
jest.mock('../../../domains/board/services/board.service');

// describe 는 테스트 그룹화
// testsm
describe('Board Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('게시판 목록 조회 - GET /boards', () => {
    test('should return board list', async () => {
      boardService.findBoardList.mockResolvedValue(mockBoardList);

      const response = await request(app).get('/boards');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBoardList);
      expect(boardService.findBoardList).toHaveBeenCalled();
    });
  });

  describe('게시판 단일 조회 - GET /boards/:boardId', () => {
    test('should return board details', async () => {
      boardService.findBoard.mockResolvedValue(mockBoard);

      const response = await request(app).get('/boards/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBoard);
      expect(boardService.findBoard).toHaveBeenCalledWith('1');
    });

    // 실패 시 테스트
    test('[실패] 게시판 단일 조회 / 없는 게시판 조회 시 - GET /boards/:boardId', async () => {
      const error = new PrismaClientKnownRequestError(
        'No board found',
        'P2025',
        '2.0.0'
      );
      boardService.findBoard.mockRejectedValue(error);

      const response = await request(app).get('/boards/10');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        'Prisma(DataBase) error message': 'No board found',
      });
    });
  });

  describe('게시판 생성 - POST /boards', () => {
    test('should create a new board', async () => {
      const newBoard = { name: 'New Board', description: 'New Description' };
      const createdBoard = { id: 3, ...newBoard };
      boardService.createBoard.mockResolvedValue(createdBoard);

      const response = await request(app).post('/boards').send(newBoard);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdBoard);
      expect(boardService.createBoard).toHaveBeenCalledWith(newBoard);
    });
  });

  describe('게시판 수정 - PUT /boards/:boardId', () => {
    test('should update a board', async () => {
      const updatedBoard = {
        id: 1,
        name: 'Updated Board',
        description: 'Updated Description',
      };
      boardService.updateBoard.mockResolvedValue(updatedBoard);

      const response = await request(app)
        .put('/boards/1')
        .send({ name: 'Updated Board', description: 'Updated Description' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedBoard);
      expect(boardService.updateBoard).toHaveBeenCalledWith('1', {
        name: 'Updated Board',
        description: 'Updated Description',
      });
    });
  });

  describe('게시판 삭제 - DELETE /boards/:boardId', () => {
    test('should delete a board', async () => {
      boardService.deleteBoard.mockResolvedValue();

      const response = await request(app).delete('/boards/1');

      expect(response.status).toBe(204);
      expect(boardService.deleteBoard).toHaveBeenCalledWith('1');
    });
  });
});
