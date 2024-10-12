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
  const token = req.cookies['accessToken'];
  console.log(`userInfo 의 token : ${token}`);

  if (!token || token === 'undefined') {
    console.log('사용자 정보를 얻기 위한 토큰없음');
    res.status(200).json();
  } else {
    console.log('사용자 정보를 얻기 성공');
    const userInfo = await AuthService.getUserInfo(token);
    console.log(`유저정보 전달내용 : ${userInfo}`);

    if (userInfo.name === 'TokenExpiredError') {
      res.status(401).json({
        err: token.name,
        message: 'Access Token 기간 만료',
      });
    } else {
      res.status(200).json(userInfo);
    }
  }
}
