const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { signupHandler, loginHandler } = require('../utils/databaseUtils');
const { JWT_SALT } = require('../constants/salt');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    signupHandler,
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    loginHandler,
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SALT,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    },
  ),
);
