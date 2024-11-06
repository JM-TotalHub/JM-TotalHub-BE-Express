import * as UserService from '../services/user.service';

export async function userDetails(req, res) {
  console.log(req);

  const { userId } = req.params;
  const userInfo = await UserService.findUser(userId);
  res.status(200).json(userInfo);
}
