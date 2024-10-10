import ENV from '../../common/utils/env';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import prisma from '../../prisma';

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    // console.log('req.cookies : ', req.cookies);
    // console.log('req.cookies[accessToken] : ', req.cookies['accessToken']);
    token = req.cookies['accessToken'];
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: ENV.JWT_SECRET_KEY01,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: jwt_payload.id,
        },
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
