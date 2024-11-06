import prisma from '../../../prisma';

export const findUserById = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      loginType: true,
      roleType: true,
      created_at: true,
    },
  });

  return user;
};
