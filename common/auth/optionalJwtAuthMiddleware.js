import passport from './passport-config.js';

const optionalAuthMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('JWT 검증 중 에러 발생:', err);
      return next(); // 인증 오류가 발생해도 요청 계속 처리
    }

    if (user) {
      req.user = user; // 유저 정보 추가
    } else {
      req.user = null; // 유저 정보 없음
    }

    next(); // 인증 여부에 상관없이 요청 진행
  })(req, res, next);
};

export default optionalAuthMiddleware;
