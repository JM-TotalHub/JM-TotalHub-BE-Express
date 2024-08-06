/**
 * ======================================================================
 * @파일    chat.service.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 서비스 모듈
 * @설명
 * ---
 * ======================================================================
 */

import Api from '../../../common/utils/connection/api';
import ChatRepository from '../repositories/chat.repository';

const chatRepository = new ChatRepository();
const api = new Api();

class ChatService {
  constructor() {}

  async findChatRoom(userId, chatRoomId) {
    return await chatRepository.findChatRoomById(chatRoomId);
  }

  async findChatRoomList(userId, queryData) {
    return await chatRepository.findChatRoomList(userId, queryData);
  }

  async createChatRoom(userData, bodyData) {
    const createdChatRoom = await chatRepository.insertChatRoom(
      userData,
      bodyData
    );

    const createChatRoomMember = await chatRepository.insertChatRoomMember(
      userData,
      createdChatRoom
    );

    return createdChatRoom;
  }

  async joinChatRoom(userData, chatRoomId) {
    const chatRoomData =
      await chatRepository.findChatRoomWhitMembersById(chatRoomId);

    const isMember = chatRoomData.chat_room_members.some(
      (member) => member.user_id === userData.id
    );

    // 채팅방 첫 참가인 경우 참가인원으로 추가
    if (!isMember) {
      await chatRepository.insertChatRoomMember(userData, chatRoomData);
    }

    api.signalApi.post(`/chats/chat-rooms/${chatRoomId}`, {
      userData,
      chatRoomData,
    });
  }
}

export default ChatService;
