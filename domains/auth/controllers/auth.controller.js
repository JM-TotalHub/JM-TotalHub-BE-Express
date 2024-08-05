import * as AuthService from '../services/auth.service';

export async function userSingUp(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const createdUser = await AuthService.signUpUser(bodyData);
  res.status(201).json(createdUser);
}

export async function userSingIn(req, res) {
  const bodyData = req.body;
  const { accessToken, certifiedUser } = await AuthService.signInUser(bodyData);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
  });
  res.status(200).json(certifiedUser);
}

export async function NewAccessTokenGenerate(req, res) {
  // const headerData = req.headers;
  // const oldAccessToken = req.headers.cookie;
  const oldAccessToken = req.cookies['accessToken'];
  console.log('들어온 접근토큰 : ' + oldAccessToken);
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
  });
  res.status(200).json('new accessToken is go');
}
