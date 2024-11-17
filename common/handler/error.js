import { CustomError } from '../error/custom-errors';
import { isPrismaError, handlePrismaError } from './error.prisma';

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({ errorType: err.errorType, message: err.message });
  } else if (isPrismaError(err)) {
    res.status(500).json({
      errorType: err.errorType,
      'Prisma(DataBase) error message': err.message,
    });
  } else {
    res
      .status(500)
      .json({ errorType: err.errorType, message: 'Internal Server Error' });
  }
};

export default errorHandler;
