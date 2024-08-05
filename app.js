import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// 환경 변수 설정
dotenv.config();

// app
const app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: `${process.env.REACT_URL}:${process.env.REACT_PORT}`, // 클라이언트 도메인
    credentials: true, // 쿠키를 포함한 요청 허용
  })
);
app.use(cookieParser());

// JWT 인증 미들웨어(제외할 경로만 써넣기)
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
