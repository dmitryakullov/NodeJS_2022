const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SALT } = require('../constants/salt');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    AuthRequest:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *          example:
 *            email: newEmail@gmail.com
 *            password: example-password
 *    AuthResponse:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *           message:
 *             type: string
 *             description: Status message
 *           entity:
 *             type: string
 *             description: JWT token
 */

/**
 * @swagger
 * /signup:
 *  post:
 *    description: Sign Up Route
 *    requestBody:
 *      content:
 *        $ref: '#/components/schemas/AuthRequest'
 *    responses:
 *      200:
 *        description: message and JWT
 *        content:
 *          $ref: '#/components/schemas/AuthResponse'
 */

router.post('/signup', (req, res, next) =>
  passport.authenticate('signup', (err, newUser) => {
    if (err || !newUser) {
      const error = new Error('An error occurred!');

      return next(error);
    }

    const { _id, email, firstName, lastName } = newUser;
    const token = jwt.sign({ _id, email, firstName, lastName }, JWT_SALT);

    res.json({
      message: 'Ok',
      entity: token,
    });
  })(req, res, next),
);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Login route
 *    requestBody:
 *      content:
 *        $ref: '#/components/schemas/AuthRequest'
 *    responses:
 *      200:
 *        description: message and JWT
 *        content:
 *          $ref: '#/components/schemas/AuthResponse'
 */

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err || !user) {
      const error = new Error('An error occurred!');

      return next(error);
    }

    const { _id, email, firstName, lastName } = user;
    const token = jwt.sign({ _id, email, firstName, lastName }, JWT_SALT);

    res.json({
      message: 'Ok',
      entity: token,
    });
  })(req, res, next);
});

module.exports = router;
