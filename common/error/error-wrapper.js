// 컨트롤러 결과 감싸
// 1. 예외 미 발생 시: 서비스코드의 async 비동기 결과물이 Promise로 전달된 Promise.resolve는 그대로 Promise 객체로 반환
// 2. 예외 발생 시 : 서비스 코드에서 예외가 발생하고 컨트롤러를 통해 래퍼함수에 예외가 전돨되어 catch문이 발동해 예외처리 미들웨어로 전달
const errorWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default errorWrapper;
