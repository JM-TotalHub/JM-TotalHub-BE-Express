import ENV from './common/utils/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

// app
const app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: 'http://10.1.10.191',
    // origin: 'http://15.164.36.109',
    // origin: `http://${ENV.REACT_LOCAL_HOST}:${ENV.REACT_LOCAL_PORT}`,
    credentials: true,
  })
);
app.use(cookieParser());

// 쿠키 로그 미들웨어
app.use((req, res, next) => {
  console.log('모든 요청의 쿠키 내용:', req.cookies);
  console.log('accessToken : ', req.cookies['accessToken']);
  next(); // 다음 미들웨어로 이동
});

// JWT 인증 미들웨어 - 필요시 적용
// const excludedPaths = ['/tests'];
// app.use(jwtAuthMiddleware(excludedPaths));

// 라우터 (도메인 분류)
import authRouter from './domains/auth/routers';
import boardRouter from './domains/board/routers';
import chatRouter from './domains/chat/routers/index.js';
import testRouter from './domains/test/routers/test.router.js';

app.use('/auth', authRouter);
app.use('/tests', testRouter);
app.use('/boards', boardRouter);
app.use('/chats', chatRouter);
app.get('/connect-test', (req, res) => {
  res.send('서버 연결 완료');
});

// 예외처리 미들웨어
import morgan from 'morgan';
import errorHandler from './common/handler/error.js';
app.use(errorHandler);

// 서버구동
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 테스트 코드에서 사용할 app 객체를 모듈로 내보냄
export default app;
