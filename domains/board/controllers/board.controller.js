import * as BoardService from '../services/board.service';

async function boardList(req, res) {
  const boardList = await BoardService.findBoardList();
  res.status(200).json(boardList);
}

async function boardDetails(req, res) {
  const { boardId } = req.params;
  const board = await BoardService.findBoard(boardId);
  res.status(200).json(board);
}

async function boardAdd(req, res) {
  const boardData = req.body;
  const createdBoard = await BoardService.createBoard(boardData);
  res.status(201).json(createdBoard);
}

async function boardModify(req, res) {
  const { boardId } = req.params;
  const boardData = req.body;
  const modifiedBoard = await BoardService.updateBoard(boardId, boardData);
  res.status(200).json(modifiedBoard);
}

async function boardRemove(req, res) {
  const { boardId } = req.params;
  await BoardService.deleteBoard(boardId);
  res.status(204).send();
}

export { boardList, boardDetails, boardAdd, boardModify, boardRemove };
