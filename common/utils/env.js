// config.js
import dotenv from 'dotenv';
dotenv.config(); // 환경 변수 로드

const isProd = process.env.EXPRESS_SERVER_ENV_STATUS === 'prod';

const ENV = {
  // 엔진엑스 관련
  NGINX_SERVER_EC2_HOST: process.env.NGINX_SERVER_EC2_HOST,

  // 시그널 서버 api (배포: 엔진 엑스 서버/ 개발: 로컬 시그널 서버)
  NGINX_SERVER_EC2_HOST: isProd
    ? `http://${process.env.NGINX_SERVER_EC2_HOST}`
    : `http://${process.env.SIGNAL_LOCAL_HOST}:${process.env.SIGNAL_LOCAL_PORT}`,

  // Express 서버 데이터베이스 관련
  EXPRESS_SERVER01_DATABASE_URL: process.env.EXPRESS_SERVER01_DATABASE_URL,

  // Express 서버 레디스 관련
  EXPRESS_SERVER01_REDIS_URL: process.env.EXPRESS_SERVER01_REDIS_URL,
  EXPRESS_SERVER01_REDIS_PASSWORD: process.env.EXPRESS_SERVER01_REDIS_PASSWORD,
  EXPRESS_SERVER01_REDIS_PORT: process.env.EXPRESS_SERVER01_REDIS_PORT,

  // JWT 관련
  JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_SECRET_KEY01: process.env.JWT_SECRET_KEY01,

  //  <<<<< 개발환경 추가 변수 >>>>>
  // 리액트 서버 관련
  REACT_LOCAL_HOST: process.env.REACT_LOCAL_HOST,
  REACT_LOCAL_PORT: process.env.REACT_LOCAL_PORT,
  // 시그널 서버 관련
  SIGNAL_LOCAL_HOST: process.env.SIGNAL_LOCAL_HOST,
  SIGNAL_LOCAL_PORT: process.env.SIGNAL_LOCAL_PORT,
};

export default ENV;
