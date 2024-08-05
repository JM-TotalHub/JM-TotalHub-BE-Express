import { PrismaClient } from '@prisma/client';
import redisClient from '../../../common/utils/redisClient';

const prisma = new PrismaClient();

async function findTestList() {
  return await prisma.test.findMany();
}

async function createTest(data) {
  const { title, content } = data;
  return await prisma.test.create({
    data: {
      title,
      content,
    },
  });
}

async function updateTest(testId, data) {
  const { title, content } = data;
  return await prisma.test.update({
    where: {
      id: Number(testId),
    },
    data: {
      title,
      content,
    },
  });
}

async function deleteTest(testId) {
  return await prisma.test.delete({
    where: {
      id: Number(testId),
    },
  });
}

// Redis�� ����ϴ� �Լ�
async function getFromCache(key) {
  try {
    const data = await redisClient.get(key);
    return data;
  } catch (err) {
    console.error('Error getting data from Redis:', err);
    throw err;
  }
}

async function setToCache(key, value) {
  try {
    await redisClient.set(key, value);
  } catch (err) {
    console.error('Error setting data in Redis:', err);
    throw err;
  }
}

export {
  findTestList,
  createTest,
  updateTest,
  deleteTest,
  getFromCache,
  setToCache,
};
