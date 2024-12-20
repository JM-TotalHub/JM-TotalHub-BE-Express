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
  console.log('이거 호출됨 서비스 컨트롤러');
  // console.log(req);

  const { chatRoomId } = req.params;
  const userId = req.user.id;
  const chatRoom = await ChatService.findChatRoom(userId, chatRoomId);
  res.status(200).json(chatRoom);
};

const chatRoomList = async (req, res) => {
  const userId = req.user.id;
  const queryData = req.query;

  console.log('컨트롤러');
  console.log(userId);
  console.log(queryData);

  const chatRoomList = await ChatService.findChatRoomList(userId, queryData);
  res.status(200).json(chatRoomList);
};

const chatRoomAdd = async (req, res) => {
  const bodyData = req.body;
  console.log('req : ', req);
  console.log('bodyData : ', bodyData);

  const { id, email, nickname, loginType, roleType } = req.user;
  const userData = { id, email, nickname, loginType, roleType };
  const createdChatRoom = await ChatService.createChatRoom(userData, bodyData);
  res.status(201).json(createdChatRoom);
};

const chatRoomRemove = async (req, res) => {
  const { chatRoomId } = req.params;
  await ChatService.deleteChatRoom(chatRoomId);

  res.status(204).send('aa');
};
// async function postModify(req, res) {
//   const { postId } = req.params;
//   const bodyData = req.body;
//   const modifiedPost = await PostService.updatePost(postId, bodyData);
//   res.status(200).json(modifiedPost);
// }

const chatRoomModify = async (req, res) => {
  const { chatRoomId } = req.params;
  const { bodyData } = req.body;
  const updatedChatRoom = await ChatService.updateChatRoom(
    chatRoomId,
    bodyData
  );
  res.status(200).json(updatedChatRoom);
};

const chatRoomJoin = async (req, res) => {
  const { id, email, nickname, loginType, roleType } = req.user;
  const userData = { id, email, nickname, loginType, roleType };

  const { chatRoomId } = req.params;

  const chatRoomData = await ChatService.joinChatRoom(userData, chatRoomId);
  res.status(201).json(chatRoomData);
};

const chatRoomMessageAdd = async (req, res) => {
  console.log('메시지 저장 로직 들어옴', req.body);

  const { chatRoomId, messages } = req.body;

  await ChatService.createChatRoomMessages(chatRoomId, messages);

  res.status(201).send({ message: '메시지 저장 완료' }); // 응답 추가
};

const chatRoomMessageList = async (req, res) => {
  console.log('메시지 조회 로직 들어옴', req.query);

  const { chatRoomId, lastMessageId, messageNum } = req.query;

  const messages = await ChatService.findChatRoomMessageList(
    chatRoomId,
    lastMessageId,
    messageNum
  );

  res.status(201).json(messages); // 응답 추가
};

const ChatController = {
  chatRoomDetails,
  chatRoomList,
  chatRoomAdd,
  chatRoomRemove,
  chatRoomModify,
  chatRoomJoin,
  chatRoomMessageAdd,
  chatRoomMessageList,
};

export default ChatController;
