import { CustomError } from '../error/custom-errors';
import { isPrismaError, handlePrismaError } from './error.prisma';

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (isPrismaError(err)) {
    res.status(500).json({ 'Prisma(DataBase) error message': err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
