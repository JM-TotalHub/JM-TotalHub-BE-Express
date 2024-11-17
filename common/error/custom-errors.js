class CustomError extends Error {
  constructor(errorType, message, statusCode) {
    super(message);
    this.errorType = errorType;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends CustomError {
  constructor(
    errorType = 'NotFoundError',
    message = 'Resource not found',
    statusCode = 404
  ) {
    super(errorType, message, statusCode);
  }
}

class DataBaseError extends CustomError {
  constructor(
    errorType = 'DataBaseError',
    message = 'Database error',
    statusCode = 500
  ) {
    super(errorType, message, statusCode);
  }
}

class ValidationError extends CustomError {
  constructor(
    errorType = 'ValidationError',
    message = 'Validation error',
    statusCode = 400
  ) {
    super(errorType, message, statusCode);
  }
}

class UnauthorizedError extends CustomError {
  constructor(
    errorType = 'UnauthorizedError',
    message = 'Unauthorized',
    statusCode = 401
  ) {
    super(errorType, message, statusCode);
  }
}

class AccountError extends CustomError {
  constructor(
    errorType = 'AccountError',
    message = 'Account error',
    statusCode = 400
  ) {
    super(errorType, message, statusCode);
  }
}

export {
  CustomError,
  NotFoundError,
  DataBaseError,
  ValidationError,
  UnauthorizedError,
  AccountError,
};
