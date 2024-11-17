import express from 'express';

import errorWrapper from '../../../common/error/error-wrapper';

import ChatController from '../controllers/chat.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';
import validationMiddleware from '../../../common/middleware/validation';

import * as chatDto from '../dto/chat.dto';

const chatRouter = express.Router();

// 채팅방 생성
chatRouter.post(
  '/chat-rooms',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomAdd)
);

// 채팅방 제거
chatRouter.delete(
  '/chat-rooms/:chatRoomId',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomRemove)
);

// 채팅방 수정
chatRouter.put(
  '/chat-rooms/:chatRoomId',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomModify)
);

// 채팅방 참가
chatRouter.post(
  '/chat-rooms/:chatRoomId/join',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomJoin)
);

// 채팅방 리스트 조회
chatRouter.get(
  '/chat-rooms',
  jwtAuthMiddleware,
  // validationMiddleware(chatDto.ChatRoomListDto),
  errorWrapper(ChatController.chatRoomList)
);

// 채팅방 메시지 저장
chatRouter.post(
  '/chat-rooms/messages',
  errorWrapper(ChatController.chatRoomMessageAdd)
);

// 채팅방 메시지 추가로드
chatRouter.get(
  '/chat-rooms/messages-load',
  errorWrapper(ChatController.chatRoomMessageList)
);

// 단순 채팅방 조회
chatRouter.get(
  '/chat-rooms/:chatRoomId',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomDetails)
);

export default chatRouter;
