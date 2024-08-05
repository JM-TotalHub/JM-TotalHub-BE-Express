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

const chatService = new ChatService();

class ChatController {
  constructor() {}

  async chatRoomDetails(req, res) {
    const { chatRoomId } = req.params;
    const userId = req.user.id;
    const chatRoom = await chatService.findChatRoom(userId, chatRoomId);
    res.status(200).json(chatRoom);
  }

  async chatRoomList(req, res) {
    const queryData = req.query;
    const userId = req.user.id;
    const chatRoomList = await chatService.findChatRoomList(userId, queryData);
    res.status(200).json(chatRoomList);
  }

  async chatRoomAdd(req, res) {
    const bodyData = req.body;
    const { id, email, nickname, loginType, roleType } = req.user;
    const userData = { id, email, nickname, loginType, roleType };
    const createdChatRoom = await chatService.createChatRoom(
      userData,
      bodyData
    );
    res.status(201).json(createdChatRoom);
  }
}

export default ChatController;
