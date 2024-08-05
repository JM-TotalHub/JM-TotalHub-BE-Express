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

class ChatRepository {
  constructor() {}

  async findChatRoomById(userId, chatRoomId) {
    return await prisma.chat_room.findUniqueOrThrow({
      where: {
        id: Number(chatRoomId),
      },
    });
  }

  async findChatRoomList(userId, queryData) {
    const {
      pageNum,
      dataPerPage,
      searchType,
      searchText,
      sortField,
      sortOrder,
    } = queryData;

    // 사용자가 참여 중인 채팅방 ID 목록 json 형태
    const memberRooms = await prisma.chat_room_member.findMany({
      where: {
        user_id: userId,
      },
      select: {
        chat_room_id: true,
      },
    });

    // 채팅방 ID 목록 배열
    const chatRoomIds = memberRooms.map((member) => member.chat_room_id);

    let where = {
      id: {
        in: chatRoomIds, // 사용자가 참여 중인 방 필터링
      },
      chat_type: {
        in: ['one_on_one', 'private', 'public'], // 원하는 방 타입 필터링
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
  }

  async insertChatRoom(userData, bodyData) {
    const { id: user_id } = userData;
    const { name, description, chat_type } = bodyData;
    return await prisma.chat_room.create({
      data: {
        name,
        description,
        chat_type,
        user_id: Number(user_id),
      },
    });
  }

  async insertChatRoomMember(userData, chatRoomData) {
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
  }
}

export default ChatRepository;
