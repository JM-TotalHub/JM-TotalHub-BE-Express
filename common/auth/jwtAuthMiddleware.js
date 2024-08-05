import passport from './passport-config.js';

const jwtAuthMiddleware = (req, res, next) => {
  // err : 인증과정 오류 - 데이터베이스 연결, 코드오류, 인증과 관계없는 부분의 에러
  // user : 인증이 완료되면 사용자 정보 반환
  // info : 인증 실패 - 토큰등의 문제로 인증고 ㅏ관련있는 부분의 에러 (name, message 등을 속성으로 갖는다.)
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(401).json({
        err: err,
        message: '사용자 인증확인 중 에러발생',
      });
    }
    console.log('passport 에러 발생 안함 : ' + user);
    if (user) {
      req.user = user;
      next();
    } else {
      if (info && info.name === 'TokenExpiredError') {
        console.log('토큰 만료됨');
        return res.status(401).json({
          err: info.name,
          message: 'Access Token 기간 만료',
        });
      } else {
        return res.status(401).json({
          err: info.name,
          message: '인증내용에 문제 발생',
        });
      }
    }
  })(req, res, next);
};
export default jwtAuthMiddleware;
