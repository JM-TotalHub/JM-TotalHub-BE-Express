import prisma from '../../../prisma';

export async function insertUser(bodyData) {
  const { email, password, nickname, loginType, roleType } = bodyData;
  return await prisma.user.create({
    data: {
      email,
      password,
      nickname,
      loginType,
      roleType,
    },
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });
}

export async function findUserByUserId(userId) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      roleType: true,
      loginType: true,
    },
  });
}
