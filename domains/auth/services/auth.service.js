import ENV from '../../../common/utils/env';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as AuthRepository from '../repositories/auth.repository';
import getExpirationInSeconds from '../../../common/utils/expireTime';

import RedisManager from '../../../common/connection/redisManager';
import {
  AccountError,
  UnauthorizedError,
} from '../../../common/error/custom-errors';

const redisClient = RedisManager.getClient();

export async function signUpUser(bodyData) {
  const { password } = bodyData;
  const hashedPassword = await bcrypt.hash(password, 10);
  bodyData.password = hashedPassword;

  // 일단 강제로 회원로그인 & 일반사용자을 강제
  // admin은 따로 DB에 직접 입력하는 방식으로 부여
  bodyData.loginType = 'normal';
  bodyData.roleType = 'normal';

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
      throw new UnauthorizedError(
        'Invalid Access Token',
        'Invalid Access Token: ' + error.message
      );
    } else {
      // 다른 에러 발생 시
      throw new UnauthorizedError(
        'Token verification failed',
        'Token verification failed: ' + error.message
      );
    }
  }

  // console.log('oldPayload : ', oldPayload);

  if (oldPayload == null) return;

  const refreshToken = await redisClient.get(`refreshToken:${oldPayload.id}`);

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  try {
    jwt.verify(refreshToken, ENV.JWT_SECRET_KEY01);
  } catch (error) {
    // 여기서 TokenExpiredError 으로 리플래쉬토큰 만료 처리 필요
    throw new UnauthorizedError(
      'Invalid refresh token',
      'Invalid refresh token: ' + error.name
    );
  }

  const newAccessToken = jwt.sign(
    { id: oldPayload.id, email: oldPayload.email },
    ENV.JWT_SECRET_KEY01,
    { expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRATION }
  );

  return newAccessToken;
}

export async function getUserInfo(userId) {
  const userInfo = await AuthRepository.findUserByUserId(userId);

  return userInfo;
}

export async function UpdateUserPassword(userId, currentPassword, newPassword) {
  const hashedUserPassword =
    await AuthRepository.findUserPasswordByUserId(userId);

  const isMatch = await bcrypt.compare(currentPassword, hashedUserPassword);
  if (!isMatch) {
    throw new AccountError(
      'INVALID_CURRENT_PASSWORD',
      '비밀번호 변경 - 기존 비밀번호가 정확하지 않습니다.'
    );
  }

  const isSamePassword = await bcrypt.compare(newPassword, hashedUserPassword);
  if (isSamePassword) {
    throw new AccountError(
      'SAME_AS_CURRENT_PASSWORD',
      '비밀번호 변경 - 새 비밀번호가 현재 비밀번호와 같습니다.'
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await AuthRepository.UpdateUserPassword(userId, hashedNewPassword);

  return true;
}
