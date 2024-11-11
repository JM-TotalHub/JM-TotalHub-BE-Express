import * as UserService from '../services/user.service';

export async function userDetails(req, res) {
  const userId = req.user.id;
  const userInfo = await UserService.findUser(userId);
  res.status(200).json(userInfo);
}
