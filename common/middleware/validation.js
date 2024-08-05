const validationMiddleware = (dto) => {
  return (req, res, next) => {
    const { body, query, params } = dto;
    const errors = [];

    const validateAndCollectErrors = (schema, data, fieldType) => {
      if (schema) {
        const { error, value } = schema.validate(data, { abortEarly: false });
        if (error) {
          error.details.forEach((detail) => {
            errors.push({
              field_type: fieldType,
              field_name: detail.path.join('.'),
              message: detail.message,
            });
          });
        }
        // 검증 과저 중 값 변환이 있는경우(ex. trim)
        return value;
      }
      // 검증 작업만 있어 원본 값 그대로 전달되는경우
      return data;
    };

    // 전달값에 저장
    req.body = validateAndCollectErrors(body, req.body, 'body');
    req.query = validateAndCollectErrors(query, req.query, 'query');
    req.params = validateAndCollectErrors(params, req.params, 'params');

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};

export default validationMiddleware;
