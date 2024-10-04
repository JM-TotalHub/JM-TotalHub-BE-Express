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

import api from '../../../common/connection/api';
import ChatRepository from '../repositories/chat.repository';

const findChatRoom = async (userId, chatRoomId) => {
  return await ChatRepository.findChatRoomById(chatRoomId);
};

const findChatRoomList = async (userId, queryData) => {
  return await ChatRepository.findChatRoomList(userId, queryData);
};

const createChatRoom = async (userData, bodyData) => {
  const createdChatRoom = await ChatRepository.insertChatRoom(
    userData,
    bodyData
  );

  await ChatRepository.insertChatRoomMember(userData, createdChatRoom);

  return createdChatRoom;
};

const joinChatRoom = async (userData, chatRoomId) => {
  const chatRoomData =
    await ChatRepository.findChatRoomWithMembersById(chatRoomId);

  const isMember = chatRoomData.chat_room_members.some(
    (member) => member.user_id === userData.id
  );

  // 채팅방 첫 참가인 경우 참가인원으로 추가 (나중에 여기서 public / private 나뉠 듯 - 현재는 public만 고려)
  if (!isMember) {
    await ChatRepository.insertChatRoomMember(userData, chatRoomData);
  }

  // 시그널 서버에 참가 정보 전달
  const signalResponse = await api.post(`/chats/chat-rooms/${chatRoomId}`, {
    userData,
    chatRoomData,
  });

  console.log('signalResponse.data : ', signalResponse.data);

  // 시그널 서버의 채팅방 정보와 DB에서 최근 30개의 메시지 가져오기
  const recentMessages = await ChatRepository.findRecentChatRoomMessages(
    chatRoomId,
    30
  );

  // Redis에서 가져온 메시지와 DB에서 가져온 메시지 결합
  const totalRecentMessages = [
    ...signalResponse.data.chatRoomMessages, // Redis에서 가져온 메시지
    ...recentMessages, // DB에서 가져온 최근 메시지
  ];

  // 최종 응답 구성(레디스 최신 + DB 최근 메시지30개)
  const response = {
    chatRoomInfo: signalResponse.data.chatRoomInfo,
    chatRoomMembers: signalResponse.data.chatRoomMembers,
    chatRoomMessages: totalRecentMessages,
    chatRoomVideoMembers: signalResponse.data.chatRoomVideoMembers,
  };

  return response;
};

const ChatService = {
  findChatRoom,
  findChatRoomList,
  createChatRoom,
  joinChatRoom,
};

export default ChatService;
