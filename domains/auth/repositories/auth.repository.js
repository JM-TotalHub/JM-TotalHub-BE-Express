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

export async function findUserPasswordByUserId(userId) {
  const response = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(userId),
    },
    select: {
      password: true,
    },
  });

  return response.password;
}

export async function UpdateUserPassword(userId, newHashedPassword) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newHashedPassword,
    },
  });
}
