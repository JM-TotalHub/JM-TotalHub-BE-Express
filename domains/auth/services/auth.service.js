import ENV from '../../../common/utils/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as AuthRepository from '../repositories/auth.repository';
import getExpirationInSeconds from '../../../common/utils/expireTime';

import RedisManager from '../../../common/connection/redisManager';

const redisClient = RedisManager.getClient();

export async function signUpUser(bodyData) {
  const { password } = bodyData;
  const hashedPassword = await bcrypt.hash(password, 10);
  bodyData.password = hashedPassword;

  return await AuthRepository.insertUser(bodyData);
}

export async function signInUser(bodyData) {
  const { email, password } = bodyData;

  const user = await AuthRepository.findUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // expiresIn 기준 https://github.com/vercel/ms

  // prettier-ignore
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname, loginType: user.loginType, roleType: user.roleType }, 
    ENV.JWT_SECRET_KEY01, 
    {expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRATION,
  });

  // prettier-ignore
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname, loginType: user.loginType, roleType: user.roleType }, 
    ENV.JWT_SECRET_KEY01, 
    {expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRATION,}
  );

  await redisClient.set(
    `refreshToken:${user.id}`,
    refreshToken,
    'EX',
    getExpirationInSeconds(ENV.JWT_REFRESH_TOKEN_EXPIRATION)
  );

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      loginType: user.loginType,
      roleType: user.roleType,
    },
  };
}

export async function generateNewAccessToken(oldAccessToken) {
  let oldPayload = null;

  if (!oldAccessToken) {
    return;
  }

  try {
    oldPayload = jwt.verify(oldAccessToken, ENV.JWT_SECRET_KEY01);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // 토큰이 만료된 경우
      oldPayload = jwt.decode(oldAccessToken);
      // oldPayload를 사용하여 새로운 토큰을 발급하는 로직을 추가합니다.
    } else if (error.name === 'JsonWebTokenError') {
      // 토큰이 유효하지 않은 경우
      throw new Error('Invalid Access Token: ' + error.message);
    } else {
      // 다른 에러 발생 시
      throw new Error('Token verification failed: ' + error.message);
    }
  }

  console.log('oldPayload : ', oldPayload);

  if (oldPayload == null) return;

  const refreshToken = await redisClient.get(`refreshToken:${oldPayload.id}`);

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  try {
    jwt.verify(refreshToken, ENV.JWT_SECRET_KEY01);
  } catch (error) {
    // 여기서 TokenExpiredError 으로 리플래쉬토큰 만료 처리 필요
    throw new Error('Invalid refresh token: ' + error.name);
  }

  const newAccessToken = jwt.sign(
    { id: oldPayload.id, email: oldPayload.email },
    ENV.JWT_SECRET_KEY01,
    { expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRATION }
  );

  return newAccessToken;
}

export async function getUserInfo(token) {
  console.log('동작중');
  let payload = null;
  try {
    payload = jwt.verify(token, ENV.JWT_SECRET_KEY01);
  } catch (error) {
    console.log(error.name);
    return error;
  }

  console.log(`payload : ${payload}`);

  const userInfo = await AuthRepository.findUserByUserId(payload.id);

  console.log(`유저정보 서비스 로직 : ${userInfo}`);
  console.log(userInfo);

  return userInfo;
}
