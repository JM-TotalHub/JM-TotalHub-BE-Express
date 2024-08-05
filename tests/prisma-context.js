import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const createMockContext = () => {
  return {
    prisma: mockDeep(),
  };
};

export { createMockContext };
