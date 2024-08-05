import escapeHtml from 'escape-html';

const escapeHtmlMiddleware = (req, res, next) => {
  const escapeObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = escapeHtml(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // 객체 내부 내용에 대해서도 적용
        escapeObject(obj[key]);
      }
    }
  };

  escapeObject(req.body);
  escapeObject(req.query);
  escapeObject(req.params);

  next();
};

export default escapeHtmlMiddleware;
