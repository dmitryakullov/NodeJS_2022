const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SALT } = require('../constants/salt');

const router = express.Router();

router.post('/signup', (req, res, next) =>
  passport.authenticate('signup', (err, newUser) => {
    if (err || !newUser) {
      const error = new Error('An error occurred!');

      return next(error);
    }

    delete newUser?.password;
    const token = jwt.sign(newUser, JWT_SALT);

    res.json({
      message: 'Ok',
      entity: token,
    });
  })(req, res, next),
);

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err || !user) {
      const error = new Error('An error occurred!');

      return next(error);
    }

    delete user?.password;
    const token = jwt.sign(user, JWT_SALT);

    res.json({
      message: 'Ok',
      entity: token,
    });
  })(req, res, next);
});

module.exports = router;
