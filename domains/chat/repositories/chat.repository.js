/**
 * ======================================================================
 * @파일    chat.repository.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 레포지토리 모듈
 * @설명
 * ---
 * ======================================================================
 */

import prisma from '../../../prisma';

const findChatRoomById = async (chatRoomId) => {
  console.log('이거 호출됨 서비스 레포지토리');

  return await prisma.chat_room.findUniqueOrThrow({
    where: {
      id: Number(chatRoomId),
    },
  });
};

const findChatRoomWithMembersById = async (chatRoomId) => {
  return await prisma.chat_room.findUniqueOrThrow({
    where: {
      id: Number(chatRoomId),
    },
    include: {
      chat_room_members: true,
    },
  });
};

// 나중에 채팅방 리스트 필터링에 적용
const findChatRoomsWithFilters = async (userId) => {
  const memberRooms = await prisma.chat_room_member.findMany({
    where: {
      user_id: userId,
    },
    select: {
      chat_room_id: true,
    },
  });

  // 채팅방 ID 목록 배열
  return memberRooms.map((member) => member.chat_room_id);
};

const findChatRoomList = async (userId, queryData) => {
  const { pageNum, dataPerPage, searchType, searchText, sortField, sortOrder } =
    queryData;

  // 유저 참가 채팅방 id 리스트 배열
  const chatRoomIds = await findChatRoomsWithFilters(userId);

  let where = {
    id: {
      // in: chatRoomIds, // 사용자가 참여 중인 방 필터링
    },
    chat_type: {
      in: ['one_to_one', 'private', 'public'], // 원하는 방 타입 필터링
    },
  };

  if (searchType && searchText) {
    where[searchType] = {
      contains: searchText,
    };
  }

  const chatRoomList = await prisma.chat_room.findMany({
    skip: (pageNum - 1) * dataPerPage,
    take: dataPerPage,
    where,
    orderBy: {
      [sortField]: sortOrder,
    },
  });

  const totalDataCount = await prisma.chat_room.count({ where });
  const totalPage = Math.ceil(totalDataCount / dataPerPage);

  return {
    chatRoomList,
    totalPage,
    pageNum,
  };
};

const insertChatRoom = async (userData, bodyData) => {
  const { id: user_id } = userData;
  const { name, description, chatType: chat_type } = bodyData;
  return await prisma.chat_room.create({
    data: {
      name,
      description,
      chat_type,
      user_id: Number(user_id),
    },
  });
};

const deleteChatRoom = async (chatRoomId) => {
  return await prisma.chat_room.delete({
    where: {
      id: Number(chatRoomId), // chatRoomId 조건
    },
  });
};

const updateChatRoom = async (chatRoomId, bodyData) => {
  console.log('채팅방 수정 chatRoomId : ', chatRoomId, 'bodyData : ', bodyData);

  const { name, description, chat_type } = bodyData;
  return await prisma.chat_room.update({
    where: {
      id: Number(chatRoomId),
    },
    data: {
      name,
      description,
      chat_type,
    },
  });
};

const insertChatRoomMember = async (userData, chatRoomData) => {
  const { id: user_id, email, nickname, loginType, roleType } = userData;
  const { id: chat_room_id } = chatRoomData;
  return await prisma.chat_room_member.create({
    data: {
      email,
      nickname,
      loginType,
      roleType,
      chat_room_id: Number(chat_room_id),
      user_id: Number(user_id),
    },
  });
};

const findRecentChatRoomMessages = async (chatRoomId, amount) => {
  return await prisma.chat_message.findMany({
    where: {
      chat_room_id: Number(chatRoomId),
    },
    orderBy: {
      created_at: 'desc',
    },
    take: amount,
  });
};

const insertChatRoomMessages = async (chatRoomId, messages) => {
  const chatRoomMessages = messages.map((message) => ({
    content: message.message,
    user: {
      connect: { id: Number(message.userId) }, // user_id로 연결
    },
    chat_room: {
      connect: { id: Number(chatRoomId) },
    },
    created_at: new Date(message.createdAt),
  }));

  // 트랜잭션을 사용해 모든 메시지를 한 번에 저장
  const createdMessages = await prisma.$transaction(
    chatRoomMessages.map((message) =>
      prisma.chat_message.create({ data: message })
    )
  );

  console.log('DB 저장된 채팅 메시지:', createdMessages);
  return createdMessages;
};

const findChatRoomMessages = async (chatRoomId, lastMessageId, messageNum) => {
  console.log('레포지토리 => ', chatRoomId, lastMessageId, messageNum);

  return await prisma.chat_message.findMany({
    where: {
      chat_room_id: Number(chatRoomId),
      id: {
        lt: lastMessageId ? Number(lastMessageId) : undefined, // lastMessageId보다 작은 메시지
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: Number(messageNum),
  });
};

const ChatRepository = {
  findChatRoomById,
  findChatRoomWithMembersById,
  findChatRoomsWithFilters,
  findChatRoomList,
  insertChatRoom,
  deleteChatRoom,
  updateChatRoom,
  insertChatRoomMember,
  findRecentChatRoomMessages,
  insertChatRoomMessages,
  findChatRoomMessages,
};

export default ChatRepository;
