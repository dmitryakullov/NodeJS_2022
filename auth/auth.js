const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { UsersDb } = require('../db');

console.log({ UsersDb: UsersDb });
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      UsersDb.insert({ email, password }, (err, newUser) => {
        if (err || !newUser) {
          return done(err);
        }

        return done(null, newUser);
      });
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      UsersDb.findOne({ email, password }, (err, user) => {
        if (err || !user) {
          return done(null, false, { message: 'Wrong Email or Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      });
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
