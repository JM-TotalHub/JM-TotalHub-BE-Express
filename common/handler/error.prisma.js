// /**
//  * ======================================================================
//  * @파일    error.prisma.js
//  * @담당    박준모
//  * @생성일     2024-06-14
//  * @수정일     ---
//  * @기능    prisma 오류 처리 함수들 모듈
//  * @설명
//  * isPrismaError : 예외가 prisma 관련 에러인지 구별하는 함수
//  * handlePrismaError : prisma 관련 에러에 대해 예외를 발생시켜주는 함수
//  * ======================================================================
//  */

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client';
import * as CustomError from '../error/custom-errors';

// Prisma 오류를 확인하는 함수
export function isPrismaError(error) {
  return (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientValidationError
  );
}

// Prisma 오류를 처리하는 함수 (미적용 중)
export function handlePrismaError(error) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // 고유 제약 조건 위반 오류
        throw new CustomError.DataBaseError(
          '고유 제약 조건 위반 오류 (Unique constraint violation) => ' +
            error.message
        );
      case 'P2025':
        // 레코드를 찾을 수 없음 오류
        throw new CustomError.DataBaseError(
          '레코드를 찾을 수 없음 오류 (Record not found) => ' + error.message
        );
      case 'P2003':
        // 외래 키 제약 조건 위반 오류
        throw new CustomError.DataBaseError(
          '외래 키 제약 조건 위반 오류 (Foreign key constraint violation) => ' +
            error.message
        );
      case 'P2004':
        // 잘못된 데이터베이스 연결 오류
        throw new CustomError.DataBaseError(
          '잘못된 데이터베이스 연결 오류 (Invalid database connection) => ' +
            error.message
        );
      default:
        // 알려진 기타 데이터베이스 오류
        throw new CustomError.DataBaseError(
          '알려진 기타 데이터베이스 오류 (Known database error) => ' +
            error.message
        );
    }
  } else if (error instanceof PrismaClientUnknownRequestError) {
    // 알 수 없는 요청 오류
    throw new CustomError.DataBaseError(
      '알 수 없는 요청 오류 (Unknown request error) => ' + error.message
    );
  } else if (error instanceof PrismaClientRustPanicError) {
    // Prisma 엔진 패닉 오류
    throw new CustomError.DataBaseError(
      'Prisma 엔진 패닉 오류 (Prisma engine panic) => ' + error.message
    );
  } else if (error instanceof PrismaClientInitializationError) {
    // Prisma 초기화 오류
    throw new CustomError.DataBaseError(
      'Prisma 초기화 오류 (Prisma initialization error) => ' + error.message
    );
  } else if (error instanceof PrismaClientValidationError) {
    // Prisma 검증 오류
    throw new CustomError.DataBaseError(
      'Prisma 검증 오류 (Prisma validation error) => ' + error.message
    );
  } else {
    // 예상치 못한 Prisma 오류
    throw new CustomError.DataBaseError(
      '예상치 못한 Prisma 오류 (Unexpected Prisma error) => ' + error.message
    );
  }
}
