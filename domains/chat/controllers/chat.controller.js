/**
 * ======================================================================
 * @파일    chat.controller.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 컨트롤러 모듈
 * @설명
 * ---
 * ======================================================================
 */

import ChatService from '../services/chat.service';

const chatRoomDetails = async (req, res) => {
  const { chatRoomId } = req.params;
  const userId = req.user.id;
  const chatRoom = await ChatService.findChatRoom(userId, chatRoomId);
  res.status(200).json(chatRoom);
};

const chatRoomList = async (req, res) => {
  const queryData = req.query;
  const userId = req.user.id;
  const chatRoomList = await ChatService.findChatRoomList(userId, queryData);
  res.status(200).json(chatRoomList);
};

const chatRoomAdd = async (req, res) => {
  const bodyData = req.body;
  const { id, email, nickname, loginType, roleType } = req.user;
  const userData = { id, email, nickname, loginType, roleType };
  const createdChatRoom = await ChatService.createChatRoom(userData, bodyData);
  res.status(201).json(createdChatRoom);
};

const chatRoomJoin = async (req, res) => {
  const { id, email, nickname, loginType, roleType } = req.user;
  const userData = { id, email, nickname, loginType, roleType };

  const { chatRoomId } = req.params;

  const chatRoomData = await ChatService.joinChatRoom(userData, chatRoomId);
  res.status(201).json(chatRoomData);
};

const ChatController = {
  chatRoomDetails,
  chatRoomList,
  chatRoomAdd,
  chatRoomJoin,
};

export default ChatController;
