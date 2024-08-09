import express from 'express';

import errorWrapper from '../../../common/error/error-wrapper';

import ChatController from '../controllers/chat.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';
import validationMiddleware from '../../../common/middleware/validation';

import * as chatDto from '../dto/chat.dto';

const chatRouter = express.Router();

// 단순 채팅방 조회
chatRouter.get(
  '/chat-rooms/:chatRoomId',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomDetails)
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
  validationMiddleware(chatDto.ChatRoomListDto),
  errorWrapper(ChatController.chatRoomList)
);

// 채팅방 생성
chatRouter.post(
  '/chat-rooms',
  jwtAuthMiddleware,
  errorWrapper(ChatController.chatRoomAdd)
);

export default chatRouter;
