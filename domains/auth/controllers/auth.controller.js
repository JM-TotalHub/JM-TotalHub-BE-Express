import * as AuthService from '../services/auth.service';

export async function userSingUp(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const createdUser = await AuthService.signUpUser(bodyData);
  res.status(201).json(createdUser);
}

export async function userSingIn(req, res) {
  const bodyData = req.body;
  const { accessToken, user } = await AuthService.signInUser(bodyData);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    // sameSite: 'None',
  });
  res.status(200).json(user);
}

export async function userSingOut(req, res) {
  const bodyData = req.body;
  res.clearCookie('accessToken');
  res.status(201).json({ message: '로그아웃되었습니다.' });
}

export async function NewAccessTokenGenerate(req, res) {
  // const headerData = req.headers;
  // const oldAccessToken = req.headers.cookie;
  const oldAccessToken = req.cookies['accessToken'];
  // console.log('들어온 접근토큰 : ' + oldAccessToken);
  const newAccessToken =
    await AuthService.generateNewAccessToken(oldAccessToken);

  if (oldAccessToken == newAccessToken) {
    console.log('토큰이 같다!!!');
  } else {
    console.log('토큰이 다르다!!!');
  }

  console.log('new token : ', newAccessToken);

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    // sameSite: 'None',
  });
  res.status(200).json('new accessToken is go');
}

export async function userInfo(req, res) {
  const userId = req.user.id;

  const userInfo = await AuthService.getUserInfo(userId);

  res.status(200).json(userInfo);
}

export const userPasswordModify = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  // 후에 전처리 단계에서 확인하는 걸로 수정
  if (!currentPassword || !newPassword) {
    res.status(400).json({ message: '정보를 모두 입력해주세요.' });
  }

  await AuthService.UpdateUserPassword(userId, currentPassword, newPassword);

  res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
};
