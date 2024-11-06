import * as UserRepository from '../repositories/user.repository';

export const findUser = async (userId) => {
  return await UserRepository.findUserById(userId);
};
