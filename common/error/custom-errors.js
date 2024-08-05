class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message, statusCode);
  }
}

class DataBaseError extends CustomError {
  constructor(message = 'Database error', statusCode = 500) {
    super(message, statusCode);
  }
}

class ValidationError extends CustomError {
  constructor(message = 'Validation error', statusCode = 400) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized', statusCode = 401) {
    super(message, statusCode);
  }
}

export {
  CustomError,
  NotFoundError,
  DataBaseError,
  ValidationError,
  UnauthorizedError,
};
