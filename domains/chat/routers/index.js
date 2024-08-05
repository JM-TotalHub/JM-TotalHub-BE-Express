import express from 'express';

import errorWrapper from '../../../common/error/error-wrapper';

import ChatController from '../controllers/chat.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';
import validationMiddleware from '../../../common/middleware/validation';

import * as chatDto from '../dto/chat.dto';

const chatRouter = express.Router();
const chatController = new ChatController();

chatRouter.get(
  '/chat-rooms/:chatRoomId',
  jwtAuthMiddleware,
  errorWrapper(chatController.chatRoomDetails)
);

chatRouter.get(
  '/chat-rooms',
  jwtAuthMiddleware,
  validationMiddleware(chatDto.ChatRoomListDto),
  errorWrapper(chatController.chatRoomList)
);

chatRouter.post(
  '/chat-rooms',
  jwtAuthMiddleware,
  errorWrapper(chatController.chatRoomAdd)
);

export default chatRouter;
